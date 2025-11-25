<?php
/**
 * Jorge's Cafe - Order Controller
 * Handles all order-related API requests
 */

class OrderController {
    private $db;
    private $orders_table = 'orders';
    private $order_items_table = 'order_items';

    public function __construct($db) {
        $this->db = $db;
    }

    /**
     * Get all orders with optional filters
     */
    public function getAll() {
        try {
            $status = $_GET['status'] ?? null;
            $limit = $_GET['limit'] ?? null;

            $sql = "SELECT * FROM {$this->orders_table} WHERE 1=1";
            $params = [];

            if ($status) {
                $sql .= " AND status = :status";
                $params[':status'] = $status;
            }

            $sql .= " ORDER BY created_at DESC";

            if ($limit) {
                $sql .= " LIMIT :limit";
            }

            $stmt = $this->db->prepare($sql);
            
            if ($limit) {
                $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            }
            
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            
            $stmt->execute();
            $orders = $stmt->fetchAll();

            // Fetch order items for each order
            foreach ($orders as &$order) {
                $order['items'] = $this->getOrderItems($order['id']);
            }

            echo json_encode([
                'success' => true,
                'count' => count($orders),
                'orders' => $orders
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching orders'
            ]);
        }
    }

    /**
     * Get single order with items
     */
    public function getOne($id) {
        try {
            $sql = "SELECT * FROM {$this->orders_table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);
            $order = $stmt->fetch();

            if ($order) {
                $order['items'] = $this->getOrderItems($id);
                
                echo json_encode([
                    'success' => true,
                    'order' => $order
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Order not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching order'
            ]);
        }
    }

    /**
     * Get order items with menu item details
     */
    private function getOrderItems($order_id) {
        $sql = "SELECT oi.*, mi.name, mi.description, mi.image_url 
                FROM {$this->order_items_table} oi
                JOIN menu_items mi ON oi.menu_item_id = mi.id
                WHERE oi.order_id = :order_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':order_id' => $order_id]);
        $items = $stmt->fetchAll();

        // Format items
        foreach ($items as &$item) {
            $item['menu_item'] = [
                'id' => $item['menu_item_id'],
                'name' => $item['name'],
                'description' => $item['description'],
                'image_url' => $item['image_url']
            ];
            $item['subtotal'] = $item['quantity'] * $item['price'];
            
            unset($item['name'], $item['description'], $item['image_url']);
        }

        return $items;
    }

    /**
     * Create new order
     */
    public function create() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            // Validate required fields
            if (!isset($data['customer_name']) || !isset($data['total_amount']) || !isset($data['items'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Missing required fields'
                ]);
                return;
            }

            if (empty($data['items'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Order must contain at least one item'
                ]);
                return;
            }

            // Start transaction
            $this->db->beginTransaction();

            // Insert order
            $sql = "INSERT INTO {$this->orders_table} 
                    (customer_name, customer_email, customer_phone, total_amount, order_type, notes, status) 
                    VALUES (:customer_name, :customer_email, :customer_phone, :total_amount, :order_type, :notes, 'pending')";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':customer_name' => $data['customer_name'],
                ':customer_email' => $data['customer_email'] ?? '',
                ':customer_phone' => $data['customer_phone'] ?? '',
                ':total_amount' => $data['total_amount'],
                ':order_type' => $data['order_type'] ?? 'pickup',
                ':notes' => $data['notes'] ?? ''
            ]);

            $order_id = $this->db->lastInsertId();

            // Insert order items
            $sql = "INSERT INTO {$this->order_items_table} (order_id, menu_item_id, quantity, price) 
                    VALUES (:order_id, :menu_item_id, :quantity, :price)";
            $stmt = $this->db->prepare($sql);

            foreach ($data['items'] as $item) {
                // Get menu item price
                $menu_sql = "SELECT price, available FROM menu_items WHERE id = :id";
                $menu_stmt = $this->db->prepare($menu_sql);
                $menu_stmt->execute([':id' => $item['menu_item_id']]);
                $menu_item = $menu_stmt->fetch();

                if (!$menu_item) {
                    throw new Exception("Menu item {$item['menu_item_id']} not found");
                }

                if (!$menu_item['available']) {
                    throw new Exception("Menu item {$item['menu_item_id']} is not available");
                }

                $stmt->execute([
                    ':order_id' => $order_id,
                    ':menu_item_id' => $item['menu_item_id'],
                    ':quantity' => $item['quantity'],
                    ':price' => $menu_item['price']
                ]);
            }

            // Commit transaction
            $this->db->commit();

            // Return the created order
            $this->getOne($order_id);

        } catch (Exception $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update order status
     */
    public function updateStatus($id) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!isset($data['status'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Status field is required'
                ]);
                return;
            }

            $valid_statuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
            if (!in_array($data['status'], $valid_statuses)) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid status. Must be one of: ' . implode(', ', $valid_statuses)
                ]);
                return;
            }

            $sql = "UPDATE {$this->orders_table} SET status = :status WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':status' => $data['status']
            ]);

            if ($stmt->rowCount() > 0) {
                $this->getOne($id);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Order not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error updating order status'
            ]);
        }
    }

    /**
     * Update entire order
     */
    public function update($id) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            $sql = "UPDATE {$this->orders_table} SET 
                    customer_name = COALESCE(:customer_name, customer_name),
                    customer_email = COALESCE(:customer_email, customer_email),
                    customer_phone = COALESCE(:customer_phone, customer_phone),
                    notes = COALESCE(:notes, notes)
                    WHERE id = :id";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':customer_name' => $data['customer_name'] ?? null,
                ':customer_email' => $data['customer_email'] ?? null,
                ':customer_phone' => $data['customer_phone'] ?? null,
                ':notes' => $data['notes'] ?? null
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Order updated successfully'
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error updating order'
            ]);
        }
    }

    /**
     * Delete order
     */
    public function delete($id) {
        try {
            $sql = "DELETE FROM {$this->orders_table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);

            if ($stmt->rowCount() > 0) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Order deleted successfully'
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Order not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error deleting order'
            ]);
        }
    }
}
?>
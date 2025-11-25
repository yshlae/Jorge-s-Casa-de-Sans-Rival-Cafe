<?php
/**
 * Jorge's Cafe - Menu Controller
 * Handles all menu-related API requests
 */

class MenuController {
    private $db;
    private $table = 'menu_items';

    public function __construct($db) {
        $this->db = $db;
    }

    /**
     * Get all menu items with optional filters
     */
    public function getAll() {
        try {
            $category = $_GET['category'] ?? null;
            $search = $_GET['search'] ?? null;
            $featured = $_GET['featured'] ?? null;
            $available = $_GET['available'] ?? 'true';

            $sql = "SELECT * FROM {$this->table} WHERE 1=1";
            $params = [];

            if ($available === 'true') {
                $sql .= " AND available = 1";
            }

            if ($category) {
                $sql .= " AND category = :category";
                $params[':category'] = $category;
            }

            if ($featured) {
                $sql .= " AND featured = 1";
            }

            if ($search) {
                $sql .= " AND (name LIKE :search OR description LIKE :search)";
                $params[':search'] = "%{$search}%";
            }

            $sql .= " ORDER BY featured DESC, name ASC";

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $items = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'count' => count($items),
                'items' => $items
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching menu items'
            ]);
        }
    }

    /**
     * Get unique categories
     */
    public function getCategories() {
        try {
            $sql = "SELECT DISTINCT category FROM {$this->table} ORDER BY category";
            $stmt = $this->db->query($sql);
            $categories = $stmt->fetchAll(PDO::FETCH_COLUMN);

            echo json_encode([
                'success' => true,
                'categories' => $categories
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching categories'
            ]);
        }
    }

    /**
     * Get single menu item
     */
    public function getOne($id) {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);
            $item = $stmt->fetch();

            if ($item) {
                echo json_encode([
                    'success' => true,
                    'item' => $item
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Menu item not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching menu item'
            ]);
        }
    }

    /**
     * Create new menu item
     */
    public function create() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            // Validate required fields
            if (!isset($data['name']) || !isset($data['category']) || !isset($data['price'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Missing required fields: name, category, price'
                ]);
                return;
            }

            $sql = "INSERT INTO {$this->table} (name, category, description, price, image_url, available, featured) 
                    VALUES (:name, :category, :description, :price, :image_url, :available, :featured)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':name' => $data['name'],
                ':category' => $data['category'],
                ':description' => $data['description'] ?? '',
                ':price' => $data['price'],
                ':image_url' => $data['image_url'] ?? '',
                ':available' => $data['available'] ?? true,
                ':featured' => $data['featured'] ?? false
            ]);

            $item_id = $this->db->lastInsertId();
            $this->getOne($item_id);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error creating menu item'
            ]);
        }
    }

    /**
     * Update menu item
     */
    public function update($id) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            $sql = "UPDATE {$this->table} SET 
                    name = COALESCE(:name, name),
                    category = COALESCE(:category, category),
                    description = COALESCE(:description, description),
                    price = COALESCE(:price, price),
                    image_url = COALESCE(:image_url, image_url),
                    available = COALESCE(:available, available),
                    featured = COALESCE(:featured, featured)
                    WHERE id = :id";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':name' => $data['name'] ?? null,
                ':category' => $data['category'] ?? null,
                ':description' => $data['description'] ?? null,
                ':price' => $data['price'] ?? null,
                ':image_url' => $data['image_url'] ?? null,
                ':available' => $data['available'] ?? null,
                ':featured' => $data['featured'] ?? null
            ]);

            if ($stmt->rowCount() > 0) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Menu item updated successfully'
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Menu item not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error updating menu item'
            ]);
        }
    }

    /**
     * Delete menu item
     */
    public function delete($id) {
        try {
            $sql = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);

            if ($stmt->rowCount() > 0) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Menu item deleted successfully'
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Menu item not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error deleting menu item'
            ]);
        }
    }
}
?>
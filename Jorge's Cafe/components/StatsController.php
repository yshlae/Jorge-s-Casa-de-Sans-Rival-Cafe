<?php
/**
 * Jorge's Cafe - Statistics Controller
 */

class StatsController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getStats() {
        try {
            // Total orders
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM orders");
            $total_orders = $stmt->fetch()['total'];

            // Pending orders
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM orders WHERE status = 'pending'");
            $pending_orders = $stmt->fetch()['total'];

            // Completed orders
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM orders WHERE status = 'completed'");
            $completed_orders = $stmt->fetch()['total'];

            // Total revenue
            $stmt = $this->db->query("SELECT SUM(total_amount) as revenue FROM orders WHERE status = 'completed'");
            $total_revenue = $stmt->fetch()['revenue'] ?? 0;

            // Total menu items
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM menu_items");
            $total_menu_items = $stmt->fetch()['total'];

            // Unread contacts
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM contacts WHERE is_read = 0");
            $unread_contacts = $stmt->fetch()['total'];

            echo json_encode([
                'success' => true,
                'stats' => [
                    'total_orders' => (int)$total_orders,
                    'pending_orders' => (int)$pending_orders,
                    'completed_orders' => (int)$completed_orders,
                    'total_revenue' => (float)$total_revenue,
                    'total_menu_items' => (int)$total_menu_items,
                    'unread_contacts' => (int)$unread_contacts
                ]
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching statistics'
            ]);
        }
    }
}
?>
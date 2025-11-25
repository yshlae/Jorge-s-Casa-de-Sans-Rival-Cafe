<?php
/**
 * Jorge's Cafe - Contact Controller
 */

class ContactController {
    private $db;
    private $table = 'contacts';

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        try {
            $is_read = $_GET['is_read'] ?? null;
            $limit = $_GET['limit'] ?? null;

            $sql = "SELECT * FROM {$this->table} WHERE 1=1";
            $params = [];

            if ($is_read !== null) {
                $sql .= " AND is_read = :is_read";
                $params[':is_read'] = ($is_read === 'true') ? 1 : 0;
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
            $contacts = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'count' => count($contacts),
                'contacts' => $contacts
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching contacts'
            ]);
        }
    }

    public function getOne($id) {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);
            $contact = $stmt->fetch();

            if ($contact) {
                echo json_encode([
                    'success' => true,
                    'contact' => $contact
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Contact not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching contact'
            ]);
        }
    }

    public function create() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Missing required fields: name, email, message'
                ]);
                return;
            }

            $sql = "INSERT INTO {$this->table} (name, email, phone, subject, message) 
                    VALUES (:name, :email, :phone, :subject, :message)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':phone' => $data['phone'] ?? '',
                ':subject' => $data['subject'] ?? '',
                ':message' => $data['message']
            ]);

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Contact form submitted successfully. We\'ll get back to you soon!'
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error submitting contact form'
            ]);
        }
    }

    public function markAsRead($id) {
        try {
            $sql = "UPDATE {$this->table} SET is_read = 1 WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);

            echo json_encode([
                'success' => true,
                'message' => 'Contact marked as read'
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error updating contact'
            ]);
        }
    }
}
?>
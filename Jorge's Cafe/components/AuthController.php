<?php
/**
 * Jorge's Cafe - Authentication Controller
 * Handles user login, logout, registration, and session management
 */

class AuthController {
    private $db;
    private $table = 'users';

    public function __construct($db) {
        $this->db = $db;
    }

    /**
     * User login
     */
    public function login() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            // Validate required fields
            if (!isset($data['username']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Username and password are required'
                ]);
                return;
            }

            // Find user by username or email
            $sql = "SELECT * FROM {$this->table} WHERE username = :identifier OR email = :identifier LIMIT 1";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':identifier' => $data['username']]);
            $user = $stmt->fetch();

            if (!$user) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid username or password'
                ]);
                return;
            }

            // Verify password
            if (!password_verify($data['password'], $user['password_hash'])) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid username or password'
                ]);
                return;
            }

            // Create session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['is_admin'] = (bool)$user['is_admin'];
            $_SESSION['logged_in'] = true;
            $_SESSION['login_time'] = time();

            // Update last login time (optional - add column if needed)
            $update_sql = "UPDATE {$this->table} SET updated_at = NOW() WHERE id = :id";
            $update_stmt = $this->db->prepare($update_sql);
            $update_stmt->execute([':id' => $user['id']]);

            // Remove sensitive data before sending response
            unset($user['password_hash']);

            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'is_admin' => (bool)$user['is_admin']
                ],
                'session_id' => session_id()
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Login failed. Please try again.'
            ]);
        }
    }

    /**
     * User logout
     */
    public function logout() {
        try {
            // Destroy session
            $_SESSION = array();
            
            // Delete session cookie
            if (isset($_COOKIE[session_name()])) {
                setcookie(session_name(), '', time() - 3600, '/');
            }
            
            session_destroy();

            echo json_encode([
                'success' => true,
                'message' => 'Logout successful'
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Logout failed'
            ]);
        }
    }

    /**
     * User registration
     */
    public function register() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            // Validate required fields
            if (!isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Username, email, and password are required'
                ]);
                return;
            }

            // Validate email format
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid email format'
                ]);
                return;
            }

            // Validate password strength
            if (strlen($data['password']) < 6) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Password must be at least 6 characters long'
                ]);
                return;
            }

            // Check if username already exists
            $check_sql = "SELECT id FROM {$this->table} WHERE username = :username";
            $check_stmt = $this->db->prepare($check_sql);
            $check_stmt->execute([':username' => $data['username']]);
            
            if ($check_stmt->fetch()) {
                http_response_code(409);
                echo json_encode([
                    'success' => false,
                    'message' => 'Username already exists'
                ]);
                return;
            }

            // Check if email already exists
            $check_sql = "SELECT id FROM {$this->table} WHERE email = :email";
            $check_stmt = $this->db->prepare($check_sql);
            $check_stmt->execute([':email' => $data['email']]);
            
            if ($check_stmt->fetch()) {
                http_response_code(409);
                echo json_encode([
                    'success' => false,
                    'message' => 'Email already registered'
                ]);
                return;
            }

            // Hash password
            $password_hash = password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 12]);

            // Insert new user
            $sql = "INSERT INTO {$this->table} (username, email, password_hash, is_admin) 
                    VALUES (:username, :email, :password_hash, :is_admin)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':username' => $data['username'],
                ':email' => $data['email'],
                ':password_hash' => $password_hash,
                ':is_admin' => $data['is_admin'] ?? false
            ]);

            $user_id = $this->db->lastInsertId();

            // Auto-login after registration
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $data['username'];
            $_SESSION['email'] = $data['email'];
            $_SESSION['is_admin'] = (bool)($data['is_admin'] ?? false);
            $_SESSION['logged_in'] = true;
            $_SESSION['login_time'] = time();

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Registration successful',
                'user' => [
                    'id' => $user_id,
                    'username' => $data['username'],
                    'email' => $data['email'],
                    'is_admin' => (bool)($data['is_admin'] ?? false)
                ]
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Registration failed. Please try again.'
            ]);
        }
    }

    /**
     * Check if user is authenticated
     */
    public function checkAuth() {
        if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
            echo json_encode([
                'success' => true,
                'authenticated' => true,
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'username' => $_SESSION['username'],
                    'email' => $_SESSION['email'],
                    'is_admin' => $_SESSION['is_admin']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'authenticated' => false,
                'message' => 'Not authenticated'
            ]);
        }
    }

    /**
     * Get current user profile
     */
    public function getProfile() {
        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Not authenticated'
            ]);
            return;
        }

        try {
            $sql = "SELECT id, username, email, is_admin, created_at FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $_SESSION['user_id']]);
            $user = $stmt->fetch();

            if ($user) {
                echo json_encode([
                    'success' => true,
                    'user' => $user
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching profile'
            ]);
        }
    }

    /**
     * Update user profile
     */
    public function updateProfile() {
        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Not authenticated'
            ]);
            return;
        }

        try {
            $data = json_decode(file_get_contents("php://input"), true);

            $updates = [];
            $params = [':id' => $_SESSION['user_id']];

            // Update email if provided
            if (isset($data['email'])) {
                if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                    http_response_code(400);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Invalid email format'
                    ]);
                    return;
                }
                $updates[] = "email = :email";
                $params[':email'] = $data['email'];
                $_SESSION['email'] = $data['email'];
            }

            // Update password if provided
            if (isset($data['password'])) {
                if (strlen($data['password']) < 6) {
                    http_response_code(400);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Password must be at least 6 characters long'
                    ]);
                    return;
                }
                $updates[] = "password_hash = :password_hash";
                $params[':password_hash'] = password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 12]);
            }

            if (empty($updates)) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'No fields to update'
                ]);
                return;
            }

            $sql = "UPDATE {$this->table} SET " . implode(', ', $updates) . " WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);

            echo json_encode([
                'success' => true,
                'message' => 'Profile updated successfully'
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error updating profile'
            ]);
        }
    }

    /**
     * Change password (requires current password)
     */
    public function changePassword() {
        if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Not authenticated'
            ]);
            return;
        }

        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!isset($data['current_password']) || !isset($data['new_password'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Current password and new password are required'
                ]);
                return;
            }

            // Get current password hash
            $sql = "SELECT password_hash FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $_SESSION['user_id']]);
            $user = $stmt->fetch();

            // Verify current password
            if (!password_verify($data['current_password'], $user['password_hash'])) {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Current password is incorrect'
                ]);
                return;
            }

            // Validate new password
            if (strlen($data['new_password']) < 6) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'New password must be at least 6 characters long'
                ]);
                return;
            }

            // Update password
            $new_hash = password_hash($data['new_password'], PASSWORD_BCRYPT, ['cost' => 12]);
            $update_sql = "UPDATE {$this->table} SET password_hash = :password_hash WHERE id = :id";
            $update_stmt = $this->db->prepare($update_sql);
            $update_stmt->execute([
                ':password_hash' => $new_hash,
                ':id' => $_SESSION['user_id']
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Password changed successfully'
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error changing password'
            ]);
        }
    }

    /**
     * Request password reset (generates token - requires email setup)
     */
    public function requestPasswordReset() {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!isset($data['email'])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Email is required'
                ]);
                return;
            }

            // Check if user exists
            $sql = "SELECT id, username FROM {$this->table} WHERE email = :email";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':email' => $data['email']]);
            $user = $stmt->fetch();

            // Always return success to prevent email enumeration
            echo json_encode([
                'success' => true,
                'message' => 'If the email exists, a password reset link will be sent'
            ]);

            if ($user) {
                // Generate reset token
                $token = bin2hex(random_bytes(32));
                $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

                // Store token (you'd need to add a password_resets table)
                // For now, we'll just log it
                error_log("Password reset token for user {$user['username']}: {$token}");
                
                // In production, send email here
                // mail($data['email'], 'Password Reset', "Your reset link: http://yoursite.com/reset?token=$token");
            }

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error processing request'
            ]);
        }
    }

    /**
     * Get all users (admin only)
     */
    public function getAllUsers() {
        if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'message' => 'Forbidden: Admin access required'
            ]);
            return;
        }

        try {
            $sql = "SELECT id, username, email, is_admin, created_at FROM {$this->table} ORDER BY created_at DESC";
            $stmt = $this->db->query($sql);
            $users = $stmt->fetchAll();

            echo json_encode([
                'success' => true,
                'count' => count($users),
                'users' => $users
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error fetching users'
            ]);
        }
    }

    /**
     * Delete user (admin only)
     */
    public function deleteUser($id) {
        if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'message' => 'Forbidden: Admin access required'
            ]);
            return;
        }

        // Prevent self-deletion
        if ($_SESSION['user_id'] == $id) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'You cannot delete your own account'
            ]);
            return;
        }

        try {
            $sql = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);

            if ($stmt->rowCount() > 0) {
                echo json_encode([
                    'success' => true,
                    'message' => 'User deleted successfully'
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error deleting user'
            ]);
        }
    }
}

/**
 * Middleware function to require authentication
 * Use this in your routes to protect endpoints
 */
function requireAuth() {
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Authentication required'
        ]);
        exit();
    }
}

/**
 * Middleware function to require admin privileges
 */
function requireAdmin() {
    if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Admin access required'
        ]);
        exit();
    }
}
?>
<?php
/**
 * Jorge's Cafe - API Router
 * Routes all API requests to appropriate controllers
 */

// Set JSON content type
header('Content-Type: application/json');

// Remove /api/ prefix from URI
$api_path = str_replace('/api/', '', $uri);
$path_parts = explode('/', trim($api_path, '/'));

$resource = $path_parts[0] ?? '';
$id = $path_parts[1] ?? null;
$action = $path_parts[2] ?? null;

// Route to appropriate controller
try {
    switch ($resource) {
        case 'menu':
            require_once __DIR__ . '/controllers/MenuController.php';
            $controller = new MenuController($db);
            
            switch ($request_method) {
                case 'GET':
                    if ($id) {
                        $controller->getOne($id);
                    } elseif (isset($_GET['categories'])) {
                        $controller->getCategories();
                    } else {
                        $controller->getAll();
                    }
                    break;
                case 'POST':
                    $controller->create();
                    break;
                case 'PUT':
                    if ($id) {
                        $controller->update($id);
                    }
                    break;
                case 'DELETE':
                    if ($id) {
                        $controller->delete($id);
                    }
                    break;
                default:
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            }
            break;

        case 'orders':
            require_once __DIR__ . '/controllers/OrderController.php';
            $controller = new OrderController($db);
            
            switch ($request_method) {
                case 'GET':
                    if ($id) {
                        $controller->getOne($id);
                    } else {
                        $controller->getAll();
                    }
                    break;
                case 'POST':
                    $controller->create();
                    break;
                case 'PUT':
                    if ($id && $action === 'status') {
                        $controller->updateStatus($id);
                    } elseif ($id) {
                        $controller->update($id);
                    }
                    break;
                case 'DELETE':
                    if ($id) {
                        $controller->delete($id);
                    }
                    break;
                default:
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            }
            break;

        case 'contact':
            require_once __DIR__ . '/controllers/ContactController.php';
            $controller = new ContactController($db);
            
            switch ($request_method) {
                case 'GET':
                    if ($id) {
                        $controller->getOne($id);
                    } else {
                        $controller->getAll();
                    }
                    break;
                case 'POST':
                    $controller->create();
                    break;
                case 'PUT':
                    if ($id && $action === 'read') {
                        $controller->markAsRead($id);
                    }
                    break;
                default:
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            }
            break;

        case 'stats':
            require_once __DIR__ . '/controllers/StatsController.php';
            $controller = new StatsController($db);
            
            if ($request_method === 'GET') {
                $controller->getStats();
            } else {
                http_response_code(405);
                echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            }
            break;

        case 'auth':
            require_once __DIR__ . '/controllers/AuthController.php';
            $controller = new AuthController($db);
            
            switch ($request_method) {
                case 'GET':
                    if ($id === 'check') {
                        $controller->checkAuth();
                    } elseif ($id === 'profile') {
                        $controller->getProfile();
                    } elseif ($id === 'users') {
                        $controller->getAllUsers();
                    }
                    break;
                case 'POST':
                    if ($id === 'login') {
                        $controller->login();
                    } elseif ($id === 'logout') {
                        $controller->logout();
                    } elseif ($id === 'register') {
                        $controller->register();
                    } elseif ($id === 'reset-password') {
                        $controller->requestPasswordReset();
                    }
                    break;
                case 'PUT':
                    if ($id === 'profile') {
                        $controller->updateProfile();
                    } elseif ($id === 'change-password') {
                        $controller->changePassword();
                    }
                    break;
                case 'DELETE':
                    if ($id === 'users' && $action) {
                        $controller->deleteUser($action);
                    }
                    break;
                default:
                    http_response_code(405);
                    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'API endpoint not found'
            ]);
            break;
    }
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => APP_ENV === 'development' ? $e->getMessage() : 'Internal server error'
    ]);
}
?>
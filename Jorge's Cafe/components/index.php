<?php
/**
 * Jorge's Cafe - Main PHP Entry Point
 * Routes all requests through this file
 */

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set timezone
date_default_timezone_set('Asia/Manila');

// Start session
session_start();

// Enable CORS for API requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Autoload classes
spl_autoload_register(function ($class) {
    $file = __DIR__ . '/classes/' . $class . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

// Load configuration
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';

// Initialize database
$database = new Database();
$db = $database->getConnection();

// Get request URI and method
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Remove query string and base path
$uri = parse_url($request_uri, PHP_URL_PATH);
$uri = str_replace('/index.php', '', $uri);

// Route the request
if (strpos($uri, '/api/') === 0) {
    // API Routes
    require_once __DIR__ . '/api/router.php';
} else {
    // Serve HTML pages
    switch ($uri) {
        case '/':
        case '/index':
            require_once __DIR__ . '/public/index.html';
            break;
        
        case '/admin':
        case '/admin.html':
            require_once __DIR__ . '/public/admin.html';
            break;
        
        case '/about':
            require_once __DIR__ . '/public/about.html';
            break;
        
        case '/menu':
            require_once __DIR__ . '/public/menu.html';
            break;
        
        case '/contact':
            require_once __DIR__ . '/public/contact.html';
            break;
        
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Page not found']);
            break;
    }
}
?>
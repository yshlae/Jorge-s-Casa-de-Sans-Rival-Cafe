<?php
/**
 * Jorge's Cafe - Configuration File
 */

// Application Settings
define('APP_NAME', "Jorge's Cafe");
define('APP_VERSION', '1.0.0');
define('APP_ENV', getenv('APP_ENV') ?: 'development'); // development, production

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'jorgescafe');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

// Paths
define('BASE_PATH', dirname(__DIR__));
define('PUBLIC_PATH', BASE_PATH . '/public');
define('UPLOAD_PATH', BASE_PATH . '/uploads');

// Security
define('SECRET_KEY', getenv('SECRET_KEY') ?: 'your-secret-key-change-in-production');
define('PASSWORD_HASH_ALGO', PASSWORD_BCRYPT);
define('PASSWORD_HASH_COST', 12);

// Session Configuration
define('SESSION_LIFETIME', 7 * 24 * 60 * 60); // 7 days
ini_set('session.cookie_httponly', 1);
ini_set('session.use_strict_mode', 1);
if (APP_ENV === 'production') {
    ini_set('session.cookie_secure', 1);
}

// Pagination
define('ITEMS_PER_PAGE', 20);

// File Upload Settings
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_FILE_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'pdf']);

// Email Configuration (optional)
define('MAIL_HOST', getenv('MAIL_HOST') ?: 'smtp.gmail.com');
define('MAIL_PORT', getenv('MAIL_PORT') ?: 587);
define('MAIL_USERNAME', getenv('MAIL_USERNAME') ?: '');
define('MAIL_PASSWORD', getenv('MAIL_PASSWORD') ?: '');
define('MAIL_FROM', getenv('MAIL_FROM') ?: 'hello@jorgescafe.com');
define('MAIL_FROM_NAME', getenv('MAIL_FROM_NAME') ?: "Jorge's Cafe");

// Contact Information
define('CONTACT_EMAIL', 'hello@jorgescafe.com');
define('CONTACT_PHONE', '(0927) 452 1168');
define('CONTACT_ADDRESS', "Jorge's Cafe Casa de Sans Rival\nJose P Laurel National Highway\nBrgy. Alangilan Batangas City");

// Timezone
date_default_timezone_set('Asia/Manila');

// Error Handling
if (APP_ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', BASE_PATH . '/logs/error.log');
}

// Helper Functions
function env($key, $default = null) {
    $value = getenv($key);
    return $value !== false ? $value : $default;
}

function base_url($path = '') {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    return $protocol . '://' . $host . '/' . ltrim($path, '/');
}

function asset_url($path) {
    return base_url('assets/' . ltrim($path, '/'));
}

function redirect($url) {
    header("Location: " . $url);
    exit();
}
?>
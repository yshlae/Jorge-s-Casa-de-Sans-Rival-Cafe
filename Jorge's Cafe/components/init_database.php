<?php
/**
 * Jorge's Cafe - Database Initialization Script
 * Run this file to create tables and populate with sample data
 */

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';

$database = new Database();
$db = $database->getConnection();

echo "=== Jorge's Cafe Database Initialization ===\n\n";

// Initialize tables
echo "Creating database tables...\n";
if ($database->initDatabase()) {
    echo "✅ Tables created successfully!\n\n";
} else {
    die("❌ Error creating tables\n");
}

// Check if data already exists
$stmt = $db->query("SELECT COUNT(*) as count FROM menu_items");
$count = $stmt->fetch()['count'];

if ($count > 0) {
    echo "⚠️  Database already contains data!\n";
    echo "Do you want to continue and add more sample data? (y/n): ";
    $handle = fopen("php://stdin", "r");
    $line = fgets($handle);
    if (trim($line) != 'y') {
        echo "Initialization cancelled.\n";
        exit;
    }
}

// Add sample menu items
echo "Adding sample menu items...\n";

$menu_items = [
    // Coffee
    ['Americano', 'Coffee', 'Classic espresso with hot water', 80, true, true],
    ['Cafe Latte', 'Coffee', 'Smooth espresso with steamed milk', 130, true, true],
    ['Spanish Latte', 'Coffee', 'Sweet and creamy Spanish-style latte', 140, true, false],
    ['Mocha Latte', 'Coffee', 'Espresso, chocolate, and steamed milk', 150, true, false],
    ['Caramel Machiatto', 'Coffee', 'Espresso with vanilla and caramel', 150, true, true],
    ['Salted Caramel Machiatto', 'Coffee', 'Sweet and salty perfection', 150, true, false],
    ['Matcha Latte', 'Coffee', 'Premium matcha with steamed milk', 140, true, false],
    
    // Sea Salt Series
    ['Sea Salt Latte', 'Coffee', 'Creamy latte with sea salt foam', 170, true, false],
    ['Spanish Sea Salt Latte', 'Coffee', 'Spanish latte with sea salt twist', 170, true, false],
    ['Matcha Sea Salt Latte', 'Coffee', 'Matcha topped with sea salt cream', 170, true, false],
    ['Biscoff Sea Salt Latte', 'Coffee', 'Biscoff cookie latte with sea salt', 190, true, false],
    
    // Frappes
    ['Caramel Machiatto Frappe', 'Coffee', 'Iced blended caramel coffee', 180, true, false],
    ['Salted Caramel Machiatto Frappe', 'Coffee', 'Iced salted caramel delight', 180, true, false],
    ['Java Chip Frappe', 'Coffee', 'Coffee with chocolate chips', 185, true, false],
    ['Dark Cookies & Cream Frappe', 'Coffee', 'Oreo-inspired coffee frappe', 185, true, false],
    ['Mocha Frappe', 'Coffee', 'Iced blended chocolate coffee', 180, true, false],
    ['Chocolate Frappe', 'Coffee', 'Rich chocolate blended drink', 170, true, false],
    ['Strawberry Cream Frappe', 'Coffee', 'Sweet strawberry frappe', 170, true, false],
    ['Matcha Frappe', 'Coffee', 'Iced blended matcha', 180, true, false],
    
    // Specialty
    ['Chocolate Ice Shaken', 'Specialty', 'Shaken chocolate beverage', 130, true, false],
    ['Strawberry Ice Shaken', 'Specialty', 'Refreshing strawberry drink', 130, true, false],
    ['UBE Ice Shaken', 'Specialty', 'Filipino purple yam drink', 130, true, true],
    ['Biscoff Latte', 'Specialty', 'Cookie butter latte', 170, true, false],
    ['Strawberry Matcha', 'Specialty', 'Strawberry and matcha fusion', 170, true, false],
    ['House Blend Iced Tea', 'Specialty', 'Refreshing house tea', 80, true, false],
    ['Hot Chocolate', 'Specialty', 'Rich and creamy hot chocolate', 120, true, false],
    
    // Cakes
    ['Chocolate Cake', 'Cakes', 'Rich chocolate layer cake', 150, true, false],
    ['Strawberry Shortcake', 'Cakes', 'Light sponge with fresh strawberries', 160, true, false],
    ['Cheesecake', 'Cakes', 'Classic New York style cheesecake', 180, true, false],
    
    // Bakery
    ['Croissant', 'Bakery', 'Buttery flaky croissant', 80, true, false],
    ['Chocolate Chip Cookie', 'Bakery', 'Homemade chocolate chip cookies', 50, true, false],
    ['Blueberry Muffin', 'Bakery', 'Fresh baked blueberry muffin', 70, true, false],
    
    // Meals
    ['Club Sandwich', 'Meals', 'Triple decker with chicken and bacon', 220, true, false],
    ['Pasta Carbonara', 'Meals', 'Creamy pasta with bacon', 250, true, false],
    ['Caesar Salad', 'Meals', 'Fresh romaine with Caesar dressing', 180, true, false],
    
    // Desserts
    ['Brownie', 'Desserts', 'Fudgy chocolate brownie', 100, true, false],
    ['Ice Cream Sundae', 'Desserts', 'Vanilla ice cream with toppings', 120, true, false],
];

$sql = "INSERT INTO menu_items (name, category, description, price, available, featured) 
        VALUES (:name, :category, :description, :price, :available, :featured)";
$stmt = $db->prepare($sql);

$count = 0;
foreach ($menu_items as $item) {
    $stmt->execute([
        ':name' => $item[0],
        ':category' => $item[1],
        ':description' => $item[2],
        ':price' => $item[3],
        ':available' => $item[4],
        ':featured' => $item[5]
    ]);
    $count++;
}

echo "✅ Added {$count} menu items\n\n";

// Create admin user
echo "Creating admin user...\n";

$username = 'admin';
$email = 'admin@jorgescafe.com';
$password = password_hash('admin123', PASSWORD_BCRYPT);

// Check if admin already exists
$stmt = $db->prepare("SELECT COUNT(*) as count FROM users WHERE username = :username");
$stmt->execute([':username' => $username]);
$user_exists = $stmt->fetch()['count'] > 0;

if (!$user_exists) {
    $sql = "INSERT INTO users (username, email, password_hash, is_admin) 
            VALUES (:username, :email, :password_hash, 1)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':username' => $username,
        ':email' => $email,
        ':password_hash' => $password
    ]);
    echo "✅ Admin user created\n\n";
} else {
    echo "⚠️  Admin user already exists\n\n";
}

echo "=== Database Initialization Complete! ===\n\n";
echo "Admin Credentials:\n";
echo "Username: admin\n";
echo "Password: admin123\n\n";
echo "⚠️  IMPORTANT: Change the admin password in production!\n\n";
echo "You can now run your application.\n";
?>
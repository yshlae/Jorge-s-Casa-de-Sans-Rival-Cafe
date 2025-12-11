<?php
require "db.php";

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

// Check if query failed
if (!$result) {
    die("SQL Error: " . $conn->error);
}

// Fetch data
$products = $result->fetch_all(MYSQLI_ASSOC);

// Output JSON
header("Content-Type: application/json");
echo json_encode($products);

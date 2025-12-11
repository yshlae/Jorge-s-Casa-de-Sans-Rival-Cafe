<?php
require "db.php";

$sql = "SELECT * FROM orders ORDER BY created_at DESC";
$result = $conn->query($sql);

// Check SQL error
if (!$result) {
    die("SQL Error: " . $conn->error);
}

// Fetch all rows
$orders = $result->fetch_all(MYSQLI_ASSOC);

// Output JSON
header("Content-Type: application/json");
echo json_encode($orders);

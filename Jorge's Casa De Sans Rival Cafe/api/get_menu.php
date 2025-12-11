<?php
require "db.php";

$sql = "SELECT * FROM menu";
$result = $conn->query($sql);

// Check if query failed
if (!$result) {
    die("SQL Error: " . $conn->error);
}

// Fetch all rows
$menu = $result->fetch_all(MYSQLI_ASSOC);

// Output JSON
header("Content-Type: application/json");
echo json_encode($menu);

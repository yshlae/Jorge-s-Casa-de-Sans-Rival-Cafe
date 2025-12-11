<?php
$conn = new mysqli("localhost", "root", "", "jorgescafe");

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
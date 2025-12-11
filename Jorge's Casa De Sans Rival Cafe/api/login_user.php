<?php
session_start();
include "db.php";

// DEMO MODE : AUTO LOGIN FIRST CUSTOMER
$result = $conn->query("SELECT * FROM users LIMIT 1");
$user = $result->fetch_assoc();

if ($user) {
    $_SESSION['user'] = $user;
    header("Location: ../templates/orderonline.html");
    exit();
}

die("No customer account found in database. Please register one.");

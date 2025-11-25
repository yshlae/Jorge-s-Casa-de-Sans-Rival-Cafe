<?php
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

$username = $input["username"];
$email = $input["email"];
$password = $input["password"];

// Replace this with database insert
echo json_encode([
    "success" => true,
    "user" => [
        "username" => $username,
        "email" => $email,
        "is_admin" => false
    ]
]);
?>

<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$fullname = $data['username'];
$email = $data['email'];
$password = hash("sha256", $data['password']);
$role = "staff";

$stmt = $conn->prepare("INSERT INTO admins (fullname, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $fullname, $email, $password, $role);

echo json_encode(["success" => $stmt->execute()]);

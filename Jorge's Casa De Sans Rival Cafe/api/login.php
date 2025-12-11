<?php
session_start();
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['username'] ?? null;
$password = $data['password'] ?? null;

if (!$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "No input received from login form"
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM admins WHERE email=? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {

    if (hash("sha256", $password) === $user['password']) {

        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];

        echo json_encode([
            "success" => true,
            "role" => $user["role"]
        ]);

    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Account not found"]);
}

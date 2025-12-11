<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['customerName'];
$phone = $data['customerPhone'];
$address = $data['address'];
$total = $data['total'];

$stmt = $conn->prepare(
    "INSERT INTO orders (customer_name, phone, address, total) VALUES (?, ?, ?, ?)"
);

if (!$stmt) {
    die(json_encode(["error" => $conn->error]));
}

$stmt->bind_param("sssd", $name, $phone, $address, $total);
$stmt->execute();

echo json_encode([
    "success" => true,
    "orderId" => "ORD-" . $stmt->insert_id
]);

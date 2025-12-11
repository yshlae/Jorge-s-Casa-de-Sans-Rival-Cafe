<?php
include "db.php";

$name = $_POST['fullname'];
$email = $_POST['email'];
$pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $pass);

if ($stmt->execute()) {
    header("Location: ../templates/login.php");
} else {
    echo "Email already exists.";
}
?>

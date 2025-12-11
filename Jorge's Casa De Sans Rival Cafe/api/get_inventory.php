<?php
include '../config/db.php';

$query = mysqli_query($conn, "SELECT * FROM inventory");
$data = [];

while ($row = mysqli_fetch_assoc($query)) {
    $data[] = $row;
}

echo json_encode($data);

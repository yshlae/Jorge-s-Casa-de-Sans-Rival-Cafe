<?php
session_start();
echo json_encode(["count" => $_SESSION['cart_count'] ?? 0]);

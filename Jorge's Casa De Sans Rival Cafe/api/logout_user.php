<?php
session_start();
session_destroy();

// Redirect customer back to customer homepage
header("Location: ../templates/main.html");
exit();

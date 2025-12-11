<?php
session_start();
session_unset();
session_destroy();

header("Location: /jorgecafe/templates/login.php");
exit();

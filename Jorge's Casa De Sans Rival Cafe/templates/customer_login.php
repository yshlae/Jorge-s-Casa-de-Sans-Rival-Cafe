<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Customer Login</title>
    <link rel="stylesheet" href="../static/login.css">
</head>
<body>

<div class="login-container">

    <div class="logo">
        <h1>Jorge’s Cafe</h1>
        <p>Customer Login</p>
    </div>

    <form method="POST" action="../api/login_user.php">
        <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required>
        </div>

        <button class="btn-login">Login</button>

        <p style="margin-top:15px;">
            No account?
            <a href="register.php">Register here</a>
        </p>
    </form>

</div>

</body>
</html>

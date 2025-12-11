<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header("Location: /jorgecafe/templates/login.php");
    exit();
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Jorge's Cafe Admin</title>

    <!-- CSS -->
    <link rel="stylesheet" href="../static/dashboard.css">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="dashboard-body">
    <div class="dashboard-layout">
        
        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">Jorge's Cafe Admin</h2>
                <button class="sidebar-toggle" id="sidebarToggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="12" x2="21" y2="12"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                </button>
            </div>
            <form action="../api/logout.php" method="GET" style="margin-top:20px;">
    <button type="submit" class="nav-item" style="color:#e74c3c;">
        <span>Logout</span>
    </button>
</form>
            <nav class="sidebar-nav">
                <button class="nav-item active" data-page="dashboard">
                    <span>Dashboard</span>
                </button>
                <button class="nav-item" data-page="inventory">
                    <span>Inventory</span>
                </button>
                <button class="nav-item" data-page="recipes">
                    <span>Recipes</span>
                </button>
                <button class="nav-item" data-page="sales">
                    <span>Sales History</span>
                </button>
                <button class="nav-item" data-page="menu">
                    <span>Main Menu</span>
                </button>
            </nav>

            <div class="sidebar-footer">
                <div class="admin-info">
                    <div class="admin-avatar"></div>
                    <div class="admin-details">
                        <span id="adminEmail">admin@jorgescafe.com</span>
                        <span class="admin-role">Administrator</span>
                    </div>
                </div>

                <button class="nav-item" id="backToSiteBtn">
                    <span>Back to Site</span>
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="dashboard-main">

            <!-- DASHBOARD PAGE -->
            <section id="page-dashboard" class="dashboard-page active">
                <div class="page-header">
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back! Here's what's happening today.</p>
                    <p>⚠ Dashboard data shown are sample values for demonstration purposes only.</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <p class="stat-label">Total Revenue</p>
                        <p class="stat-value">₱58,430</p>
                        <p class="stat-period">This month</p>
                    </div>
                </div>

                <!-- CHARTS -->
                <div class="charts-grid">
                    <div class="chart-card">
                        <h3>Sales Analytics</h3>
                        <canvas id="salesChart"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3>Top Products</h3>
                        <canvas id="productsChart"></canvas>
                    </div>
                </div>

                <!-- TABLES -->
                <div class="tables-grid">
                    <div class="table-card">
                        <h3>Inventory Tracking</h3>
                        <div class="table-items" id="inventoryItems"></div>
                    </div>
                    <div class="table-card">
                        <h3>Recent Orders</h3>
                        <div class="table-items" id="recentOrders"></div>
                    </div>
                </div>
            </section>

            <!-- INVENTORY PAGE -->
            <section id="page-inventory" class="dashboard-page">
                <div class="page-header">
                    <h1>Inventory Management</h1>
                    <p>Track and manage your stock levels</p>
                </div>
                <div class="table-card full-width">
                    <div class="table-header">
                        <h3>Current Stock</h3>
                        <button class="btn btn-primary btn-sm">Add Item</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="inventoryTable"></tbody>
                    </table>
                </div>
            </section>

            <!-- RECIPES PAGE -->
            <section id="page-recipes" class="dashboard-page">
                <div class="page-header">
                    <h1>Recipes</h1>
                    <p>Manage your product recipes</p>
                </div>
                <div class="recipes-grid" id="recipesGrid"></div>
            </section>

            <!-- SALES HISTORY PAGE -->
            <section id="page-sales" class="dashboard-page">
                <div class="page-header">
                    <h1>Sales History</h1>
                    <p>View your sales transactions</p>
                </div>
                <div class="table-card full-width">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody id="salesTable"></tbody>
                    </table>
                </div>
            </section>

            <!-- MENU PAGE -->
            <section id="page-menu" class="dashboard-page">
                <div class="page-header">
                    <h1>Main Menu</h1>
                    <p>Manage menu items</p>
                </div>
                <div class="menu-management" id="menuManagement"></div>
            </section>

        </main>
    </div>

    <!-- SCRIPT -->
    <script src="../static/js/dashboard.js"></script>

</body>
</html>

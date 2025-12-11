// Complete Dashboard System with ALL 81 Products

// ============================================
// INITIALIZATION
// ============================================
let menuItems = [];
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadDashboardData();
});

function initializeDashboard() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                switchPage(page);
            }
        });
    });

    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('collapsed');
        });
    }

    // Back to Site
    document.getElementById('backToSiteBtn')?.addEventListener('click', function() {
        window.location.href = 'main.html';
    });

    // Logout
    document.getElementById('logoutBtnDashboard')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'login.html';
        }
    });
}

// ============================================
// PAGE SWITCHING
// ============================================
function switchPage(page) {
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });

    // Update active page
    document.querySelectorAll('.dashboard-page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(`page-${page}`).classList.add('active');

    // Load page-specific data
    switch(page) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'inventory':
            loadInventoryData();
            break;
        case 'recipes':
            loadRecipesData();
            break;
        case 'sales':
            loadSalesData();
            break;
        case 'menu':
            loadMenuManagement();
            break;
    }
}

// ============================================
// DASHBOARD HOME PAGE
// ============================================
function loadDashboardData() {
    initCharts();
    loadInventoryTracking();
    loadRecentOrders();
}

function initCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx && !salesCtx.chart) {
        salesCtx.chart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Sales (₱)',
                    data: [4200, 5100, 4800, 6200, 5800, 7200, 6800],
                    borderColor: '#d97757',
                    backgroundColor: 'rgba(217, 119, 87, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₱' + value;
                            }
                        }
                    }
                }
            }
        });
    }

    // Products Chart
    const productsCtx = document.getElementById('productsChart');
    if (productsCtx && !productsCtx.chart) {
        productsCtx.chart = new Chart(productsCtx, {
            type: 'bar',
            data: {
                labels: ['Cafe Latte', 'Spanish Latte', 'Americano', 'Matcha', 'Frappe'],
                datasets: [{
                    label: 'Units Sold',
                    data: [145, 132, 98, 87, 76],
                    backgroundColor: [
                        '#d97757',
                        '#e88568',
                        '#c96646',
                        '#b85535',
                        '#a74424'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function loadInventoryTracking() {
    const container = document.getElementById('inventoryItems');
    if (!container) return;

    const items = [
        { name: 'Cashew Nuts', qty: '12 kg', status: 'Low Stock', statusClass: 'low' },
        { name: 'Butter', qty: '8 kg', status: 'Low Stock', statusClass: 'low' },
        { name: 'All-Purpose Flour', qty: '25 kg', status: 'In Stock', statusClass: 'ok' },
        { name: 'Coffee Beans', qty: '18 kg', status: 'In Stock', statusClass: 'ok' },
        { name: 'Pistachio', qty: '5 kg', status: 'Critical', statusClass: 'critical' },
        { name: 'Hazelnut', qty: '7 kg', status: 'Low Stock', statusClass: 'low' }
    ];

    container.innerHTML = items.map(item => `
        <div class="table-row">
            <span>${item.name}</span>
            <span class="status-badge ${item.statusClass}">${item.status}</span>
            <span>${item.qty}</span>
        </div>
    `).join('');
}

function loadRecentOrders() {
    const container = document.getElementById('recentOrders');
    if (!container) return;

    const orders = [
        { id: 'ORD-001', customer: 'Maria Santos', amount: '₱850', status: 'Completed' },
        { id: 'ORD-002', customer: 'Juan Cruz', amount: '₱1200', status: 'Preparing' },
        { id: 'ORD-003', customer: 'Ana Reyes', amount: '₱650', status: 'Pending' },
        { id: 'ORD-004', customer: 'Pedro Garcia', amount: '₱1580', status: 'Completed' }
    ];

    container.innerHTML = orders.map(order => `
        <div class="table-row">
            <span>${order.id}</span>
            <span>${order.customer}</span>
            <span>${order.amount}</span>
        </div>
    `).join('');
}

// ============================================
// INVENTORY MANAGEMENT
// ============================================
function loadInventoryData() {
    const tbody = document.getElementById('inventoryTable');
    if (!tbody) return;

    const inventory = [
        { name: 'Cashew Nuts', qty: '12', unit: 'kg', status: 'Low Stock', minStock: '20', cost: '₱850', supplier: 'Premium Nuts Co.' },
        { name: 'Butter', qty: '8', unit: 'kg', status: 'Low Stock', minStock: '15', cost: '₱450', supplier: 'Dairy Fresh' },
        { name: 'All-Purpose Flour', qty: '25', unit: 'kg', status: 'In Stock', minStock: '30', cost: '₱180', supplier: 'Grain Supplies Inc.' },
        { name: 'White Sugar', qty: '45', unit: 'kg', status: 'In Stock', minStock: '25', cost: '₱120', supplier: 'Sweet Supply' },
        { name: 'Coffee Beans', qty: '18', unit: 'kg', status: 'In Stock', minStock: '10', cost: '₱1200', supplier: 'Coffee Masters' },
        { name: 'Milk', qty: '30', unit: 'L', status: 'In Stock', minStock: '20', cost: '₱85', supplier: 'Dairy Fresh' },
        { name: 'Pistachio', qty: '5', unit: 'kg', status: 'Critical', minStock: '10', cost: '₱1500', supplier: 'Premium Nuts Co.' },
        { name: 'Hazelnut', qty: '7', unit: 'kg', status: 'Low Stock', minStock: '12', cost: '₱1200', supplier: 'Premium Nuts Co.' },
        { name: 'Almond', qty: '15', unit: 'kg', status: 'In Stock', minStock: '10', cost: '₱900', supplier: 'Premium Nuts Co.' },
        { name: 'Walnut', qty: '10', unit: 'kg', status: 'In Stock', minStock: '8', cost: '₱800', supplier: 'Premium Nuts Co.' },
        { name: 'Matcha Powder', qty: '6', unit: 'kg', status: 'Low Stock', minStock: '10', cost: '₱2500', supplier: 'Tea Imports' },
        { name: 'Chocolate', qty: '20', unit: 'kg', status: 'In Stock', minStock: '15', cost: '₱600', supplier: 'Choco Delights' },
        { name: 'Caramel Sauce', qty: '12', unit: 'L', status: 'In Stock', minStock: '10', cost: '₱350', supplier: 'Sauce Factory' },
        { name: 'Vanilla Extract', qty: '3', unit: 'L', status: 'Low Stock', minStock: '5', cost: '₱1800', supplier: 'Flavor House' },
        { name: 'Eggs', qty: '50', unit: 'trays', status: 'In Stock', minStock: '30', cost: '₱220', supplier: 'Farm Fresh' },
        { name: 'Cream', qty: '15', unit: 'L', status: 'In Stock', minStock: '12', cost: '₱180', supplier: 'Dairy Fresh' }
    ];

    tbody.innerHTML = inventory.map(item => {
        let statusClass = 'ok';
        if (item.status === 'Critical') statusClass = 'critical';
        else if (item.status === 'Low Stock') statusClass = 'low';
        
        return `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.unit}</td>
                <td><span class="status-badge ${statusClass}">${item.status}</span></td>
                <td>${item.minStock} ${item.unit}</td>
                <td>${item.cost}</td>
                <td>${item.supplier}</td>
                <td>
                    <button class="btn-icon" onclick="editInventory('${item.name}')" title="Edit">✏️</button>
                    <button class="btn-icon" onclick="deleteInventory('${item.name}')" title="Delete">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');
}

function editInventory(itemName) {
    alert(`Edit inventory: ${itemName}\n\nThis would open a modal to edit the item details.`);
    // TODO: Implement edit modal
}

function deleteInventory(itemName) {
    if (confirm(`Are you sure you want to delete ${itemName} from inventory?`)) {
        console.log(`Delete ${itemName}`);
        alert(`${itemName} has been removed from inventory.`);
        loadInventoryData();
    }
}

// ============================================
// RECIPES MANAGEMENT
// ============================================
function loadRecipesData() {
    const container = document.getElementById('recipesGrid');
    if (!container) return;

    const recipes = [
        { name: 'Sans Rival Classic Cashew', category: 'Cakes', prepTime: '120 min', servings: '8', cost: '₱450', ingredients: 12 },
        { name: 'Almond Sans Rival', category: 'Cakes', prepTime: '120 min', servings: '8', cost: '₱480', ingredients: 12 },
        { name: 'Mocha Walnut Sans Rival', category: 'Cakes', prepTime: '120 min', servings: '8', cost: '₱490', ingredients: 14 },
        { name: 'Pistachio Sans Rival', category: 'Cakes', prepTime: '120 min', servings: '8', cost: '₱650', ingredients: 13 },
        { name: 'Choco Hazelnut Sans Rival', category: 'Cakes', prepTime: '120 min', servings: '8', cost: '₱720', ingredients: 15 },
        { name: 'Matcha Pistachio Sans Rival', category: 'Cakes', prepTime: '120 min', servings: '8', cost: '₱680', ingredients: 14 },
        { name: 'Classic Silvanas', category: 'Pastries', prepTime: '90 min', servings: '24', cost: '₱280', ingredients: 8 },
        { name: 'Classic Ensaymada', category: 'Breads', prepTime: '180 min', servings: '12', cost: '₱220', ingredients: 10 },
        { name: 'Cheeserolls', category: 'Breads', prepTime: '150 min', servings: '12', cost: '₱180', ingredients: 9 },
        { name: 'Cafe Latte', category: 'Coffee', prepTime: '5 min', servings: '1', cost: '₱35', ingredients: 3 },
        { name: 'Spanish Latte', category: 'Coffee', prepTime: '5 min', servings: '1', cost: '₱40', ingredients: 4 },
        { name: 'Matcha Latte', category: 'Coffee', prepTime: '5 min', servings: '1', cost: '₱45', ingredients: 3 },
        { name: 'Caramel Macchiato', category: 'Coffee', prepTime: '5 min', servings: '1', cost: '₱42', ingredients: 5 },
        { name: 'Sea Salt Latte', category: 'Coffee', prepTime: '7 min', servings: '1', cost: '₱55', ingredients: 5 },
        { name: 'Classic Tiramisu', category: 'Desserts', prepTime: '45 min', servings: '8', cost: '₱320', ingredients: 9 },
        { name: 'Pistachio Tiramisu', category: 'Desserts', prepTime: '45 min', servings: '8', cost: '₱380', ingredients: 10 },
        { name: 'Biscoff Banoffee Pie', category: 'Desserts', prepTime: '60 min', servings: '8', cost: '₱350', ingredients: 11 },
        { name: 'Chicken Pesto Pasta', category: 'Meals', prepTime: '25 min', servings: '1', cost: '₱120', ingredients: 8 },
        { name: 'Creamy Truffle Pasta', category: 'Meals', prepTime: '25 min', servings: '1', cost: '₱130', ingredients: 9 },
        { name: 'Shrimp Marinara', category: 'Meals', prepTime: '30 min', servings: '1', cost: '₱150', ingredients: 10 }
    ];

    container.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-icon">🍰</div>
            <h4>${recipe.name}</h4>
            <p class="recipe-category">${recipe.category}</p>
            <div class="recipe-details">
                <div class="recipe-detail">
                    <span class="label">Prep Time</span>
                    <span class="value">${recipe.prepTime}</span>
                </div>
                <div class="recipe-detail">
                    <span class="label">Servings</span>
                    <span class="value">${recipe.servings}</span>
                </div>
                <div class="recipe-detail">
                    <span class="label">Cost</span>
                    <span class="value">${recipe.cost}</span>
                </div>
                <div class="recipe-detail">
                    <span class="label">Ingredients</span>
                    <span class="value">${recipe.ingredients}</span>
                </div>
            </div>
            <div class="recipe-actions">
                <button class="btn-icon" onclick="viewRecipe('${recipe.name}')" title="View">👁️</button>
                <button class="btn-icon" onclick="editRecipe('${recipe.name}')" title="Edit">✏️</button>
                <button class="btn-icon" onclick="deleteRecipe('${recipe.name}')" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function viewRecipe(recipeName) {
    alert(`View recipe: ${recipeName}\n\nThis would open a detailed recipe view.`);
}

function editRecipe(recipeName) {
    alert(`Edit recipe: ${recipeName}\n\nThis would open a modal to edit the recipe.`);
}

function deleteRecipe(recipeName) {
    if (confirm(`Delete recipe ${recipeName}?`)) {
        console.log(`Delete ${recipeName}`);
        alert(`${recipeName} has been deleted.`);
        loadRecipesData();
    }
}

// ============================================
// SALES HISTORY
// ============================================
function loadSalesData() {
    const tbody = document.getElementById('salesTable');
    if (!tbody) return;

    const sales = [
        { id: 'ORD-001', customer: 'Maria Santos', items: '2 item(s)', total: '₱850', status: 'Completed', type: 'Pickup', date: '2025-12-09 14:30' },
        { id: 'ORD-002', customer: 'Juan Dela Cruz', items: '3 item(s)', total: '₱1200', status: 'Completed', type: 'Dine-In', date: '2025-12-09 13:15' },
        { id: 'ORD-003', customer: 'Ana Reyes', items: '1 item(s)', total: '₱650', status: 'Completed', type: 'Pickup', date: '2025-12-09 12:00' },
        { id: 'ORD-004', customer: 'Pedro Garcia', items: '4 item(s)', total: '₱1580', status: 'Completed', type: 'Dine-In', date: '2025-12-08 16:45' },
        { id: 'ORD-005', customer: 'Lisa Fernandez', items: '2 item(s)', total: '₱780', status: 'Cancelled', type: 'Pickup', date: '2025-12-08 11:20' },
        { id: 'ORD-006', customer: 'Mark Bautista', items: '5 item(s)', total: '₱2100', status: 'Completed', type: 'Dine-In', date: '2025-12-07 19:30' },
        { id: 'ORD-007', customer: 'Sarah Lee', items: '3 item(s)', total: '₱950', status: 'Completed', type: 'Pickup', date: '2025-12-07 15:20' },
        { id: 'ORD-008', customer: 'Carlos Mendoza', items: '6 item(s)', total: '₱2450', status: 'Completed', type: 'Dine-In', date: '2025-12-06 18:45' },
        { id: 'ORD-009', customer: 'Elena Torres', items: '2 item(s)', total: '₱670', status: 'Completed', type: 'Pickup', date: '2025-12-06 14:10' },
        { id: 'ORD-010', customer: 'Miguel Ramos', items: '4 item(s)', total: '₱1680', status: 'Completed', type: 'Dine-In', date: '2025-12-06 12:30' }
    ];

    tbody.innerHTML = sales.map(sale => `
        <tr onclick="viewOrderDetails('${sale.id}')" style="cursor: pointer;">
            <td>${sale.id}</td>
            <td>${sale.customer}</td>
            <td>${sale.items}</td>
            <td>${sale.total}</td>
            <td><span class="status-badge ${sale.status === 'Completed' ? 'completed' : 'cancelled'}">${sale.status}</span></td>
            <td>${sale.type}</td>
            <td>${sale.date}</td>
        </tr>
    `).join('');
}

function viewOrderDetails(orderId) {
    alert(`View details for ${orderId}\n\nThis would show the complete order breakdown with items, quantities, and payment info.`);
}

// ============================================
// MENU MANAGEMENT - ALL 81 PRODUCTS
// ============================================
function loadMenuManagement() {
    const container = document.getElementById('menuManagement');
    if (!container) return;

    const menuItems = getMenuItems();
    
    container.innerHTML = `
        <div class="menu-controls">
            <div class="search-filter-row">
                <input type="text" id="menuSearch" class="search-input" placeholder="Search menu items...">
                <select id="categoryFilter" class="category-filter">
                    <option value="all">All Categories</option>
                    <option value="coffee">Coffee</option>
                    <option value="cakes">Cakes</option>
                    <option value="bakery">Bakery</option>
                    <option value="meals">Meals</option>
                    <option value="desserts">Desserts</option>
                </select>
                <button class="btn btn-primary btn-sm" onclick="addNewMenuItem()">Add Item</button>
            </div>
        </div>
        <div class="menu-items-grid" id="menuItemsGrid"></div>
    `;

    renderMenuItems(menuItems);

    // Add event listeners
    document.getElementById('menuSearch').addEventListener('input', filterMenuItems);
    document.getElementById('categoryFilter').addEventListener('change', filterMenuItems);
}

      function getMenuItems() {
    if (menuItems.length === 0) {
        menuItems = [
        // COFFEE - Regular Lattes (1-7)
        { id: 1, name: 'Americano', category: 'Coffee', price: 80, image: '../templates/Menu Items/PIC - AMERICANO.jpg', description: 'Classic espresso with hot water', available: true },
        { id: 2, name: 'Cafe Latte', category: 'Coffee', price: 130, image: '../templates/Menu Items/PIC - CAFE LATTE.jpg', description: 'Smooth espresso with steamed milk', available: true },
        { id: 3, name: 'Spanish Latte', category: 'Coffee', price: 140, image: '../templates/Menu Items/PIC - SPANISH LATTE.jpg', description: 'Sweet and creamy Spanish-style latte', available: true },
        { id: 4, name: 'Mocha Latte', category: 'Coffee', price: 150, image: '../templates/Menu Items/PIC - MOCHA LATTE.jpg', description: 'Espresso, chocolate, and steamed milk', available: true },
        { id: 5, name: 'Caramel Macchiato', category: 'Coffee', price: 150, image: '../templates/Menu Items/PIC - CARAMEL MACCHIATO.jpg', description: 'Espresso with vanilla and caramel', available: true },
        { id: 6, name: 'Salted Caramel Macchiato', category: 'Coffee', price: 150, image: '../templates/Menu Items/PIC - SALTED CARAMEL.jpg', description: 'Sweet and salty perfection', available: true },
        { id: 7, name: 'Matcha Latte', category: 'Coffee', price: 140, image: '../templates/Menu Items/PIC - MATCHA LATTE.jpg', description: 'Premium matcha with steamed milk', available: true },
        
        // COFFEE - Sea Salt Series (8-11)
        { id: 8, name: 'Sea Salt Latte', category: 'Coffee', price: 170, image: '../templates/Menu Items/PIC - SEA SALT.jpg', description: 'Creamy latte with sea salt foam', available: true },
        { id: 9, name: 'Spanish Sea Salt Latte', category: 'Coffee', price: 170, image: '../templates/Menu Items/PIC - SPANISH SEA SALT.jpg', description: 'Spanish latte with sea salt twist', available: true },
        { id: 10, name: 'Matcha Sea Salt Latte', category: 'Coffee', price: 170, image: '../templates/Menu Items/PIC - SEA SALT MATCHA.jpg', description: 'Matcha topped with sea salt cream', available: true },
        { id: 11, name: 'Biscoff Sea Salt Latte', category: 'Coffee', price: 190, image: '../templates/Menu Items/PIC - BISCOFF SEA SALT.jpg', description: 'Biscoff cookie latte with sea salt', available: true },
        
        // COFFEE - Frappes (12-19)
        { id: 12, name: 'Caramel Macchiato Frappe', category: 'Coffee', price: 180, image: '../templates/Menu Items/PIC - CARAMEL FRAPPE.jpg', description: 'Iced blended caramel coffee', available: true },
        { id: 13, name: 'Salted Caramel Macchiato Frappe', category: 'Coffee', price: 180, image: '../templates/Menu Items/PIC - SALTED CARAMEL FRAPPE.jpg', description: 'Iced salted caramel delight', available: true },
        { id: 14, name: 'Java Chip Frappe', category: 'Coffee', price: 185, image: '../templates/Menu Items/PIC - JAVA CHIP FRAPPE.jpg', description: 'Coffee with chocolate chips', available: true },
        { id: 15, name: 'Dark Cookies & Cream Frappe', category: 'Coffee', price: 185, image: '../templates/Menu Items/PIC - DARK COOKIES AND CREAM.jpg', description: 'Oreo-inspired coffee frappe', available: true },
        { id: 16, name: 'Mocha Frappe', category: 'Coffee', price: 180, image: '../templates/Menu Items/PIC - MOCHA FRAPPE.jpg', description: 'Iced blended chocolate coffee', available: true },
        { id: 17, name: 'Chocolate Frappe', category: 'Coffee', price: 170, image: '../templates/Menu Items/PIC - CHOCO FRAPPE.jpg', description: 'Rich chocolate blended drink', available: true },
        { id: 18, name: 'Strawberry Cream Frappe', category: 'Coffee', price: 170, image: '../templates/Menu Items/PIC - STRAWBERRY FRAPPE.jpg', description: 'Sweet strawberry frappe', available: true },
        { id: 19, name: 'Matcha Frappe', category: 'Coffee', price: 180, image: '../templates/Menu Items/PIC - MATCHA FRAPPE.jpg', description: 'Iced blended matcha', available: true },
        
        // COFFEE - Specialty Drinks (20-26)
        { id: 20, name: 'Chocolate Ice Shaken', category: 'Coffee', price: 130, image: '../templates/Menu Items/PIC - CHOCO DRINK.jpg', description: 'Shaken chocolate beverage', available: true },
        { id: 21, name: 'Strawberry Ice Shaken', category: 'Coffee', price: 130, image: '../templates/Menu Items/PIC - STRAWBERRY DRINK.jpg', description: 'Refreshing strawberry drink', available: true },
        { id: 22, name: 'Ube Ice Shaken', category: 'Coffee', price: 130, image: '../templates/Menu Items/PIC - UBE DRINK.jpg', description: 'Filipino purple yam drink', available: true },
        { id: 23, name: 'Biscoff Latte', category: 'Coffee', price: 170, image: '../templates/Menu Items/PIC - BISCOFF DRINK.jpg', description: 'Cookie butter latte', available: true },
        { id: 24, name: 'Strawberry Matcha', category: 'Coffee', price: 170, image: '../templates/Menu Items/PIC - STRAWBERRY MATCHA.jpg', description: 'Strawberry and matcha fusion', available: true },
        { id: 25, name: 'House Blend Iced Tea', category: 'Coffee', price: 80, image: '../templates/Menu Items/PIC - ICE TEA.jpg', description: 'Refreshing house tea', available: true },
        { id: 26, name: 'Hot Chocolate', category: 'Coffee', price: 120, image: '../templates/Menu Items/PIC - HOT CHOCO.jpg', description: 'Rich and creamy hot chocolate', available: true },
        
        // CAKES - Sans Rival Mini (27-32)
        { id: 27, name: 'Classic Cashew Sans Rival (Mini)', category: 'Cakes', price: 95, image: '../templates/Menu Items/PIC - CLASSIC CASHEW.jpg', description: 'Traditional Sans Rival with premium cashew nuts', available: true },
        { id: 28, name: 'Almond Sans Rival (Mini)', category: 'Cakes', price: 105, image: '../templates/Menu Items/PIC - ALMOND.jpg', description: 'Almond meringue layers', available: true },
        { id: 29, name: 'Mocha Walnut Sans Rival (Mini)', category: 'Cakes', price: 105, image: '../templates/Menu Items/PIC - MOCHA WALNUT.jpg', description: 'Coffee and walnut perfection', available: true },
        { id: 30, name: 'Pistachio Sans Rival (Mini)', category: 'Cakes', price: 125, image: '../templates/Menu Items/PIC - PISTACHIO.jpg', description: 'Luxurious pistachio meringue', available: true },
        { id: 31, name: 'Choco Hazelnut Sans Rival (Mini)', category: 'Cakes', price: 135, image: '../templates/Menu Items/PIC - CHOCO HAZELNUT.jpg', description: 'Rich chocolate hazelnut layers', available: true },
        { id: 32, name: 'Matcha Pistachio Sans Rival (Mini)', category: 'Cakes', price: 125, image: '../templates/Menu Items/PIC - MATCHA PISTACHIO.jpg', description: 'Matcha and pistachio fusion', available: true },
        
        // CAKES - Sans Rival Solo (33-38)
        { id: 33, name: 'Classic Cashew Sans Rival (Solo)', category: 'Cakes', price: 230, image: '../templates/Menu Items/PIC - CLASSIC CASHEW.jpg', description: 'Individual serving of classic sans rival', available: true },
        { id: 34, name: 'Almond Sans Rival (Solo)', category: 'Cakes', price: 240, image: '../templates/Menu Items/PIC - ALMOND.jpg', description: 'Individual almond sans rival', available: true },
        { id: 35, name: 'Mocha Walnut Sans Rival (Solo)', category: 'Cakes', price: 240, image: '../templates/Menu Items/PIC - MOCHA WALNUT.jpg', description: 'Individual mocha walnut sans rival', available: true },
        { id: 36, name: 'Pistachio Sans Rival (Solo)', category: 'Cakes', price: 270, image: '../templates/Menu Items/PIC - PISTACHIO.jpg', description: 'Luxurious pistachio meringue layers', available: true },
        { id: 37, name: 'Choco Hazelnut Sans Rival (Solo)', category: 'Cakes', price: 295, image: '../templates/Menu Items/PIC - CHOCO HAZELNUT.jpg', description: 'Individual choco hazelnut delight', available: true },
        { id: 38, name: 'Matcha Pistachio Sans Rival (Solo)', category: 'Cakes', price: 270, image: '../templates/Menu Items/PIC - MATCHA PISTACHIO.jpg', description: 'Individual matcha pistachio sans rival', available: true },
        
        // CAKES - Sans Rival 7" Square (39-44)
        { id: 39, name: 'Classic Cashew Sans Rival (7" Square)', category: 'Cakes', price: 500, image: '../templates/Menu Items/PIC - CLASSIC CASHEW.jpg', description: 'Perfect for sharing', available: true },
        { id: 40, name: 'Almond Sans Rival (7" Square)', category: 'Cakes', price: 520, image: '../templates/Menu Items/PIC - ALMOND.jpg', description: 'Square almond sans rival cake', available: true },
        { id: 41, name: 'Mocha Walnut Sans Rival (7" Square)', category: 'Cakes', price: 520, image: '../templates/Menu Items/PIC - MOCHA WALNUT.jpg', description: 'Square mocha walnut cake', available: true },
        { id: 42, name: 'Pistachio Sans Rival (7" Square)', category: 'Cakes', price: 595, image: '../templates/Menu Items/PIC - PISTACHIO.jpg', description: 'Square pistachio sans rival cake', available: true },
        { id: 43, name: 'Choco Hazelnut Sans Rival (7" Square)', category: 'Cakes', price: 650, image: '../templates/Menu Items/PIC - CHOCO HAZELNUT.jpg', description: 'Square choco hazelnut cake', available: true },
        { id: 44, name: 'Matcha Pistachio Sans Rival (7" Square)', category: 'Cakes', price: 595, image: '../templates/Menu Items/PIC - MATCHA PISTACHIO.jpg', description: 'Square matcha pistachio cake', available: true },
        
        // CAKES - Sans Rival 8" Round (45-50)
        { id: 45, name: 'Classic Cashew Sans Rival (8" Round)', category: 'Cakes', price: 840, image: '../templates/Menu Items/PIC - CLASSIC CASHEW.jpg', description: 'Full-sized round cashew sans rival cake', available: true },
        { id: 46, name: 'Almond Sans Rival (8" Round)', category: 'Cakes', price: 860, image: '../templates/Menu Items/PIC - ALMOND.jpg', description: 'Round almond sans rival cake', available: true },
        { id: 47, name: 'Mocha Walnut Sans Rival (8" Round)', category: 'Cakes', price: 860, image: '../templates/Menu Items/PIC - MOCHA WALNUT.jpg', description: 'Round mocha walnut cake', available: true },
        { id: 48, name: 'Pistachio Sans Rival (8" Round)', category: 'Cakes', price: 1020, image: '../templates/Menu Items/PIC - PISTACHIO.jpg', description: 'Round pistachio sans rival cake', available: true },
        { id: 49, name: 'Choco Hazelnut Sans Rival (8" Round)', category: 'Cakes', price: 1050, image: '../templates/Menu Items/PIC - CHOCO HAZELNUT.jpg', description: 'Round choco hazelnut cake', available: true },
        { id: 50, name: 'Matcha Pistachio Sans Rival (8" Round)', category: 'Cakes', price: 1020, image: '../templates/Menu Items/PIC - MATCHA PISTACHIO.jpg', description: 'Round matcha pistachio cake', available: true },
        
        // BAKERY (51-68)
        { id: 51, name: 'Classic Ensaymada', category: 'Bakery', price: 55, image: '../templates/Menu Items/PIC - CLASSIC ENSAYMADA.jpg', description: 'Filipino brioche with butter and sugar', available: true },
        { id: 52, name: 'Classic Ensaymada (Box of 6)', category: 'Bakery', price: 300, image: '../templates/Menu Items/PIC - CLASSIC ENSAYMADA.jpg', description: 'Six pieces of Filipino brioche', available: true },
        { id: 53, name: 'Cheeserolls', category: 'Bakery', price: 45, image: '../templates/Menu Items/PIC - CHEESEROLLS.jpg', description: 'Soft rolls with creamy cheese', available: true },
        { id: 54, name: 'Cheeserolls (Box of 6)', category: 'Bakery', price: 260, image: '../templates/Menu Items/PIC - CHEESEROLLS.jpg', description: 'Six pieces of cheese rolls', available: true },
        { id: 55, name: 'Silvanas (Box of 10)', category: 'Bakery', price: 380, image: '../templates/Menu Items/PIC - SILVANAS.jpg', description: 'Frozen buttercream cookie sandwiches', available: true },
        { id: 56, name: 'Silvanas (Box of 20)', category: 'Bakery', price: 760, image: '../templates/Menu Items/PIC - SILVANAS.jpg', description: 'Twenty frozen buttercream cookie sandwiches', available: true },
        { id: 57, name: 'Original Caramel Bites (200g)', category: 'Bakery', price: 105, image: '../templates/Menu Items/TOASTED CARAMEL BITES.jpg', description: 'Sweet and chewy caramel treats', available: true },
        { id: 58, name: 'Original Caramel Bites (400g)', category: 'Bakery', price: 200, image: '../templates/Menu Items/TOASTED CARAMEL BITES.jpg', description: 'Large pack of caramel treats', available: true },
        { id: 59, name: 'Salted Caramel Bites (200g)', category: 'Bakery', price: 105, image: '../templates/Menu Items/TOASTED CARAMEL BITES.jpg', description: 'Salted caramel perfection', available: true },
        { id: 60, name: 'Salted Caramel Bites (400g)', category: 'Bakery', price: 200, image: '../templates/Menu Items/TOASTED CARAMEL BITES.jpg', description: 'Large pack of salted caramel', available: true },
        { id: 61, name: 'Mixed Nuts (200g)', category: 'Bakery', price: 200, image: '../templates/Menu Items/PIC - MIXED NUTS.jpg', description: 'Premium mixed nuts', available: true },
        { id: 62, name: 'Lengua de Gato', category: 'Bakery', price: 105, image: '../templates/Menu Items/PIC - LENGUA DE GATO.jpg', description: 'Crispy cat tongue cookies', available: true },
        { id: 63, name: 'Butter Toast & Broas', category: 'Bakery', price: 105, image: '../templates/Menu Items/PIC - BUTTER TOAST.jpg', description: 'Crunchy butter toast', available: true },
        { id: 64, name: 'Creme Leche Flan', category: 'Bakery', price: 150, image: '../templates/Menu Items/PIC - LETCHE FLAN.jpg', description: 'Filipino caramel custard', available: true },
        { id: 65, name: 'Creme Leche Flan (Family)', category: 'Bakery', price: 250, image: '../templates/Menu Items/PIC - LETCHE FLAN.jpg', description: 'Large Filipino caramel custard', available: true },
        { id: 66, name: 'Banana Bread', category: 'Bakery', price: 160, image: '../templates/Menu Items/PIC - BANANA BREAD.jpg', description: 'Moist homemade banana bread', available: true },
        { id: 67, name: 'Tea Cookies (Small)', category: 'Bakery', price: 105, image: '../templates/Menu Items/TEA COOKIES.jpg', description: 'Buttery tea biscuits', available: true },
        { id: 68, name: 'Tea Cookies (Big)', category: 'Bakery', price: 180, image: '../templates/Menu Items/TEA COOKIES.jpg', description: 'Large pack of buttery tea biscuits', available: true },
        
        // MEALS - All Day Breakfast (69-72)
        { id: 69, name: 'Tapa', category: 'Meals', price: 170, image: '../templates/Menu Items/PIC - TAPSILOG.jpg', description: 'Filipino beef tapa with rice and egg', available: true },
        { id: 70, name: 'Tocino', category: 'Meals', price: 170, image: '../templates/Menu Items/PIC - TOCILOG.jpg', description: 'Sweet cured pork with rice and egg', available: true },
        { id: 71, name: 'Longanisa', category: 'Meals', price: 150, image: '../templates/Menu Items/PIC - LONGSILOG.jpg', description: 'Filipino sausage with rice and egg', available: true },
        { id: 72, name: 'Hungarian', category: 'Meals', price: 210, image: '../templates/Menu Items/PIC - HUNGARIAN.jpg', description: 'Hungarian sausage with rice and egg', available: true },
        
        // MEALS - Pasta (73-76)
        { id: 73, name: 'Chicken Pesto', category: 'Meals', price: 270, image: '../templates/Menu Items/PIC - CHICKEN PESTO.jpg', description: 'Creamy basil pesto with chicken', available: true },
        { id: 74, name: 'Creamy Truffle Pasta', category: 'Meals', price: 270, image: '../templates/Menu Items/PIC - TRUFFLE PASTA.jpg', description: 'Luxurious truffle cream pasta', available: true },
        { id: 75, name: 'Shrimp Marinara', category: 'Meals', price: 290, image: '../templates/Menu Items/PIC - SHRIMP MARINARA.jpg', description: 'Tomato-based sauce with shrimp', available: true },
        { id: 76, name: 'Lasagna', category: 'Meals', price: 290, image: '../templates/Menu Items/PIC - LASAGNA.jpg', description: 'Layered pasta with meat and cheese', available: true },
        
        // DESSERTS (77-81)
        { id: 77, name: 'Classic Tiramisu', category: 'Desserts', price: 190, image: '../templates/Menu Items/PIC - TIRAMISU.jpg', description: 'Italian coffee-flavored dessert', available: true },
        { id: 78, name: 'Pistachio Tiramisu', category: 'Desserts', price: 230, image: '../templates/Menu Items/PIC - PISTACHIO TIRAMISU.jpg', description: 'Tiramisu with pistachio twist', available: true },
        { id: 79, name: 'Biscoff Banoffee Pie', category: 'Desserts', price: 210, image: '../templates/Menu Items/PIC - BANAOFFE.jpg', description: 'Banana toffee pie with biscoff', available: true },
        { id: 80, name: 'Brownies', category: 'Desserts', price: 45, image: '../templates/Menu Items/PIC - BROWNIES.jpg', description: 'Rich chocolate brownies', available: true },
        { id: 81, name: 'Revel Bar', category: 'Desserts', price: 45, image: '../templates/Menu Items/PIC - REVEL BAR.jpg', description: 'Filipino chocolate oatmeal bar', available: true }
    ];
    }
    return menuItems;
}

function renderMenuItems(items) {
    const grid = document.getElementById('menuItemsGrid');
    if (!grid) return;

    grid.innerHTML = items.map(item => `
        <div class="menu-management-card">
            <img src="${item.image}" 
                 alt="${item.name}" 
                 class="menu-card-image" 
                 onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'">
            <div class="menu-card-actions">
                <button class="icon-btn" onclick="editMenuItem(${item.id})" title="Edit">✏️</button>
                <button class="icon-btn" onclick="deleteMenuItem(${item.id})" title="Delete">🗑️</button>
            </div>
            <div class="menu-card-content">
                <div class="menu-card-header">
                    <h4 class="menu-card-title">${item.name}</h4>
                    <span class="menu-card-price">₱${item.price}</span>
                </div>
                <p class="menu-card-category">${item.category}</p>
                <p class="menu-card-description">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="availability-label">Availability</span>
                    <label class="toggle-switch">
                        <input type="checkbox" ${item.available ? 'checked' : ''} onchange="toggleAvailability(${item.id}, this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>
    `).join('');
}

function filterMenuItems() {
    const searchTerm = document.getElementById('menuSearch').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    let items = getMenuItems();
    
    if (category !== 'all') {
        items = items.filter(item => item.category.toLowerCase() === category);
    }
    
    if (searchTerm) {
        items = items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderMenuItems(items);
}

function toggleAvailability(itemId, available) {

    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    item.available = available;
    alert(`${item.name} is now ${available ? "Available" : "Unavailable"}`);
}

function editMenuItem(itemId) {

    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const newName = prompt("Edit Name:", item.name);
    const newCategory = prompt("Edit Category:", item.category);
    const newPrice = prompt("Edit Price:", item.price);
    const newDesc = prompt("Edit Description:", item.description);

    if (!newName || !newCategory || !newPrice || !newDesc) {
        alert("Edit cancelled.");
        return;
    }

    item.name = newName;
    item.category = newCategory;
    item.price = parseFloat(newPrice);
    item.description = newDesc;

    alert("Item updated!");
    renderMenuItems(menuItems);
}


function deleteMenuItem(itemId) {

    const index = menuItems.findIndex(i => i.id === itemId);
    if (index === -1) return;

    if (confirm(`Delete "${menuItems[index].name}"?`)) {
        menuItems.splice(index, 1);
        alert("Item deleted.");
        renderMenuItems(menuItems);
    }
}


function addNewMenuItem() {

    const name = prompt("Item Name:");
    const category = prompt("Category (Coffee, Bakery, Meals, Desserts):");
    const price = prompt("Price:");
    const description = prompt("Description:");

    if (!name || !category || !price || !description) {
        alert("All fields are required!");
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        category: category,
        price: parseFloat(price),
        description: description,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        available: true
    };

    menuItems.push(newItem);

    alert("Item Added Successfully!");
    renderMenuItems(menuItems);
}

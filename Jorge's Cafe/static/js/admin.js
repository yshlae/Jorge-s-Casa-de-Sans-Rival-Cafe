/**
 * Jorge's Cafe - Admin Dashboard JavaScript
 * Handles all admin panel functionality
 */

const API_BASE_URL = 'http://localhost/jorges-cafe/api';

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', async function() {
    // Only run admin code if we're on an admin page
    if (!document.querySelector('.admin-container')) {
        return; // Exit if not on admin page
    }
    
    console.log('Admin Dashboard Loaded');
    
    // Check authentication first
    const isAuthenticated = await checkAdminAuth();
    
    if (!isAuthenticated) {
        return; // Will redirect to login
    }
    
    // Set up navigation
    setupNavigation();
    
    // Load initial data
    loadDashboard();
    
    // Set up form handlers
    setupFormHandlers();
    
    // Display user info
    displayUserInfo();
});

// ===== AUTHENTICATION =====

async function checkAdminAuth() {
    // Don't check auth if not on admin page
    const isAdminPage = window.location.pathname.includes('admin') || 
                        document.querySelector('.admin-container');
    
    if (!isAdminPage) {
        return true; // Allow non-admin pages to load
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/check`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Check if response is ok
        if (!response.ok) {
            console.error('Auth check failed with status:', response.status);
            // If server is not responding or endpoint doesn't exist, allow access for development
            if (response.status === 404 || response.status === 500) {
                console.warn('Auth endpoint not available - allowing access for development');
                return true; // Allow access during development
            }
            window.location.href = 'login.html';
            return false;
        }
        
        const data = await response.json();
        
        if (!data.authenticated || !data.user.is_admin) {
            console.log('User not authenticated or not admin');
            window.location.href = 'login.html';
            return false;
        }
        
        // Store user info
        sessionStorage.setItem('admin_user', JSON.stringify(data.user));
        return true;
    } catch (error) {
        console.error('Auth check error:', error);
        // During development, if auth API is not set up, allow access
        console.warn('Auth system not available - allowing access for development');
        return true; // Allow access during development
        
        // Uncomment this line when auth is fully implemented:
        // window.location.href = 'login.html';
        // return false;
    }
}

function displayUserInfo() {
    const userStr = sessionStorage.getItem('admin_user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            console.log('Logged in as:', user.username);
            // You can display user info in the admin panel header
            const userDisplay = document.querySelector('.admin-logo p');
            if (userDisplay && user.username) {
                userDisplay.textContent = `Admin: ${user.username}`;
            }
        } catch (e) {
            console.error('Error parsing user info:', e);
        }
    }
}

async function logout() {
    try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    sessionStorage.removeItem('admin_user');
    window.location.href = 'login.html';
}

// ===== NAVIGATION =====

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding page
            const page = this.dataset.page;
            const pageElement = document.getElementById(`${page}-page`);
            if (pageElement) {
                pageElement.classList.add('active');
            }
            
            // Load page data
            loadPageData(page);
        });
    });
}

function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'menu':
            loadMenuItems();
            break;
        case 'contacts':
            loadContacts();
            break;
    }
}

// ===== DASHBOARD =====

async function loadDashboard() {
    try {
        // Load statistics
        const statsResponse = await fetch(`${API_BASE_URL}/stats`);
        
        if (!statsResponse.ok) {
            throw new Error('Stats API not available');
        }
        
        const statsData = await statsResponse.json();
        
        if (statsData.success) {
            document.getElementById('total-orders').textContent = statsData.stats.total_orders || 0;
            document.getElementById('pending-orders').textContent = statsData.stats.pending_orders || 0;
            document.getElementById('total-revenue').textContent = `₱${(statsData.stats.total_revenue || 0).toFixed(2)}`;
            document.getElementById('total-items').textContent = statsData.stats.total_menu_items || 0;
        }
        
        // Load recent orders
        const ordersResponse = await fetch(`${API_BASE_URL}/orders?limit=5`);
        
        if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json();
            
            if (ordersData.success) {
                displayRecentOrders(ordersData.orders || []);
            }
        }
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        // Show default/empty state instead of error
        document.getElementById('total-orders').textContent = '0';
        document.getElementById('pending-orders').textContent = '0';
        document.getElementById('total-revenue').textContent = '₱0.00';
        document.getElementById('total-items').textContent = '0';
        
        const container = document.getElementById('recent-orders');
        if (container) {
            container.innerHTML = '<p class="empty-message">No recent orders (API not connected)</p>';
        }
    }
}

function displayRecentOrders(orders) {
    const container = document.getElementById('recent-orders');
    
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="empty-message">No recent orders</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-status status-${order.status}">${order.status}</span>
            </div>
            <div class="order-details">
                <div class="detail-row">
                    <span class="detail-label">Customer:</span>
                    <span class="detail-value">${order.customer_name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total:</span>
                    <span class="detail-value">₱${order.total_amount.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${formatDate(order.created_at)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== ORDERS MANAGEMENT =====

async function loadOrders(status = 'all') {
    try {
        let url = `${API_BASE_URL}/orders`;
        if (status !== 'all') {
            url += `?status=${status}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Orders API not available');
        }
        
        const data = await response.json();
        
        if (data.success) {
            displayOrders(data.orders || []);
        }
        
    } catch (error) {
        console.error('Error loading orders:', error);
        const container = document.getElementById('orders-list');
        if (container) {
            container.innerHTML = '<p class="empty-message">No orders found (API not connected)</p>';
        }
    }
}

function displayOrders(orders) {
    const container = document.getElementById('orders-list');
    
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="empty-message">No orders found</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-status status-${order.status}">${order.status}</span>
            </div>
            
            <div class="order-details">
                <div class="detail-row">
                    <span class="detail-label">Customer:</span>
                    <span class="detail-value">${order.customer_name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${order.customer_email || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">${order.customer_phone || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${order.order_type}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${formatDate(order.created_at)}</span>
                </div>
            </div>
            
            <div class="order-items">
                <strong>Items:</strong>
                ${(order.items || []).map(item => `
                    <div class="order-item">
                        <span>${item.quantity}x ${item.menu_item.name}</span>
                        <span>₱${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="detail-row">
                <span class="detail-label"><strong>Total:</strong></span>
                <span class="detail-value"><strong>₱${order.total_amount.toFixed(2)}</strong></span>
            </div>
            
            ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
            
            <div class="order-actions">
                <select onchange="updateOrderStatus(${order.id}, this.value)" class="status-select">
                    <option value="">Change Status</option>
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <button class="btn btn-danger btn-small" onclick="deleteOrder(${order.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

async function updateOrderStatus(orderId, status) {
    if (!status) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Order status updated successfully', 'success');
            loadOrders();
        } else {
            showNotification(data.message, 'error');
        }
        
    } catch (error) {
        console.error('Error updating order status:', error);
        showNotification('Error updating order status', 'error');
    }
}

async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Order deleted successfully', 'success');
            loadOrders();
        } else {
            showNotification(data.message, 'error');
        }
        
    } catch (error) {
        console.error('Error deleting order:', error);
        showNotification('Error deleting order', 'error');
    }
}

// ===== MENU MANAGEMENT =====

async function loadMenuItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        
        if (!response.ok) {
            throw new Error('Menu API not available');
        }
        
        const data = await response.json();
        
        if (data.success) {
            displayMenuItems(data.items || []);
        }
        
    } catch (error) {
        console.error('Error loading menu items:', error);
        const container = document.getElementById('menu-list');
        if (container) {
            container.innerHTML = '<p class="empty-message">No menu items found (API not connected)</p>';
        }
    }
}

function displayMenuItems(items) {
    const container = document.getElementById('menu-list');
    
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = '<p class="empty-message">No menu items found</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="menu-grid">
            ${items.map(item => `
                <div class="menu-card">
                    <span class="availability-badge ${item.available ? 'available' : 'unavailable'}">
                        ${item.available ? 'Available' : 'Unavailable'}
                    </span>
                    <div class="menu-image">☕</div>
                    <div class="menu-info">
                        <span class="menu-category">${item.category}</span>
                        <h3>${item.name}</h3>
                        <p>${item.description || 'No description'}</p>
                        <div class="menu-price">₱${item.price.toFixed(2)}</div>
                        ${item.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
                        <div class="menu-actions">
                            <button class="btn btn-primary btn-small" onclick='editMenuItem(${JSON.stringify(item).replace(/'/g, "&apos;")})'>Edit</button>
                            <button class="btn btn-danger btn-small" onclick="deleteMenuItem(${item.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function openAddItemModal() {
    document.getElementById('modal-title').textContent = 'Add Menu Item';
    document.getElementById('item-form').reset();
    document.getElementById('item-id').value = '';
    document.getElementById('item-available').checked = true;
    document.getElementById('item-modal').classList.add('active');
}

function editMenuItem(item) {
    document.getElementById('modal-title').textContent = 'Edit Menu Item';
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-description').value = item.description || '';
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-image').value = item.image_url || '';
    document.getElementById('item-available').checked = item.available;
    document.getElementById('item-featured').checked = item.featured;
    document.getElementById('item-modal').classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('item-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

async function deleteMenuItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/menu/${itemId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Menu item deleted successfully', 'success');
            loadMenuItems();
        } else {
            showNotification(data.message, 'error');
        }
        
    } catch (error) {
        console.error('Error deleting menu item:', error);
        showNotification('Error deleting menu item', 'error');
    }
}

// ===== CONTACTS MANAGEMENT =====

async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`);
        
        if (!response.ok) {
            throw new Error('Contact API not available');
        }
        
        const data = await response.json();
        
        if (data.success) {
            displayContacts(data.contacts || []);
        }
        
    } catch (error) {
        console.error('Error loading contacts:', error);
        const container = document.getElementById('contacts-list');
        if (container) {
            container.innerHTML = '<p class="empty-message">No contact messages (API not connected)</p>';
        }
    }
}

function displayContacts(contacts) {
    const container = document.getElementById('contacts-list');
    
    if (!container) return;
    
    if (contacts.length === 0) {
        container.innerHTML = '<p class="empty-message">No contact messages</p>';
        return;
    }
    
    container.innerHTML = contacts.map(contact => `
        <div class="contact-card ${contact.is_read ? '' : 'unread'}">
            <div class="contact-header">
                <h3>${contact.name}</h3>
                <span class="contact-date">${formatDate(contact.created_at)}</span>
            </div>
            <div class="contact-details">
                <p><strong>Email:</strong> ${contact.email}</p>
                ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
                ${contact.subject ? `<p><strong>Subject:</strong> ${contact.subject}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${contact.message}</p>
            </div>
            ${!contact.is_read ? `
                <button class="btn btn-primary btn-small" onclick="markAsRead(${contact.id})">
                    Mark as Read
                </button>
            ` : ''}
        </div>
    `).join('');
}

async function markAsRead(contactId) {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/${contactId}/read`, {
            method: 'PUT'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Contact marked as read', 'success');
            loadContacts();
        }
        
    } catch (error) {
        console.error('Error marking contact as read:', error);
        showNotification('Error marking contact as read', 'error');
    }
}

// ===== FORM HANDLERS =====

function setupFormHandlers() {
    // Item form
    const itemForm = document.getElementById('item-form');
    if (itemForm) {
        itemForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const itemId = document.getElementById('item-id').value;
            const itemData = {
                name: document.getElementById('item-name').value,
                category: document.getElementById('item-category').value,
                description: document.getElementById('item-description').value,
                price: parseFloat(document.getElementById('item-price').value),
                image_url: document.getElementById('item-image').value,
                available: document.getElementById('item-available').checked,
                featured: document.getElementById('item-featured').checked
            };
            
            try {
                const url = itemId ? `${API_BASE_URL}/menu/${itemId}` : `${API_BASE_URL}/menu`;
                const method = itemId ? 'PUT' : 'POST';
                
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showNotification(`Menu item ${itemId ? 'updated' : 'added'} successfully`, 'success');
                    closeModal();
                    loadMenuItems();
                } else {
                    showNotification(data.message, 'error');
                }
                
            } catch (error) {
                console.error('Error saving menu item:', error);
                showNotification('Error saving menu item', 'error');
            }
        });
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadOrders(this.dataset.status);
        });
    });
    
    // Modal close
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    const itemModal = document.getElementById('item-modal');
    if (itemModal) {
        itemModal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }
}

// ===== UTILITY FUNCTIONS =====

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles inline
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        gap: 15px;
        align-items: center;
    `;
    
    document.body.appendChild(notification);
    
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Make functions global
window.openAddItemModal = openAddItemModal;
window.editMenuItem = editMenuItem;
window.closeModal = closeModal;
window.deleteMenuItem = deleteMenuItem;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;
window.markAsRead = markAsRead;
window.logout = logout;
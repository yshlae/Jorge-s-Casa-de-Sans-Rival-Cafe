// Jorge's Cafe - Main JavaScript

// Menu Category Toggle
function showMenuCategory(category) {
    const tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // This would load different categories from PHP backend
    console.log('Loading category:', category);
    
    
    fetch('api/get_menu.php?category=' + category)
        .then(response => response.json())
        .then(data => {
            displayMenuItems(data);
        })
        .catch(error => console.error('Error loading menu:', error));
    
}

// Add to Cart Function
function addToCart(productName, price) {
    alert('Added to cart:\n' + productName + ' - ₱' + price + '\n\nIntegrate with PHP backend:\n- POST to add_to_cart.php\n- Update cart session\n- Refresh cart count');
    
    
    fetch('api/add_to_cart.php', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            product: productName,
            price: price,
            quantity: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            updateCartCount(data.cartCount);
            showNotification('Item added to cart!');
        } else {
            alert('Error adding item to cart');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add item to cart');
    });
    
}

// Update Cart Count (to be called after adding items)
function updateCartCount(count) {
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        // Update the cart button text with count
        cartButton.innerHTML = `🛒 Cart (${count})`;
    }
}

// Show Notification
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
});

// Play Button for Story Video
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('Video player would open here - link to cafe tour or promotional video');
            

            const videoModal = document.createElement('div');
            videoModal.innerHTML = `
                <div class="video-modal">
                    <div class="video-container">
                        <button class="close-modal">&times;</button>
                        <iframe src="YOUR_VIDEO_URL" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            document.body.appendChild(videoModal);
            
        });
    }
});

// Order Tab Toggle
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.order-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.order-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter products based on tab
            const filter = this.textContent.toLowerCase();
            console.log('Filtering products:', filter);
            
            
            fetch('api/get_products.php?filter=' + filter)
                .then(response => response.json())
                .then(data => {
                    displayProducts(data);
                });
            
        });
    });
});

// Load Menu Items from PHP (example function)
function loadMenuItems() {
    
    fetch('api/get_menu.php')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.querySelector('.menu-grid');
            menuContainer.innerHTML = '';
            
            data.forEach(item => {
                const menuItem = `
                    <div class="menu-item">
                        <div class="menu-item-header">
                            <h4>${item.name}</h4>
                            <span class="menu-item-price">₱${item.price}</span>
                        </div>
                        <p>${item.description}</p>
                    </div>
                `;
                menuContainer.innerHTML += menuItem;
            });
        })
        .catch(error => console.error('Error loading menu:', error));
    
}

function loadProducts() {
    
    fetch('api/get_products.php')
        .then(response => response.json())
        .then(data => {
            const productGrid = document.querySelector('.products-grid');
            productGrid.innerHTML = '';
            
            data.forEach(product => {
                const productCard = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <div class="product-header">
                                <h3 class="product-name">${product.name}</h3>
                                <span class="product-price">₱${product.price}</span>
                            </div>
                            <p class="product-description">${product.description}</p>
                            <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price})">
                                + Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                productGrid.innerHTML += productCard;
            });
        })
        .catch(error => console.error('Error loading products:', error));
    
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jorge\'s Cafe website loaded');
    
    // Uncomment these when PHP backend is ready
    // loadMenuItems();
    // loadProducts();
    // loadCartCount();
});

// Get Cart Count from PHP
function loadCartCount() {
    
    fetch('api/get_cart_count.php')
        .then(response => response.json())
        .then(data => {
            if (data.count > 0) {
                updateCartCount(data.count);
            }
        })
        .catch(error => console.error('Error loading cart count:', error));
    
}

// Add animation styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
// Jorge's Cafe - Main JavaScript
document.addEventListener("DOMContentLoaded", () => {
    fetch("../api/check_session.php")
      .then(res => res.json())
      .then(data => {
          const login = document.getElementById("loginLink");
          const logout = document.getElementById("logoutLink");

          if (data.logged) {
              login.style.display = "none";
              logout.style.display = "inline";
          } else {
              login.style.display = "inline";
              logout.style.display = "none";
          }
      });
});

// Menu Category Toggle
function showMenuCategory(category) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Hide all menu categories
    const categories = document.querySelectorAll('.menu-category');
    categories.forEach(cat => cat.classList.add('hidden'));
    
    // Show selected category
    const selectedCategory = document.getElementById(category + '-menu');
    if (selectedCategory) {
        selectedCategory.classList.remove('hidden');
        selectedCategory.classList.add('active');
    }
    
    console.log('Loading category:', category);
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

// Load Menu Items from PHP (example function)
function loadMenuItems() {
    
    fetch("api/get_menu.php")
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
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// View cart - opens modal
function viewCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    showCartModal();
}

// Show cart modal
function showCartModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById('cart-modal');
    if (existingModal) existingModal.remove();
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2>Your Cart</h2>
                <button class="cart-modal-close" onclick="closeCartModal()">&times;</button>
            </div>
            
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">₱${item.price.toFixed(2)}</p>
                        </div>
                        <div class="cart-item-controls">
                            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="qty-btn">-</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="qty-btn">+</button>
                            <button onclick="removeFromCart('${item.id}')" class="remove-btn">Remove</button>
                        </div>
                        <div class="cart-item-total">
                            ₱${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-total">
                <h3>Total: ₱${total.toFixed(2)}</h3>
            </div>
            
            <div class="cart-actions">
                <button onclick="closeCartModal()" class="btn-secondary">Continue Shopping</button>
                <button onclick="proceedToCheckout()" class="btn-primary">Proceed to Checkout</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    addCartModalStyles();
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeCartModal();
    });
}

// Close cart modal
function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.remove();
}

// Update quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cafeCart', JSON.stringify(cart));
        updateCartDisplay();
        showCartModal(); // Refresh modal
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cafeCart', JSON.stringify(cart));
    updateCartDisplay();
    
    if (cart.length === 0) {
        closeCartModal();
    } else {
        showCartModal(); // Refresh modal
    }
}
// Proceed to checkout
function proceedToCheckout() {
    closeCartModal();
    showCheckoutModal();
}

// Show checkout modal
function showCheckoutModal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2>Checkout</h2>
                <button class="cart-modal-close" onclick="closeCheckoutModal()">&times;</button>
            </div>
            
            <form id="checkout-form" class="checkout-form">
                <h3 class="section-title">Customer Information</h3>
                
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" id="customer-name" required placeholder="Juan Dela Cruz">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" id="customer-phone" required placeholder="09XX XXX XXXX">
                    </div>
                    
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="customer-email" placeholder="your@email.com">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Delivery Address *</label>
                    <textarea id="customer-address" rows="3" required placeholder="Complete address including barangay, city, and province"></textarea>
                </div>
                
                  <h3 class="section-title">Payment Method</h3>
                
                <div class="payment-options">
                    <label class="payment-option">
                        <input type="radio" name="payment" value="cash" checked>
                        <span class="payment-label">
                            <strong>Cash on Delivery</strong>
                            <small>Pay when you receive your order</small>
                        </span>
                    </label>
                    
                    <label class="payment-option">
                        <input type="radio" name="payment" value="gcash">
                        <span class="payment-label">
                            <strong>GCash</strong>
                            <small>Pay via GCash before delivery</small>
                        </span>
                    </label>
                    
                    <label class="payment-option">
                        <input type="radio" name="payment" value="bank">
                        <span class="payment-label">
                            <strong>Bank Transfer</strong>
                            <small>Pay via bank transfer</small>
                        </span>
                    </label>
                </div>
                
                <!-- GCash Payment Details (Hidden by default) -->
                <div id="gcash-details" class="payment-details" style="display: none;">
                    <div class="form-group">
                        <label>GCash Number *</label>
                        <input type="tel" id="gcash-number" placeholder="09XX XXX XXXX" pattern="[0-9]{11}">
                        <small style="color: #999; font-size: 13px;">Enter your 11-digit GCash mobile number</small>
                    </div>
                    <div class="payment-info-box">
                        <strong>Send payment to:</strong>
                        <p>GCash Number: <strong>0917 123 4567</strong></p>
                        <p>Account Name: <strong>Jorge's Cafe</strong></p>
                        <small>Screenshot your payment confirmation for verification</small>
                    </div>
                </div>
                
                <!-- Bank Transfer Details (Hidden by default) -->
                <div id="bank-details" class="payment-details" style="display: none;">
                    <div class="form-group">
                        <label>Select Bank *</label>
                        <select id="bank-name">
                            <option value="">Choose your bank...</option>
                            <option value="BDO">BDO (Banco de Oro)</option>
                            <option value="BPI">BPI (Bank of the Philippine Islands)</option>
                            <option value="Metrobank">Metrobank</option>
                            <option value="UnionBank">UnionBank</option>
                            <option value="Landbank">Landbank</option>
                            <option value="PNB">PNB (Philippine National Bank)</option>
                            <option value="RCBC">RCBC</option>
                            <option value="Security Bank">Security Bank</option>
                            <option value="Chinabank">China Bank</option>
                            <option value="EastWest">EastWest Bank</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Account Number *</label>
                        <input type="text" id="bank-account" placeholder="Enter your account number">
                    </div>
                    
                    <div class="form-group">
                        <label>Account Name *</label>
                        <input type="text" id="bank-account-name" placeholder="Name as shown on bank account">
                    </div>
                    
                    <div class="payment-info-box">
                        <strong>Transfer payment to:</strong>
                        <p>Bank: <strong>BDO</strong></p>
                        <p>Account Number: <strong>1234 5678 9012</strong></p>
                        <p>Account Name: <strong>Jorge's Cafe Corporation</strong></p>
                        <small>Send proof of payment via SMS or email</small>
                    </div>
                </div>
                
                <h3 class="section-title">Courier Service</h3>
                
                <div class="courier-options">
                    <label class="courier-option">
                        <input type="radio" name="courier" value="standard" checked>
                        <span class="courier-label">
                            <strong>Standard Delivery</strong>
                            <small>Estimated 2-3 days | ₱50</small>
                        </span>
                    </label>
                    
                    <label class="courier-option">
                        <input type="radio" name="courier" value="express">
                        <span class="courier-label">
                            <strong>Express Delivery</strong>
                            <small>Same day delivery | ₱120</small>
                        </span>
                    </label>
                    
                    <label class="courier-option">
                        <input type="radio" name="courier" value="pickup">
                        <span class="courier-label">
                            <strong>Store Pickup</strong>
                            <small>Pick up at Jorge's Cafe | FREE</small>
                        </span>
                    </label>
                </div>
                
                <div class="form-group">
                    <label>Special Instructions</label>
                    <textarea id="order-notes" rows="2" placeholder="Any special requests or delivery instructions?"></textarea>
                </div>
                
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    <div class="summary-items">
                        ${cart.map(item => `
                            <div class="summary-item">
                                <span>${item.name} x${item.quantity}</span>
                                <span>₱${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="summary-item">
                        <span>Subtotal</span>
                        <span>₱${total.toFixed(2)}</span>
                    </div>
                    <div class="summary-item" id="delivery-fee-display">
                        <span>Delivery Fee</span>
                        <span>₱50.00</span>
                    </div>
                    <div class="summary-total">
                        <strong>Total</strong>
                        <strong id="final-total">₱${(total + 50).toFixed(2)}</strong>
                    </div>
                </div>
                
                <div class="cart-actions">
                    <button type="button" onclick="closeCheckoutModal()" class="btn-secondary">Back to Cart</button>
                    <button type="submit" class="btn-primary">Place Order</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add checkout styles
    addCheckoutStyles();
    
    // Update delivery fee dynamically
    setupCourierListener();
    
    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', handleOrderSubmission);
}

function setupCourierListener() {
    const courierOptions = document.querySelectorAll('input[name="courier"]');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    courierOptions.forEach(option => {
        option.addEventListener('change', function() {
            let deliveryFee = 0;
            let deliveryText = 'FREE';
            
            if (this.value === 'standard') {
                deliveryFee = 50;
                deliveryText = '₱50.00';
            } else if (this.value === 'express') {
                deliveryFee = 120;
                deliveryText = '₱120.00';
            } else if (this.value === 'pickup') {
                deliveryFee = 0;
                deliveryText = 'FREE';
            }
            
            document.getElementById('delivery-fee-display').querySelector('span:last-child').textContent = deliveryText;
            document.getElementById('final-total').textContent = '₱' + (total + deliveryFee).toFixed(2);
        });
    });
}
setupPaymentMethodListener();

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.remove();
}

// Handle order submission
function handleOrderSubmission(e) {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const courierValue = document.querySelector('input[name="courier"]:checked').value;
    let deliveryFee = courierValue === 'standard' ? 50 : courierValue === 'express' ? 120 : 0;
    
    // Collect payment details based on method
    let paymentDetails = {};
    
    if (paymentMethod === 'gcash') {
        paymentDetails = {
            method: 'GCash',
            gcashNumber: document.getElementById('gcash-number').value
        };
    } else if (paymentMethod === 'bank') {
        paymentDetails = {
            method: 'Bank Transfer',
            bankName: document.getElementById('bank-name').value,
            accountNumber: document.getElementById('bank-account').value,
            accountName: document.getElementById('bank-account-name').value
        };
    } else {
        paymentDetails = {
            method: 'Cash on Delivery'
        };
    }
    
    const order = {
        id: 'ORD-' + Date.now(),
        customerName: document.getElementById('customer-name').value,
        customerPhone: document.getElementById('customer-phone').value,
        customerEmail: document.getElementById('customer-email').value || 'N/A',
        address: document.getElementById('customer-address').value,
        paymentDetails: paymentDetails,  // Updated to include full payment details
        courier: courierValue,
        deliveryFee: deliveryFee,
        notes: document.getElementById('order-notes').value || 'None',
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + deliveryFee,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('cafeOrders') || '[]');
    orders.push(order);
    localStorage.setItem('cafeOrders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    localStorage.setItem('cafeCart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Close modal and show success
    closeCheckoutModal();
    showSuccessModal(order.id, paymentDetails, courierValue);
}

// Show success modal
function showSuccessModal(orderId, paymentDetails, courier) {
    let paymentText = paymentDetails.method;
    if (paymentDetails.method === 'GCash') {
        paymentText += ' (' + paymentDetails.gcashNumber + ')';
    } else if (paymentDetails.method === 'Bank Transfer') {
        paymentText += ' (' + paymentDetails.bankName + ')';
    }
    
    const courierText = courier === 'standard' ? 'Standard Delivery (2-3 days)' :
                       courier === 'express' ? 'Express Delivery (Same day)' :
                       'Store Pickup';
    
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content success-modal">
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 80px; color: #28a745; margin-bottom: 20px;">✓</div>
                <h2 style="color: #28a745; margin-bottom: 15px;">Order Placed Successfully!</h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <p style="font-size: 16px; color: #666; margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
                    <p style="font-size: 16px; color: #666; margin: 5px 0;"><strong>Payment:</strong> ${paymentText}</p>
                    <p style="font-size: 16px; color: #666; margin: 5px 0;"><strong>Delivery:</strong> ${courierText}</p>
                </div>
                ${paymentDetails.method !== 'Cash on Delivery' ? 
                    '<p style="color: #ff6b6b; margin-bottom: 10px; font-weight: 600;">⚠️ Please complete your payment to confirm your order</p>' : ''}
                <p style="color: #999; margin-bottom: 30px;">We'll contact you shortly to confirm your order.</p>
                <button onclick="location.reload()" class="btn-primary" style="width: auto; padding: 14px 40px;">Continue Shopping</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => modal.remove(), 10000);
}

function setupPaymentMethodListener() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const gcashDetails = document.getElementById('gcash-details');
    const bankDetails = document.getElementById('bank-details');
    const gcashNumber = document.getElementById('gcash-number');
    const bankName = document.getElementById('bank-name');
    const bankAccount = document.getElementById('bank-account');
    const bankAccountName = document.getElementById('bank-account-name');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Hide all payment details first
            gcashDetails.style.display = 'none';
            bankDetails.style.display = 'none';
            
            // Remove required attribute from all conditional fields
            gcashNumber.removeAttribute('required');
            bankName.removeAttribute('required');
            bankAccount.removeAttribute('required');
            bankAccountName.removeAttribute('required');
            
            // Show relevant payment details based on selection
            if (this.value === 'gcash') {
                gcashDetails.style.display = 'block';
                gcashNumber.setAttribute('required', 'required');
            } else if (this.value === 'bank') {
                bankDetails.style.display = 'block';
                bankName.setAttribute('required', 'required');
                bankAccount.setAttribute('required', 'required');
                bankAccountName.setAttribute('required', 'required');
            }
        });
    });
}

// Add cart modal styles
function addCartModalStyles() {
    if (document.getElementById('cart-modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'cart-modal-styles';
    styles.textContent = `
        .cart-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .cart-modal-content {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        .cart-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .cart-modal-header h2 {
            color: #d68a5c;
            margin: 0;
        }
        
        .cart-modal-close {
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 30px;
            height: 30px;
        }
        
        .cart-modal-close:hover {
            color: #333;
        }
        
        .cart-items {
            padding: 20px 25px;
        }
        
        .cart-item {
            display: grid;
            grid-template-columns: 1fr auto auto;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid #f0f0f0;
            align-items: center;
        }
        
        .cart-item:last-child {
            border-bottom: none;
        }
        
        .cart-item-info h4 {
            margin: 0 0 5px 0;
            color: #4a4a4a;
        }
        
        .cart-item-price {
            color: #999;
            margin: 0;
        }
        
        .cart-item-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        
        .qty-btn {
            background: #6b9cb0;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        
        .qty-btn:hover {
            background: #5a8c9f;
        }
        
        .qty-display {
            min-width: 30px;
            text-align: center;
            font-weight: bold;
        }
        
        .remove-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 13px;
        }
        
        .remove-btn:hover {
            background: #c82333;
        }
        
        .cart-item-total {
            font-weight: bold;
            color: #d68a5c;
            font-size: 18px;
        }
        
        .cart-total {
            padding: 20px 25px;
            border-top: 2px solid #f0f0f0;
            text-align: right;
        }
        
        .cart-total h3 {
            color: #d68a5c;
            margin: 0;
            font-size: 24px;
        }
        
        .cart-actions {
            padding: 0 25px 25px;
            display: flex;
            gap: 15px;
        }
        
        .btn-primary, .btn-secondary {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-primary {
            background: #d68a5c;
            color: white;
        }
        
        .btn-primary:hover {
            background: #c17a4d;
        }
        
        .btn-secondary {
            background: #f0f0f0;
            color: #4a4a4a;
        }
        
        .btn-secondary:hover {
            background: #e0e0e0;
        }
        
        @media (max-width: 768px) {
            .cart-item {
                grid-template-columns: 1fr;
                gap: 10px;
            }
            
            .cart-item-controls {
                justify-content: flex-start;
            }
            
            .cart-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(styles);
}

// Add checkout styles
function addCheckoutStyles() {
    if (document.getElementById('checkout-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'checkout-styles';
    styles.textContent = `
        .checkout-form {
            padding: 25px;
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .section-title {
            color: #d68a5c;
            margin: 25px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
            font-size: 18px;
        }
        
        .section-title:first-child {
            margin-top: 0;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4a4a4a;
            font-size: 14px;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 15px;
            transition: border-color 0.3s;
            font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            border-color: #6b9cb0;
            outline: none;
        }
        
        .payment-options,
        .courier-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .payment-option,
        .courier-option {
            display: flex;
            align-items: flex-start;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .payment-option:hover,
        .courier-option:hover {
            border-color: #6b9cb0;
            background: #f8f9fa;
        }
        
        .payment-option input[type="radio"],
        .courier-option input[type="radio"] {
            margin-top: 3px;
            margin-right: 12px;
            cursor: pointer;
            width: 18px;
            height: 18px;
        }
        
        .payment-option input[type="radio"]:checked ~ .payment-label,
        .courier-option input[type="radio"]:checked ~ .courier-label {
            color: #6b9cb0;
        }
        
        .payment-option:has(input:checked),
        .courier-option:has(input:checked) {
            border-color: #6b9cb0;
            background: #f0f7fa;
        }
        
        .payment-label,
        .courier-label {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .payment-label strong,
        .courier-label strong {
            color: #4a4a4a;
            font-size: 15px;
        }
        
        .payment-label small,
        .courier-label small {
            color: #999;
            font-size: 13px;
        }
        
        .order-summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .order-summary h3 {
            margin: 0 0 15px 0;
            color: #4a4a4a;
            font-size: 16px;
        }
        
        .summary-items {
            max-height: 150px;
            overflow-y: auto;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            color: #666;
            font-size: 14px;
        }
        
        .summary-total {
            display: flex;
            justify-content: space-between;
            padding: 15px 0 0 0;
            margin-top: 10px;
            border-top: 2px solid #ddd;
            font-size: 18px;
            color: #d68a5c;
        }
        
        .success-modal {
            animation: scaleIn 0.3s ease-out;
        }
        
        @keyframes scaleIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .checkout-form {
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(styles);
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
});

// Add animation styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
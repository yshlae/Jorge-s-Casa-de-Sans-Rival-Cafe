// Jorge's Cafe - Order Online JavaScript

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cafeCart') || '[]');

// Product Filter Function (for Order section)
function filterOrderProducts(type) {
    // Update active tab styling
    const tabs = document.querySelectorAll('.order-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().trim() === type) {
            tab.classList.add('active');
        }
    });
    
    // Filter products
    const allProducts = document.querySelectorAll('.product-card');
    
    allProducts.forEach(product => {
        if (type === 'coffee') {
            // Show coffee products (those WITHOUT food-product class)
            if (!product.classList.contains('food-product')) {
                product.style.display = 'flex';
                // Trigger animation
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                }, 10);
            } else {
                product.style.display = 'none';
                product.style.opacity = '0';
                product.style.transform = 'scale(0.95)';
            }
        } else if (type === 'food') {
            // Show food products (those WITH food-product class)
            if (product.classList.contains('food-product')) {
                product.style.display = 'flex';
                // Trigger animation
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                }, 10);
            } else {
                product.style.display = 'none';
                product.style.opacity = '0';
                product.style.transform = 'scale(0.95)';
            }
        }
    });
}

// Initialize on page load - show Coffee tab by default
document.addEventListener('DOMContentLoaded', function() {
    console.log('Order Online page loaded');
    // CHECK LOGIN STATUS ON PAGE LOAD
fetch("../api/check_session.php", { credentials: "same-origin" })
  .then(res => res.json())
  .then(data => {
      if (data.logged) {
          const login = document.getElementById("loginLink");
          const logout = document.getElementById("logoutLink");

          if (login) login.style.display = "none";
          if (logout) logout.style.display = "inline";
      }
  });

    updateCartDisplay();
    
    // Small delay to ensure all products are loaded
    setTimeout(() => {
        filterOrderProducts('coffee');
    }, 100);
});

// Add item to cart
function addToCart(itemName, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now().toString(),
            name: itemName,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cafeCart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
    
    // Show feedback
    showNotification(`${itemName} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('navCartCount');
    if (badge) {
        badge.textContent = cartCount;
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

// Mobile menu toggle
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
    fetch("../api/check_session.php")
      .then(res => res.json())
      .then(data => {
        if (!data.logged) {
            alert("Please login first.");
            window.location = "customer_login.php";
        } else {
            closeCartModal();
            showCheckoutModal();
        }
      });
}


// Show checkout modal
function showCheckoutModal() {
    fetch("../api/check_session.php", { credentials: "same-origin" })
  .then(res => res.json())
  .then(data => {
      if (data.user && document.getElementById("customer-email")) {
          document.getElementById("customer-email").value = data.user.email;
      }
  });
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
    // AUTO-FILL EMAIL IF LOGGED IN
fetch("../api/check_session.php", { credentials: "same-origin" })
  .then(res => res.json())
  .then(data => {
      console.log("SESSION RESULT:", data);

      if (data.logged === true && data.user) {

          console.log("EMAIL FOUND:", data.user.UserName);
          console.log("FULLNAME FOUND:", data.user.FullName);

          const emailField = document.getElementById("customer-email");
          const nameField  = document.getElementById("customer-name");

          if (emailField) {
              emailField.value = data.user.UserName || "";
          }

          if (nameField) {
              nameField.value = data.user.FullName || "";
          }
      }
  })
  .catch(err => console.error("SESSION ERROR:", err));

    // Add checkout styles
    addCheckoutStyles();
    
    // Setup payment method listener
    setupPaymentMethodListener();
    
    // Update delivery fee dynamically
    setupCourierListener();
    
    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', handleOrderSubmission);
}

// Setup courier listener
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

// Setup payment method listener
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
        paymentDetails: paymentDetails,
        courier: courierValue,
        deliveryFee: deliveryFee,
        notes: document.getElementById('order-notes').value || 'None',
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + deliveryFee,
        status: 'pending',
        createdAt: new Date().toISOString()
        
    };

    // SAVE ORDER FOR DASHBOARD
let orders = JSON.parse(localStorage.getItem('cafeOrders') || '[]');

orders.push({
    id: order.id,
    customer: order.customerName,
    items: cart.map(i => `${i.name} x${i.quantity}`).join(', '),
    total: order.subtotal + order.deliveryFee,
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
});

localStorage.setItem('cafeOrders', JSON.stringify(orders));

// CLEAR CART AFTER CHECKOUT
localStorage.removeItem('cafeCart');
cart = [];
updateCartDisplay();
// CONFIRMATION
submitOrder(order, paymentDetails, courierValue);
}

async function submitOrder(order, paymentDetails, courierValue) {

    const response = await fetch('../api/save_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    });

    const data = await response.json();

    if (data.success) {
        cart = [];
        localStorage.setItem('cafeCart', JSON.stringify(cart));
        updateCartDisplay();
        closeCheckoutModal();
        showSuccessModal(data.orderId, paymentDetails, courierValue);
    } else {
        alert("Order failed. Please try again.");
    }
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
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 15px;
            transition: border-color 0.3s;
            font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
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
        
        .payment-details {
            margin-top: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .payment-info-box {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            border-left: 4px solid #6b9cb0;
        }
        
        .payment-info-box strong {
            color: #4a4a4a;
            display: block;
            margin-bottom: 10px;
        }
        
        .payment-info-box p {
            margin: 5px 0;
            color: #666;
        }
        
        .payment-info-box small {
            color: #999;
            font-style: italic;
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
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
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
            if (navMenu) navMenu.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
        });
    });
});
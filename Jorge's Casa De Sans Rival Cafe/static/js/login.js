// Jorge's Cafe - Login System (Connected to Dashboard)
// Switch Tabs
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.form-section').forEach(form => form.classList.remove('active'));
    document.getElementById(`${tab}-form`).classList.add('active');

    hideMessage();
}

function showMessage(message, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = `message ${type} show`;
}

function hideMessage() {
    const messageEl = document.getElementById('message');
    messageEl.className = 'message';
}

function setLoading(show) {
    document.getElementById('loading').className = show ? 'loading show' : 'loading';
}

// LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // ✅ LOGIN HANDLER
    document.getElementById("loginBtn").addEventListener("click", async function () {

        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        if (!username || !password) {
            showMessage("Please enter username and password", "error");
            return;
        }

        const response = await fetch("../api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = "/jorgecafe/templates/dashboard.php";
        } else {
            showMessage(data.message, "error");
        }

    });
    
    // REGISTER FORM HANDLER
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideMessage();

        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;

        // Validation
        if (password !== confirm) {
            showMessage('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters', 'error');
            return;
        }

        if (username.length < 3) {
            showMessage('Username must be at least 3 characters', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        setLoading(true);

        // Simulate API delay
        setTimeout(async () => {
            // Get existing users
           const response = await fetch('../api/register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
});

const data = await response.json();
if (data.success) {
    showMessage('Registration successful!', 'success');
} else {
    showMessage(data.message, 'error');
}
            // Clear form
            registerForm.reset();

            // Switch to login tab after 2 seconds
            setTimeout(() => {
                switchTab('login');
            }, 2000);
        }, 800);
    });
});

// Make switchTab available globally
window.switchTab = switchTab;
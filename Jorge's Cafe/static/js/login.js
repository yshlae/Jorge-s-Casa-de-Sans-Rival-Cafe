const API_BASE_URL = 'http://localhost/jorges-cafe/api';

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
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    hideMessage();
    setLoading(true);

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = data.user.is_admin ? 'admin.php' : 'index.php';
            }, 1000);
        } else {
            showMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showMessage('Login failed. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
});

// REGISTER
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    hideMessage();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

    if (password !== confirm) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    setLoading(true);

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (data.success) {
            showMessage('Registration successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 1000);
        } else {
            showMessage(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showMessage('Registration failed. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
});

import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, role: 'customer' | 'admin') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simple mock validation
    if (isAdmin) {
      // Admin login: admin@jorgescafe.com / admin123
      if (email === 'admin@jorgescafe.com' && password === 'admin123') {
        onLogin(email, 'admin');
      } else {
        setError('Invalid admin credentials');
      }
    } else {
      // Customer login: any email with password length > 6
      if (password.length >= 6) {
        onLogin(email, 'customer');
      } else {
        setError('Password must be at least 6 characters');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4E9D7] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-[#D97D55] mb-2">Jorge's Cafe</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center">
            <input
              id="admin-login"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 text-[#D97D55] border-gray-300 rounded focus:ring-[#D97D55]"
            />
            <label htmlFor="admin-login" className="ml-2 text-gray-700">
              Sign in as Admin
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#D97D55] text-white py-3 rounded-lg hover:bg-[#c66d45] transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">Demo Credentials:</p>
          <p>Customer: any email + password (6+ chars)</p>
          <p>Admin: admin@jorgescafe.com / admin123</p>
        </div>
      </div>
    </div>
  );
}

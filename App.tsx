import { useState } from 'react';
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { About } from "./components/About";
import { Menu } from "./components/Menu";
import { Order } from "./components/Order";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

type View = 'website' | 'login' | 'dashboard';
type UserRole = 'customer' | 'admin' | null;

export default function App() {
  const [currentView, setCurrentView] = useState<View>('website');
  const [user, setUser] = useState<{ email: string; role: UserRole } | null>(null);

  const handleLogin = (email: string, role: 'customer' | 'admin') => {
    setUser({ email, role });
    if (role === 'admin') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('website');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('website');
  };

  const handleLoginRequired = () => {
    setCurrentView('login');
  };

  const handleBackToSite = () => {
    setCurrentView('website');
  };

  const handleGoToDashboard = () => {
    if (user?.role === 'admin') {
      setCurrentView('dashboard');
    }
  };

  // Show login page
  if (currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  // Show dashboard for admins
  if (currentView === 'dashboard' && user?.role === 'admin') {
    return (
      <Dashboard
        userEmail={user.email}
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Show main website
  return (
    <div className="min-h-screen">
      <Hero 
        isLoggedIn={!!user} 
        userEmail={user?.email || ''}
        userRole={user?.role || null}
        onLogin={() => setCurrentView('login')}
        onLogout={handleLogout}
        onGoToDashboard={handleGoToDashboard}
      />
      <Features />
      <About />
      <Menu />
      <Order 
        isLoggedIn={!!user}
        onLoginRequired={handleLoginRequired}
      />
      <Contact />
      <Footer />
    </div>
  );
}
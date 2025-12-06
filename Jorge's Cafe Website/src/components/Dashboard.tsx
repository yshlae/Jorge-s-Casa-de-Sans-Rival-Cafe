import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  BookOpen,
  History,
  Menu as MenuIcon,
  LogOut,
  User,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  ChevronDown,
} from 'lucide-react';
import { DashboardHome } from './DashboardHome';
import { DashboardInventory } from './DashboardInventory';
import { DashboardRecipes } from './DashboardRecipes';
import { DashboardSalesHistory } from './DashboardSalesHistory';
import { DashboardMainMenu } from './DashboardMainMenu';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
  onBackToSite: () => void;
}

type Page = 'dashboard' | 'inventory' | 'recipes' | 'sales' | 'menu';

export function Dashboard({ userEmail, onLogout, onBackToSite }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard' as Page, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inventory' as Page, icon: Package, label: 'Inventory' },
    { id: 'recipes' as Page, icon: BookOpen, label: 'Recipes' },
    { id: 'sales' as Page, icon: History, label: 'Sales History' },
    { id: 'menu' as Page, icon: MenuIcon, label: 'Main Menu' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'inventory':
        return <DashboardInventory />;
      case 'recipes':
        return <DashboardRecipes />;
      case 'sales':
        return <DashboardSalesHistory />;
      case 'menu':
        return <DashboardMainMenu />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {isSidebarOpen && (
                <h2 className="text-[#D97D55]">Jorge's Cafe Admin</h2>
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <MenuIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-[#D97D55] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Admin Account */}
          <div className="p-4 border-t border-gray-200">
            <div className={`${isSidebarOpen ? 'space-y-2' : ''}`}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-[#D97D55] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                {isSidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{userEmail}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                )}
              </div>
              <button
                onClick={onBackToSite}
                className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
                  !isSidebarOpen ? 'justify-center' : ''
                }`}
              >
                <MenuIcon className="w-5 h-5" />
                {isSidebarOpen && <span>Back to Site</span>}
              </button>
              <button
                onClick={onLogout}
                className={`w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
                  !isSidebarOpen ? 'justify-center' : ''
                }`}
              >
                <LogOut className="w-5 h-5" />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

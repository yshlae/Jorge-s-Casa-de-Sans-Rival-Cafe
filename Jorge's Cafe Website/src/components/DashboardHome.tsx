import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function DashboardHome() {
  // Mock data for sales analytics
  const salesData = [
    { month: 'Jan', sales: 4500, orders: 89 },
    { month: 'Feb', sales: 5200, orders: 102 },
    { month: 'Mar', sales: 4800, orders: 95 },
    { month: 'Apr', sales: 6100, orders: 118 },
    { month: 'May', sales: 7300, orders: 142 },
    { month: 'Jun', sales: 6800, orders: 131 },
  ];

  const productSales = [
    { name: 'Sans Rival Classic', value: 2840, color: '#D97D55' },
    { name: 'Silvanas', value: 2100, color: '#B8C4A9' },
    { name: 'Ensaymada', value: 1680, color: '#6FA4AF' },
    { name: 'Mixed Nuts', value: 1420, color: '#E8B4A0' },
    { name: 'Others', value: 960, color: '#D4D4D4' },
  ];

  const inventoryAlerts = [
    { item: 'Cashew Nuts', quantity: 12, unit: 'kg', status: 'low' },
    { item: 'Butter', quantity: 8, unit: 'kg', status: 'low' },
    { item: 'Flour', quantity: 25, unit: 'kg', status: 'medium' },
    { item: 'Sugar', quantity: 45, unit: 'kg', status: 'good' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Maria Santos', total: 850, status: 'completed', time: '2 hours ago' },
    { id: 'ORD-002', customer: 'Juan Dela Cruz', total: 1200, status: 'pending', time: '3 hours ago' },
    { id: 'ORD-003', customer: 'Ana Garcia', total: 650, status: 'completed', time: '5 hours ago' },
    { id: 'ORD-004', customer: 'Pedro Reyes', total: 920, status: 'preparing', time: '6 hours ago' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <ArrowUp className="w-4 h-4" />
              <span>12.5%</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
          <p className="text-2xl text-gray-900">₱35,680</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Sales Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#D97D55"
                strokeWidth={2}
                name="Sales (₱)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#6FA4AF"
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Sales Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Top Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productSales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {productSales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Inventory Tracking</h3>
          <div className="space-y-3">
            {inventoryAlerts.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-gray-900">{item.item}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} {item.unit} remaining
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    item.status === 'low'
                      ? 'bg-red-100 text-red-700'
                      : item.status === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {item.status === 'low'
                    ? 'Low Stock'
                    : item.status === 'medium'
                    ? 'Medium'
                    : 'In Stock'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                  <p className="text-xs text-gray-400">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">₱{order.total}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
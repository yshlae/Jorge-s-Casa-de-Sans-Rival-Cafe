import { useState } from 'react';
import { Search, Calendar, Download, Eye } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  customer: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'completed' | 'cancelled' | 'refunded';
  orderType: 'pickup' | 'dine-in';
}

export function DashboardSalesHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2025-12-06 14:30',
      customer: 'Maria Santos',
      items: [
        { name: 'Sans Rival Classic Cashew', quantity: 1, price: 650 },
        { name: 'Silvanas (Box of 12)', quantity: 1, price: 200 },
      ],
      total: 850,
      status: 'completed',
      orderType: 'pickup',
    },
    {
      id: 'ORD-002',
      date: '2025-12-06 13:15',
      customer: 'Juan Dela Cruz',
      items: [
        { name: 'Sans Rival Pistachio', quantity: 1, price: 700 },
        { name: 'Classic Ensaymada (Box of 6)', quantity: 1, price: 300 },
        { name: 'Mixed Nuts', quantity: 1, price: 200 },
      ],
      total: 1200,
      status: 'completed',
      orderType: 'dine-in',
    },
    {
      id: 'ORD-003',
      date: '2025-12-06 11:45',
      customer: 'Ana Garcia',
      items: [
        { name: 'Sans Rival Almond', quantity: 1, price: 650 },
      ],
      total: 650,
      status: 'completed',
      orderType: 'pickup',
    },
    {
      id: 'ORD-004',
      date: '2025-12-06 10:20',
      customer: 'Pedro Reyes',
      items: [
        { name: 'Sans Rival Chocolate Hazelnut', quantity: 1, price: 720 },
        { name: 'Caramel Bites', quantity: 1, price: 200 },
      ],
      total: 920,
      status: 'completed',
      orderType: 'pickup',
    },
    {
      id: 'ORD-005',
      date: '2025-12-05 16:40',
      customer: 'Lisa Tan',
      items: [
        { name: 'Silvanas (Box of 12)', quantity: 2, price: 200 },
      ],
      total: 400,
      status: 'cancelled',
      orderType: 'pickup',
    },
    {
      id: 'ORD-006',
      date: '2025-12-05 15:10',
      customer: 'Mark Johnson',
      items: [
        { name: 'Buttertoast', quantity: 2, price: 180 },
        { name: 'Classic Ensaymada (Box of 6)', quantity: 1, price: 300 },
      ],
      total: 660,
      status: 'completed',
      orderType: 'dine-in',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalSales = filteredOrders
    .filter((o) => o.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Sales History</h1>
        <p className="text-gray-600">View and manage past orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-1">Total Orders</p>
          <p className="text-2xl text-gray-900">{filteredOrders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-1">Completed</p>
          <p className="text-2xl text-green-600">
            {filteredOrders.filter((o) => o.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-1">Cancelled</p>
          <p className="text-2xl text-red-600">
            {filteredOrders.filter((o) => o.status === 'cancelled').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-1">Total Sales</p>
          <p className="text-2xl text-gray-900">₱{totalSales.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all ${
                selectedOrder?.id === order.id
                  ? 'ring-2 ring-[#D97D55]'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                  <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">₱{order.total}</p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{order.items.length} item(s)</span>
                <span className="text-gray-500 capitalize">{order.orderType}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow p-6 sticky top-8 h-fit">
          {selectedOrder ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-gray-900 mb-1">{selectedOrder.id}</h2>
                  <p className="text-gray-600">{selectedOrder.customer}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedOrder.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : selectedOrder.status === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-gray-900">₱{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₱{selectedOrder.total}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Order Type</span>
                  <span className="text-gray-900 capitalize">{selectedOrder.orderType}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-xl text-gray-900">₱{selectedOrder.total}</span>
                </div>
              </div>

              <button className="w-full bg-[#D97D55] text-white py-3 rounded-lg hover:bg-[#c66d45] transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

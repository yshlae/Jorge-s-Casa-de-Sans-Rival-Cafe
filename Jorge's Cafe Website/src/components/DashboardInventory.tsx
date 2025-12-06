import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  cost: number;
  supplier: string;
}

export function DashboardInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Cashew Nuts',
      category: 'ingredients',
      quantity: 12,
      unit: 'kg',
      minStock: 20,
      cost: 850,
      supplier: 'Premium Nuts Co.',
    },
    {
      id: '2',
      name: 'Butter',
      category: 'ingredients',
      quantity: 8,
      unit: 'kg',
      minStock: 15,
      cost: 450,
      supplier: 'Dairy Fresh',
    },
    {
      id: '3',
      name: 'All-Purpose Flour',
      category: 'ingredients',
      quantity: 25,
      unit: 'kg',
      minStock: 30,
      cost: 180,
      supplier: 'Grain Supplies Inc.',
    },
    {
      id: '4',
      name: 'White Sugar',
      category: 'ingredients',
      quantity: 45,
      unit: 'kg',
      minStock: 25,
      cost: 120,
      supplier: 'Sweet Supply',
    },
    {
      id: '5',
      name: 'Eggs',
      category: 'ingredients',
      quantity: 180,
      unit: 'pcs',
      minStock: 100,
      cost: 8,
      supplier: 'Farm Fresh',
    },
    {
      id: '6',
      name: 'Vanilla Extract',
      category: 'ingredients',
      quantity: 3,
      unit: 'bottles',
      minStock: 5,
      cost: 350,
      supplier: 'Flavor House',
    },
    {
      id: '7',
      name: 'Cake Boxes (Small)',
      category: 'packaging',
      quantity: 150,
      unit: 'pcs',
      minStock: 100,
      cost: 25,
      supplier: 'Pack Pro',
    },
    {
      id: '8',
      name: 'Cake Boxes (Large)',
      category: 'packaging',
      quantity: 85,
      unit: 'pcs',
      minStock: 50,
      cost: 35,
      supplier: 'Pack Pro',
    },
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'ingredients', label: 'Ingredients' },
    { value: 'packaging', label: 'Packaging' },
  ];

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isLowStock = (item: InventoryItem) => item.quantity <= item.minStock;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Track and manage your stock levels</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {inventory.filter(isLowStock).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-red-900">Low Stock Alert</p>
            <p className="text-sm text-red-700 mt-1">
              {inventory.filter(isLowStock).length} item(s) are running low on stock
            </p>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Min Stock
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Cost/Unit
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-900">{item.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-900">
                      {item.quantity} {item.unit}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-600">
                      {item.minStock} {item.unit}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-900">₱{item.cost}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-600 text-sm">{item.supplier}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isLowStock(item) ? (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Button */}
      <button className="fixed bottom-8 right-8 bg-[#D97D55] text-white p-4 rounded-full shadow-lg hover:bg-[#c66d45] transition-colors">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

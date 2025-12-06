import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
}

export function DashboardMainMenu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Sans Rival Classic Cashew',
      category: 'cakes',
      price: 650,
      description: 'Traditional Sans Rival with premium cashew nuts',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
      available: true,
    },
    {
      id: '2',
      name: 'Sans Rival Pistachio',
      category: 'cakes',
      price: 700,
      description: 'Sans Rival with imported pistachio',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
      available: true,
    },
    {
      id: '3',
      name: 'Sans Rival Almond',
      category: 'cakes',
      price: 650,
      description: 'Sans Rival with roasted almonds',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
      available: true,
    },
    {
      id: '4',
      name: 'Sans Rival Chocolate Hazelnut',
      category: 'cakes',
      price: 720,
      description: 'Rich chocolate Sans Rival with hazelnuts',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400',
      available: true,
    },
    {
      id: '5',
      name: 'Silvanas (Box of 12)',
      category: 'pastries',
      price: 200,
      description: 'Classic frozen cookie sandwiches',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
      available: true,
    },
    {
      id: '6',
      name: 'Mixed Nuts',
      category: 'snacks',
      price: 200,
      description: 'Premium mixed nuts selection',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
      available: true,
    },
    {
      id: '7',
      name: 'Caramel Bites',
      category: 'snacks',
      price: 200,
      description: 'Sweet caramel treats',
      image: 'https://images.unsplash.com/photo-1581798459219-c0f6b53b514c?w=400',
      available: true,
    },
    {
      id: '8',
      name: 'Classic Ensaymada (Box of 6)',
      category: 'breads',
      price: 300,
      description: 'Traditional Filipino sweet bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      available: true,
    },
    {
      id: '9',
      name: 'Buttertoast',
      category: 'breads',
      price: 180,
      description: 'Crispy butter toast',
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
      available: true,
    },
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'cakes', label: 'Cakes' },
    { value: 'pastries', label: 'Pastries' },
    { value: 'breads', label: 'Breads' },
    { value: 'snacks', label: 'Snacks' },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAvailability = (id: string) => {
    setMenuItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Main Menu Management</h1>
        <p className="text-gray-600">Manage your menu items and availability</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu items..."
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

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="p-2 bg-white rounded-lg shadow hover:bg-gray-50">
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow hover:bg-gray-50">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                </div>
                <p className="text-lg text-[#D97D55]">₱{item.price}</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Availability</span>
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    item.available ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      item.available ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button className="fixed bottom-8 right-8 bg-[#D97D55] text-white p-4 rounded-full shadow-lg hover:bg-[#c66d45] transition-colors">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, ChefHat } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  category: string;
  prepTime: number;
  servings: number;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  cost: number;
}

export function DashboardRecipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Sans Rival Classic Cashew',
      category: 'cakes',
      prepTime: 120,
      servings: 8,
      cost: 450,
      ingredients: [
        { name: 'Cashew Nuts (chopped)', quantity: '2 cups' },
        { name: 'Egg Whites', quantity: '12 pcs' },
        { name: 'White Sugar', quantity: '2 cups' },
        { name: 'Butter (softened)', quantity: '1 cup' },
        { name: 'Powdered Sugar', quantity: '1 cup' },
        { name: 'Egg Yolks', quantity: '6 pcs' },
        { name: 'Vanilla Extract', quantity: '2 tsp' },
      ],
      instructions: [
        'Preheat oven to 350°F (175°C). Line baking sheets with parchment paper.',
        'Beat egg whites until soft peaks form. Gradually add sugar while beating until stiff peaks form.',
        'Fold in chopped cashews gently.',
        'Spread meringue mixture into thin layers on prepared baking sheets.',
        'Bake for 20-25 minutes until golden brown. Let cool completely.',
        'For buttercream: Beat butter until creamy. Add powdered sugar, egg yolks, and vanilla.',
        'Layer meringue wafers with buttercream. Refrigerate for at least 4 hours before serving.',
        'Sprinkle with crushed cashews on top.',
      ],
    },
    {
      id: '2',
      name: 'Classic Silvanas',
      category: 'pastries',
      prepTime: 90,
      servings: 24,
      cost: 280,
      ingredients: [
        { name: 'Cashew Nuts (finely chopped)', quantity: '1.5 cups' },
        { name: 'Egg Whites', quantity: '6 pcs' },
        { name: 'White Sugar', quantity: '3/4 cup' },
        { name: 'Butter', quantity: '1/2 cup' },
        { name: 'Powdered Sugar', quantity: '1/2 cup' },
        { name: 'Egg Yolks', quantity: '3 pcs' },
        { name: 'Vanilla Extract', quantity: '1 tsp' },
      ],
      instructions: [
        'Preheat oven to 300°F (150°C). Line baking sheets with parchment.',
        'Beat egg whites until soft peaks form. Gradually add sugar.',
        'Fold in chopped cashews.',
        'Pipe or spoon mixture into small rectangles on baking sheets.',
        'Bake for 30 minutes until lightly golden. Cool completely.',
        'Make buttercream: Beat butter, add powdered sugar, egg yolks, and vanilla.',
        'Sandwich two meringue wafers with buttercream.',
        'Roll edges in more chopped cashews. Freeze for 30 minutes before serving.',
      ],
    },
    {
      id: '3',
      name: 'Classic Ensaymada',
      category: 'breads',
      prepTime: 180,
      servings: 12,
      cost: 220,
      ingredients: [
        { name: 'All-Purpose Flour', quantity: '4 cups' },
        { name: 'Active Dry Yeast', quantity: '2 tbsp' },
        { name: 'White Sugar', quantity: '1/2 cup' },
        { name: 'Salt', quantity: '1 tsp' },
        { name: 'Eggs', quantity: '3 pcs' },
        { name: 'Milk (warm)', quantity: '1 cup' },
        { name: 'Butter (softened)', quantity: '1 cup' },
        { name: 'Grated Cheese', quantity: '2 cups' },
      ],
      instructions: [
        'Dissolve yeast in warm milk with 1 tsp sugar. Let stand 10 minutes.',
        'Mix flour, remaining sugar, and salt in large bowl.',
        'Add eggs and yeast mixture. Knead until smooth, about 10 minutes.',
        'Add butter gradually while kneading until fully incorporated.',
        'Let dough rise in covered bowl for 1-2 hours until doubled.',
        'Divide into portions and roll into ropes. Coil into spiral shapes.',
        'Place on greased baking sheets. Let rise 30-45 minutes.',
        'Bake at 350°F for 15-20 minutes until golden.',
        'Brush with butter and top with sugar and grated cheese while warm.',
      ],
    },
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Recipe Management</h1>
        <p className="text-gray-600">View and manage your cafe recipes</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97D55]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recipe List */}
        <div className="space-y-4">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all ${
                selectedRecipe?.id === recipe.id
                  ? 'ring-2 ring-[#D97D55]'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D97D55] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-[#D97D55]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{recipe.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{recipe.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Prep Time</p>
                  <p className="text-gray-900">{recipe.prepTime} min</p>
                </div>
                <div>
                  <p className="text-gray-500">Servings</p>
                  <p className="text-gray-900">{recipe.servings}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cost</p>
                  <p className="text-gray-900">₱{recipe.cost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Details */}
        <div className="bg-white rounded-lg shadow p-6 sticky top-8 h-fit">
          {selectedRecipe ? (
            <div>
              <h2 className="text-gray-900 mb-4">{selectedRecipe.name}</h2>

              <div className="mb-6">
                <h3 className="text-gray-900 mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-[#D97D55] rounded-full"></span>
                      <span>
                        {ingredient.quantity} - {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#D97D55] text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Prep Time</p>
                    <p className="text-gray-900">{selectedRecipe.prepTime} min</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Servings</p>
                    <p className="text-gray-900">{selectedRecipe.servings}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Cost</p>
                    <p className="text-gray-900">₱{selectedRecipe.cost}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a recipe to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Button */}
      <button className="fixed bottom-8 right-8 bg-[#D97D55] text-white p-4 rounded-full shadow-lg hover:bg-[#c66d45] transition-colors">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

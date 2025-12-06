import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ShoppingCart, Plus, Minus, Trash2, Coffee, LogIn } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { OrderCheckout } from "./OrderCheckout";
import mixedNutsImg from 'figma:asset/667faa2759baa14541b285312072698c37280839.png';
import sansRivalImg from 'figma:asset/300dbf31a3e246cdba8ac95629593dc35aba2941.png';
import silvanasImg from 'figma:asset/b97fd8903f3235a0f61844fd90901b2319a428c0.png';
import sansRivalRoundImg from 'figma:asset/d02494cdfb7b99826ad5392b9128acea8c09687b.png';
import sansRivalSliceImg from 'figma:asset/5dd6fac76a1a8278ff8ed91892033f736be91259.png';
import sansRivalPistachioImg from 'figma:asset/dac2d68f29e2acdf2d0ac92b44db5001cc5fac82.png';
import almondSansRivalMiniImg from 'figma:asset/ed2ecc9011be4b4861de2bc45803a366384816af.png';
import almondSansRivalRoundImg from 'figma:asset/6d0c24d84111e8cd3439e6af166bb7117c22846f.png';
import chocoHazelnutSansRivalImg from 'figma:asset/5ce6033d9abc5286ef99b8b7cddec0f142bc818e.png';
import caramelBitesImg from 'figma:asset/7f95bedb8e57a566246a39c1de7bd8eb1859fce0.png';
import ensaymadaButtertoastImg from 'figma:asset/7243b387855c2d53a5a63518070b2f13b73a1c58.png';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "food";
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Espresso",
    description: "Rich and bold single shot",
    price: 120,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400"
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: 150,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400"
  },
  {
    id: "3",
    name: "Latte",
    description: "Smooth espresso with steamed milk",
    price: 160,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400"
  },
  {
    id: "4",
    name: "Americano",
    description: "Espresso with hot water",
    price: 130,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400"
  },
  {
    id: "5",
    name: "Mocha",
    description: "Espresso, chocolate, and steamed milk",
    price: 175,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=400"
  },
  {
    id: "6",
    name: "Cold Brew",
    description: "Smooth, cold-steeped coffee",
    price: 145,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400"
  },
  {
    id: "7",
    name: "Classic Cashew Sans Rival (Mini)",
    description: "Classic layered cashew meringue cake",
    price: 95,
    category: "food",
    image: sansRivalImg
  },
  {
    id: "8",
    name: "Classic Cashew Sans Rival (Solo)",
    description: "Individual serving of classic sans rival",
    price: 230,
    category: "food",
    image: sansRivalSliceImg
  },
  {
    id: "9",
    name: "Classic Cashew Sans Rival (8\" Round)",
    description: "Full-sized round cashew sans rival cake",
    price: 840,
    category: "food",
    image: sansRivalRoundImg
  },
  {
    id: "10",
    name: "Pistachio Sans Rival (Solo)",
    description: "Luxurious pistachio meringue layers",
    price: 270,
    category: "food",
    image: sansRivalPistachioImg
  },
  {
    id: "11",
    name: "Silvanas (Box of 10)",
    description: "Frozen buttercream cookie sandwiches",
    price: 380,
    category: "food",
    image: silvanasImg
  },
  {
    id: "12",
    name: "Mixed Nuts (200g)",
    description: "Premium mixed nuts",
    price: 200,
    category: "food",
    image: mixedNutsImg
  },
  {
    id: "13",
    name: "Classic Ensaymada",
    description: "Filipino brioche with butter and sugar",
    price: 55,
    category: "food",
    image: ensaymadaButtertoastImg
  },
  {
    id: "14",
    name: "Original Caramel Bites (200g)",
    description: "Sweet and chewy caramel treats",
    price: 105,
    category: "food",
    image: caramelBitesImg
  },
  {
    id: "15",
    name: "Buttertoast",
    description: "Crispy toasted bread with butter",
    price: 65,
    category: "food",
    image: ensaymadaButtertoastImg
  },
  {
    id: "16",
    name: "Almond Sans Rival (Mini)",
    description: "Almond meringue layers",
    price: 100,
    category: "food",
    image: almondSansRivalMiniImg
  },
  {
    id: "17",
    name: "Almond Sans Rival (8\" Round)",
    description: "Full-sized round almond sans rival cake",
    price: 900,
    category: "food",
    image: almondSansRivalRoundImg
  },
  {
    id: "18",
    name: "Chocolate Hazelnut Sans Rival (Solo)",
    description: "Chocolate and hazelnut meringue layers",
    price: 300,
    category: "food",
    image: chocoHazelnutSansRivalImg
  },
];

interface OrderProps {
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

export function Order({ isLoggedIn, onLoginRequired }: OrderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const addToCart = (item: MenuItem) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
    setIsCartOpen(false);
  };

  const handleOrderComplete = () => {
    setCart([]);
    setShowCheckout(false);
  };

  if (showCheckout) {
    return <OrderCheckout cart={cart} onBack={() => setShowCheckout(false)} onComplete={handleOrderComplete} />;
  }

  return (
    <section className="py-20 px-4 bg-muted min-h-screen">
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D97D55] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-[#D97D55]" />
              </div>
              <h2 className="text-gray-900 mb-2">Login Required</h2>
              <p className="text-gray-600 mb-6">
                Please sign in to add items to your cart and place orders.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowLoginPrompt(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#D97D55] hover:bg-[#c66d45]"
                  onClick={() => {
                    setShowLoginPrompt(false);
                    onLoginRequired();
                  }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="mb-2 text-primary">Order Online</h1>
            <p className="text-muted-foreground">Pick your favorites and we'll have them ready for you</p>
          </div>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button size="lg" className="relative bg-accent hover:bg-accent/90">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary h-6 w-6 rounded-full p-0 flex items-center justify-center">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cartItemCount === 0 ? "Your cart is empty" : `${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} in cart`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="mb-1">{item.name}</h4>
                          <p className="text-muted-foreground">₱{item.price.toFixed(2)} each</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-primary">₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span>Total</span>
                    <span className="text-primary">₱{cartTotal.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <Tabs defaultValue="coffee" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="coffee">Coffee</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>
          
          <TabsContent value="coffee">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.filter(item => item.category === "coffee").map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={typeof item.image === 'string' ? item.image : item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-accent text-white">
                        ₱{item.price.toFixed(2)}
                      </Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="food">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.filter(item => item.category === "food").map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={typeof item.image === 'string' ? item.image : item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-secondary">
                        ₱{item.price.toFixed(2)}
                      </Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
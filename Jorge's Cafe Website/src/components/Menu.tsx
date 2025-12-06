import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import menuImage1 from 'figma:asset/73c9f06cc196b40fbea836ffaf08eb9a852ebb5a.png';
import menuImage2 from 'figma:asset/57725dbd81fddebe04fc5368927068a41a01f1cd.png';
import { useState } from "react";

const coffeeItems = [
  { name: "Americano", price: "₱80", description: "Classic espresso with hot water" },
  { name: "Cafe Latte", price: "₱130", description: "Smooth espresso with steamed milk" },
  { name: "Spanish Latte", price: "₱140", description: "Sweet and creamy Spanish-style latte" },
  { name: "Mocha Latte", price: "₱150", description: "Espresso, chocolate, and steamed milk" },
  { name: "Caramel Machiatto", price: "₱150", description: "Espresso with vanilla and caramel" },
  { name: "Salted Caramel Machiatto", price: "₱150", description: "Sweet and salty perfection" },
  { name: "Matcha Latte", price: "₱140", description: "Premium matcha with steamed milk" },
];

const seaSaltSeries = [
  { name: "Sea Salt Latte", price: "₱170", description: "Creamy latte with sea salt foam" },
  { name: "Spanish Sea Salt Latte", price: "₱170", description: "Spanish latte with sea salt twist" },
  { name: "Matcha Sea Salt Latte", price: "₱170", description: "Matcha topped with sea salt cream" },
  { name: "Biscoff Sea Salt Latte", price: "₱190", description: "Biscoff cookie latte with sea salt" },
];

const frappes = [
  { name: "Caramel Machiatto Frappe", price: "₱180", description: "Iced blended caramel coffee" },
  { name: "Salted Caramel Machiatto Frappe", price: "₱180", description: "Iced salted caramel delight" },
  { name: "Java Chip Frappe", price: "₱185", description: "Coffee with chocolate chips" },
  { name: "Dark Cookies & Cream Frappe", price: "₱185", description: "Oreo-inspired coffee frappe" },
  { name: "Mocha Frappe", price: "₱180", description: "Iced blended chocolate coffee" },
  { name: "Chocolate Frappe", price: "₱170", description: "Rich chocolate blended drink" },
  { name: "Strawberry Cream Frappe", price: "₱170", description: "Sweet strawberry frappe" },
  { name: "Matcha Frappe", price: "₱180", description: "Iced blended matcha" },
];

const specialtyDrinks = [
  { name: "Chocolate Ice Shaken", price: "₱130", description: "Shaken chocolate beverage" },
  { name: "Strawberry Ice Shaken", price: "₱130", description: "Refreshing strawberry drink" },
  { name: "UBE Ice Shaken", price: "₱130", description: "Filipino purple yam drink" },
  { name: "Biscoff Latte", price: "₱170", description: "Cookie butter latte" },
  { name: "Strawberry Matcha", price: "₱170", description: "Strawberry and matcha fusion" },
  { name: "House Blend Iced Tea", price: "₱80", description: "Refreshing house tea" },
  { name: "Hot Chocolate", price: "₱120", description: "Rich and creamy hot chocolate" },
];

const sansRivalCakes = [
  { name: "Classic Cashew Sans Rival", price: "Mini ₱95 | Solo ₱230", description: "7\" Square ₱500 | 8\" Round ₱840" },
  { name: "Almond Sans Rival", price: "Mini ₱105 | Solo ₱240", description: "7\" Square ₱520 | 8\" Round ₱860" },
  { name: "Mocha Walnut Sans Rival", price: "Mini ₱105 | Solo ₱240", description: "7\" Square ₱520 | 8\" Round ₱860" },
  { name: "Pistachio Sans Rival", price: "Mini ₱125 | Solo ₱270", description: "7\" Square ₱595 | 8\" Round ₱1,020" },
  { name: "Choco Hazelnut Sans Rival", price: "Mini ₱135 | Solo ₱295", description: "7\" Square ₱650 | 8\" Round ₱1,050" },
  { name: "Matcha Pistachio Sans Rival", price: "Mini ₱125 | Solo ₱270", description: "7\" Square ₱595 | 8\" Round ₱1,020" },
];

const bakeryItems = [
  { name: "Classic Ensaymada", price: "₱55/pc | ₱300/box of 6", description: "Filipino brioche with butter and sugar" },
  { name: "Cheeserolls", price: "₱45/pc | ₱260/box of 6", description: "Soft rolls with creamy cheese" },
  { name: "Silvanas (Assorted)", price: "₱380/box of 10 | ₱760/box of 20", description: "Frozen buttercream cookie sandwiches" },
  { name: "Original Caramel Bites", price: "₱105 (200g) | ₱200 (400g)", description: "Sweet and chewy caramel treats" },
  { name: "Salted Caramel Bites", price: "₱105 (200g) | ₱200 (400g)", description: "Salted caramel perfection" },
  { name: "Mixed Nuts", price: "₱200 (200g)", description: "Premium mixed nuts" },
  { name: "Lengua de Gato", price: "₱105", description: "Crispy cat tongue cookies" },
  { name: "Butter Toast & Broas", price: "₱105", description: "Crunchy butter toast" },
  { name: "Creme Leche Flan", price: "₱150/pc | ₱250 family", description: "Filipino caramel custard" },
  { name: "Banana Bread", price: "₱160", description: "Moist homemade banana bread" },
  { name: "Tea Cookies", price: "₱105 small | ₱180 big", description: "Buttery tea biscuits" },
];

const breakfastItems = [
  { name: "Tapa", price: "₱170", description: "Filipino beef tapa with rice and egg" },
  { name: "Tocino", price: "₱170", description: "Sweet cured pork with rice and egg" },
  { name: "Longanisa", price: "₱150", description: "Filipino sausage with rice and egg" },
  { name: "Hungarian", price: "₱210", description: "Hungarian sausage with rice and egg" },
];

const pastaItems = [
  { name: "Chicken Pesto", price: "₱270", description: "Creamy basil pesto with chicken" },
  { name: "Creamy Truffle Pasta", price: "₱270", description: "Luxurious truffle cream pasta" },
  { name: "Shrimp Marinara", price: "₱290", description: "Tomato-based sauce with shrimp" },
  { name: "Lasagna", price: "₱290", description: "Layered pasta with meat and cheese" },
];

const dessertItems = [
  { name: "Classic Tiramisu", price: "₱190", description: "Italian coffee-flavored dessert" },
  { name: "Pistachio Tiramisu", price: "₱230", description: "Tiramisu with pistachio twist" },
  { name: "Biscoff Banoffee Pie", price: "₱210", description: "Banana toffee pie with biscoff" },
  { name: "Brownies", price: "₱45", description: "Rich chocolate brownies" },
  { name: "Revel Bar", price: "₱45", description: "Filipino chocolate oatmeal bar" },
];

export function Menu() {
  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-primary">Our Menu</h2>
          <p>Crafted with care, served with love</p>
        </div>

        <Tabs defaultValue="coffee" className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="coffee">Coffee</TabsTrigger>
            <TabsTrigger value="cakes">Cakes</TabsTrigger>
            <TabsTrigger value="bakery">Bakery</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="coffee" className="space-y-8">
            <div>
              <h3 className="mb-4 text-primary">Coffee</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coffeeItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-primary">Sea Salt Series</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seaSaltSeries.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-primary">Frappes</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {frappes.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-primary">Specialty Drinks</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialtyDrinks.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-8 relative h-[400px] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
                  <img
                    src={menuImage2}
                    alt="Jorge's Cafe Menu - Coffee"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full h-[90vh]">
                <img
                  src={menuImage2}
                  alt="Jorge's Cafe Menu - Coffee"
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="cakes" className="space-y-8">
            <div>
              <h3 className="mb-4 text-primary">Sans Rival Cakes</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sansRivalCakes.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <div className="text-primary mt-2">{item.price}</div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-8 relative h-[400px] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
                  <img
                    src={menuImage1}
                    alt="Jorge's Cafe Menu - Sans Rival Cakes"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full h-[90vh]">
                <img
                  src={menuImage1}
                  alt="Jorge's Cafe Menu - Sans Rival Cakes"
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="bakery" className="space-y-8">
            <div>
              <h3 className="mb-4 text-primary">Bakery Corner</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bakeryItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-8 relative h-[400px] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
                  <img
                    src={menuImage1}
                    alt="Jorge's Cafe Menu - Bakery"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full h-[90vh]">
                <img
                  src={menuImage1}
                  alt="Jorge's Cafe Menu - Bakery"
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="meals" className="space-y-8">
            <div>
              <h3 className="mb-4 text-primary">All Day Breakfast</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breakfastItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-primary">Pasta</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastaItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-8 relative h-[400px] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
                  <img
                    src={menuImage2}
                    alt="Jorge's Cafe Menu - Meals"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full h-[90vh]">
                <img
                  src={menuImage2}
                  alt="Jorge's Cafe Menu - Meals"
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="desserts" className="space-y-8">
            <div>
              <h3 className="mb-4 text-primary">Desserts</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dessertItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <span className="text-primary">{item.price}</span>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-8 relative h-[400px] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
                  <img
                    src={menuImage2}
                    alt="Jorge's Cafe Menu - Desserts"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full h-[90vh]">
                <img
                  src={menuImage2}
                  alt="Jorge's Cafe Menu - Desserts"
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, Check } from "lucide-react";
import { CartItem } from "./Order";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface OrderCheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export function OrderCheckout({ cart, onBack, onComplete }: OrderCheckoutProps) {
  const [orderType, setOrderType] = useState<"pickup" | "dinein">("pickup");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate random order number
    const newOrderNumber = `JC${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(newOrderNumber);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onComplete();
  };

  return (
    <div className="py-20 px-4 bg-muted min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        <h1 className="mb-8 text-primary">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={orderType} onValueChange={(value: string) => setOrderType(value as "pickup" | "dinein")}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent/10">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div>
                        <p>Pickup</p>
                        <p className="text-muted-foreground">Ready in 10-15 minutes</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent/10">
                    <RadioGroupItem value="dinein" id="dinein" />
                    <Label htmlFor="dinein" className="flex-1 cursor-pointer">
                      <div>
                        <p>Dine In</p>
                        <p className="text-muted-foreground">Enjoy at our cafe</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="(555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requests or dietary restrictions?"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>₱{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">₱{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  size="lg"
                  onClick={handleSubmitOrder}
                  disabled={!name || !phone}
                >
                  Place Order
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Payment at pickup or counter
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={handleConfirmationClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Check className="w-12 h-12 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Order Confirmed!</DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <div className="text-lg">
                <p className="text-foreground">Order #{orderNumber}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p><span>Name:</span> {name}</p>
                <p><span>Phone:</span> {phone}</p>
                <p><span>Type:</span> {orderType === "pickup" ? "Pickup" : "Dine In"}</p>
                {orderType === "pickup" && (
                  <p className="text-primary">Ready in 10-15 minutes</p>
                )}
              </div>
              <p>
                We'll send you a text when your order is ready. Thank you for choosing Jorge's Cafe!
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleConfirmationClose} className="bg-primary hover:bg-primary/90">
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { Coffee, Croissant, Heart, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: Coffee,
    title: "Artisanal Coffee",
    description: "Expertly crafted beverages using premium beans from around the world",
    color: "bg-accent"
  },
  {
    icon: Croissant,
    title: "Fresh Pastries",
    description: "Baked daily with the finest ingredients for the perfect pairing",
    color: "bg-primary"
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every order is prepared with care and attention to detail",
    color: "bg-secondary"
  },
  {
    icon: Clock,
    title: "Always Fresh",
    description: "Open early to late, serving quality throughout the day",
    color: "bg-accent"
  }
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-accent/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-primary">Why Choose Jorge's</h2>
          <p className="text-lg">Quality, passion, and community in every cup</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-accent">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`${feature.color} p-4 rounded-full`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

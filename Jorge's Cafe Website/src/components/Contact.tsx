import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function Contact() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-primary">Visit Us</h2>
          <p>We'd love to see you!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Jorge's Cafe Casa de Sans Rival</p>
              <p>Jose P Laurel National Highway</p>
              <p>Brgy. Alangilan Batangas City</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-8 h-8 mb-2 text-secondary" />
              <CardTitle>Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sunday - Thursday</p>
              <p>8:00 AM - 9:00 PM</p>
              <p className="mt-2">Friday - Saturday</p>
              <p>8:00 AM - 12:00 MN</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="w-8 h-8 mb-2 text-accent" />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p>(0927) 452 1168</p>
              <p className="mt-2">Call us for</p>
              <p>catering inquiries</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p>hello@jorgescafe.com</p>
              <p className="mt-2">We'll get back to you</p>
              <p>within 24 hours</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
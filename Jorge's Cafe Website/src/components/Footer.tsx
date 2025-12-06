import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from 'figma:asset/54a245a40a00312bdeda65ad54763a27dcf53e44.png';

export function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Jorge's Cafe Logo" className="h-12 w-auto" />
            </div>
            <p className="text-slate-300">
              Batangas City’s newest cozy spot — serving freshly brewed coffee and irresistible baked goods.
            </p>
          </div>

          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-primary transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Catering</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/jorgescafe.batangas/" className="text-slate-300 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61578234672450" className="text-slate-300 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-300">
          <p>&copy; 2025 Jorge's Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
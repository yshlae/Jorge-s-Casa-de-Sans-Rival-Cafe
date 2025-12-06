import { Button } from "./ui/button";
import { LogIn, LogOut, User, LayoutDashboard } from "lucide-react";
import logo from 'figma:asset/54a245a40a00312bdeda65ad54763a27dcf53e44.png';
import heroBackground from 'figma:asset/d0c5904e201c42fd283d718d4f73fd1fa74bc899.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  isLoggedIn: boolean;
  userEmail: string;
  userRole: 'customer' | 'admin' | null;
  onLogin: () => void;
  onLogout: () => void;
  onGoToDashboard: () => void;
}

export function Hero({ isLoggedIn, userEmail, userRole, onLogin, onLogout, onGoToDashboard }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Auth Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        {isLoggedIn ? (
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D97D55] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-gray-900 text-sm block">{userEmail}</span>
                {userRole === 'admin' && (
                  <span className="text-xs text-gray-500">Administrator</span>
                )}
              </div>
            </div>
            {userRole === 'admin' && (
              <Button
                size="sm"
                variant="outline"
                onClick={onGoToDashboard}
                className="border-[#D97D55] text-[#D97D55] hover:bg-[#D97D55] hover:text-white"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={onLogout}
              className="border-[#D97D55] text-[#D97D55] hover:bg-[#D97D55] hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            onClick={onLogin}
            className="bg-white text-[#D97D55] hover:bg-white/90 shadow-lg"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>

      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Jorge's Cafe interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#D97D55]/60" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Jorge's Cafe Logo" className="h-32 w-auto" />
        </div>
        <p className="mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of artisanal coffee, fresh pastries, and warm hospitality. 
          Your neighborhood cafe where every cup tells a story.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View Menu
          </Button>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
            Visit Us
          </Button>
        </div>
      </div>
    </section>
  );
}

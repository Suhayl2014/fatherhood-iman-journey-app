import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, Baby, Heart, BookMarked, Users } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Heart },
    { name: 'Lessons', href: '/lessons', icon: BookOpen },
    { name: 'Milestones', href: '/milestones', icon: Baby },
    { name: 'Duas', href: '/duas', icon: BookMarked },
    { name: 'Journal', href: '/journal', icon: BookMarked },
    { name: 'Community', href: '/community', icon: Users }
  ];
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container-app px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-1 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-islamic-green flex items-center justify-center">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-islamic-cream" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-islamic-green">Iman Journey</h1>
                <p className="text-xs text-islamic-teal">For Muslim Fathers</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 nav-link py-2 ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

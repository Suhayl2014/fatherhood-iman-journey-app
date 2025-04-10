import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, BookOpen, Baby, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const location = useLocation();
  
  // Don't show mobile nav on landing page
  if (location.pathname === '/') {
    return null;
  }
  
  const navItems = [
    { icon: Heart, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Lessons', path: '/lessons' },
    { icon: Baby, label: 'Milestones', path: '/milestones' },
    { icon: Users, label: 'Community', path: '/community' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-islamic-green" : "text-gray-500"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav; 
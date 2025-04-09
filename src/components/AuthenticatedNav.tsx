import { Link } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Heart, BookOpen, Baby, ScrollText, Users, PenTool } from 'lucide-react';

const AuthenticatedNav = () => {
  const { signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container-app">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-islamic-green flex items-center justify-center">
                <Heart className="h-5 w-5 text-islamic-cream" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-islamic-green">Iman Journey</h1>
                <p className="text-xs text-islamic-teal">For Muslim Fathers</p>
              </div>
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/lessons" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal">
                  <BookOpen className="h-4 w-4" />
                  Lessons
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/milestones" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal">
                  <Baby className="h-4 w-4" />
                  Milestones
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/duas" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal">
                  <ScrollText className="h-4 w-4" />
                  Duas
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/journal" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal">
                  <PenTool className="h-4 w-4" />
                  Journal
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/community" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-islamic-green hover:text-islamic-teal">
                  <Users className="h-4 w-4" />
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedNav; 
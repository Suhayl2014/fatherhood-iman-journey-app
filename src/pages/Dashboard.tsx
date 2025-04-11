import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DailyBanner from '@/components/DailyBanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Baby, Plus, UserRound } from 'lucide-react';
import { Child } from '@/types/database.types';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import ChildCard from '@/components/ChildCard';
import MobileInfo from '@/components/MobileInfo';
import { Capacitor } from '@capacitor/core';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobileApp = Capacitor.isNativePlatform();

  const fetchChildren = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setChildren(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching children",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-4 sm:py-8 pb-20 md:pb-8">
        <div className="container-app px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {user?.user_metadata?.full_name || 'Parent'}</h1>
              <p className="mt-1 sm:mt-2 text-gray-600 text-sm sm:text-base">
                Your dashboard for tracking your child's milestones
              </p>
            </div>
            <div className="mt-3 md:mt-0 flex space-x-2 sm:space-x-3">
              <Button 
                variant="outline" 
                className="flex items-center text-sm sm:text-base" 
                onClick={() => navigate('/profile')}
              >
                <UserRound className="mr-1 sm:mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="outline" className="text-sm sm:text-base" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </div>

          <DailyBanner />

          {isMobileApp && <MobileInfo />}

          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-islamic-green">Your Children</h2>
              <Button onClick={() => navigate('/add-child')} size="sm" className="text-xs sm:text-sm">
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Add Child
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-6 sm:py-8">
                <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-b-2 border-t-2 border-islamic-green"></div>
              </div>
            ) : children.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {children.map((child) => (
                  <ChildCard key={child.id} child={child} onUpdate={fetchChildren} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <Baby className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1 sm:mb-2">No children added yet</h3>
                  <p className="text-gray-500 mb-4 sm:mb-6 text-center text-sm sm:text-base">
                    Add your first child to start tracking their milestones and development
                  </p>
                  <Button onClick={() => navigate('/add-child')} className="text-sm sm:text-base">
                    <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Add Child
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Islamic Lessons</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Access Islamic parenting guidance</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button variant="outline" asChild className="w-full text-sm sm:text-base">
                  <Link to="/lessons">View Lessons</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Development Milestones</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Learn about child development stages</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button variant="outline" asChild className="w-full text-sm sm:text-base">
                  <Link to="/milestones">View Milestones</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-islamic-green/5 border-islamic-green/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Baby className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-islamic-green" />
                  Baby Preparation
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Islamic traditions for welcoming a new baby</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full border-islamic-green/20 hover:bg-islamic-green/10 text-sm sm:text-base"
                  disabled={user?.email !== "suhayl2014@outlook.com"}
                >
                  <Link to={user?.email === "suhayl2014@outlook.com" ? "/baby-prep" : "#"}>
                    {user?.email === "suhayl2014@outlook.com" ? "View Guide" : "Coming Soon"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-islamic-teal/5 border-islamic-teal/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <UserRound className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-islamic-teal" />
                  Child Progress Tracker
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Track your child's Islamic development progress</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full border-islamic-teal/20 hover:bg-islamic-teal/10 text-sm sm:text-base"
                  disabled={children.length === 0}
                >
                  <Link to={children.length > 0 ? "/child-progress" : "#"}>
                    {children.length > 0 ? "View Progress" : "Add a Child First"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

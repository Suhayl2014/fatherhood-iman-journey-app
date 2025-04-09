import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const SignOut = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        // If there's no user, just clear storage and redirect
        if (!user) {
          localStorage.clear();
          navigate('/', { replace: true });
          return;
        }

        await signOut();
        // Clear any local storage items that might contain session data
        localStorage.clear();
        // Redirect to the landing page
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error signing out:', error);
        toast({
          title: "Error signing out",
          description: "There was a problem signing out. Please try again.",
          variant: "destructive",
        });
      }
    };

    performSignOut();
  }, [signOut, navigate, user]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Signing out...</h1>
        <p className="text-gray-600">Please wait while we end your session.</p>
      </div>
    </div>
  );
};

export default SignOut; 
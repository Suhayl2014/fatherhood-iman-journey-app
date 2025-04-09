import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loading from "@/components/Loading";
import MobileNav from "@/components/MobileNav";
import SignOut from './pages/SignOut';

// Lazy load pages
const Landing = lazy(() => import("./pages/Landing"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddChild = lazy(() => import("./pages/AddChild"));
const ChildMilestones = lazy(() => import("./pages/ChildMilestones"));
const Profile = lazy(() => import("./pages/Profile"));
const Index = lazy(() => import("./pages/Index"));
const Lessons = lazy(() => import("./pages/Lessons"));
const Milestones = lazy(() => import("./pages/Milestones"));
const Community = lazy(() => import("./pages/Community"));
const BabyPrep = lazy(() => import("./pages/BabyPrep"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen pb-16 md:pb-0">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add-child"
                    element={
                      <ProtectedRoute>
                        <AddChild />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/child/:id"
                    element={
                      <ProtectedRoute>
                        <ChildMilestones />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/index"
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/lessons"
                    element={
                      <ProtectedRoute>
                        <Lessons />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/milestones"
                    element={
                      <ProtectedRoute>
                        <Milestones />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/baby-prep"
                    element={
                      <ProtectedRoute>
                        <BabyPrep />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/signout" element={<SignOut />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <MobileNav />
            </div>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

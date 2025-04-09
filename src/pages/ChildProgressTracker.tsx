import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronDown, ChevronUp, CheckCircle2, Circle, Star, Award, Crown, Check, User, Plus } from 'lucide-react';
import { Child } from '@/types/database.types';
import { supabase } from '@/integrations/supabase/client';
import useAuth from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { format } from 'date-fns';
import confetti from 'canvas-confetti';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Define milestone types
interface Milestone {
  id: number;
  title: string;
  age: number;
  status: 'upcoming' | 'completed';
  category: string;
  description: string;
  completedAt?: string;
  dueDate: string;
}

// Define Islamic development stages
interface IslamicStage {
  name: string;
  description: string;
  icon: React.ReactNode;
  minPercentage: number;
}

const ChildProgressTracker = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllMilestones, setShowAllMilestones] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChildren();
  }, [user]);

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
      if (data && data.length > 0 && !selectedChild) {
        setSelectedChild(data[0]);
      }
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

  const getChildName = (childId: string) => {
    const child = children.find(c => c.id === childId);
    return child ? child.name : 'Child';
  };

  const getChildAge = (childId: string) => {
    const child = children.find(c => c.id === childId);
    if (!child || !child.date_of_birth) return 'Age unknown';
    
    const birthDate = new Date(child.date_of_birth);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                        (today.getMonth() - birthDate.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''} old`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return `${years} year${years !== 1 ? 's' : ''}${months > 0 ? `, ${months} month${months !== 1 ? 's' : ''}` : ''} old`;
    }
  };

  // Update the initial milestones data
  const initialMilestones: Milestone[] = [
    {
      id: 1,
      title: "First Words",
      age: 12,
      status: 'upcoming' as const,
      category: "Language",
      description: "Child says their first words",
      dueDate: "2024-12-31"
    },
    {
      id: 2,
      title: "First Steps",
      age: 12,
      status: 'upcoming' as const,
      category: "Physical",
      description: "Child takes their first steps",
      dueDate: "2024-12-31"
    },
    {
      id: 3,
      title: "First Prayer",
      age: 7,
      status: 'upcoming' as const,
      category: "Spiritual",
      description: "Child performs their first prayer",
      dueDate: "2024-12-31"
    }
  ];

  // Get all milestones for a child
  const getAllMilestones = (childId: string): Milestone[] => {
    const child = children.find(c => c.id === childId);
    if (!child || !child.date_of_birth) return [];
    
    const birthDate = new Date(child.date_of_birth);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                        (today.getMonth() - birthDate.getMonth());
    
    // Generate Islamic milestones based on age
    return [
      { 
        id: 1, 
        title: 'First Bismillah', 
        age: 12, 
        status: ageInMonths >= 12 ? 'completed' : 'upcoming',
        category: 'manners',
        description: 'Saying Bismillah before eating or starting activities',
        completedAt: ageInMonths >= 12 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 12 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 2, 
        title: 'First Alhamdulillah', 
        age: 14, 
        status: ageInMonths >= 14 ? 'completed' : 'upcoming',
        category: 'manners',
        description: 'Saying Alhamdulillah after eating or completing activities',
        completedAt: ageInMonths >= 14 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 14 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 3, 
        title: 'First Surah Al-Fatiha', 
        age: 24, 
        status: ageInMonths >= 24 ? 'completed' : 'upcoming',
        category: 'quran',
        description: 'Reciting Surah Al-Fatiha from memory',
        completedAt: ageInMonths >= 24 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 24 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 4, 
        title: 'First Complete Salah', 
        age: 36, 
        status: ageInMonths >= 36 ? 'completed' : 'upcoming',
        category: 'prayer',
        description: 'Performing a complete salah with proper movements',
        completedAt: ageInMonths >= 36 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 36 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 5, 
        title: 'First Ramadan Fast', 
        age: 84, 
        status: ageInMonths >= 84 ? 'completed' : 'upcoming',
        category: 'islamic_knowledge',
        description: 'Completing a full day of fasting during Ramadan',
        completedAt: ageInMonths >= 84 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 84 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 6, 
        title: 'First Basic Dua', 
        age: 18, 
        status: ageInMonths >= 18 ? 'completed' : 'upcoming',
        category: 'duas',
        description: 'Reciting a simple dua from memory',
        completedAt: ageInMonths >= 18 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 18 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 7, 
        title: 'First Islamic Story', 
        age: 20, 
        status: ageInMonths >= 20 ? 'completed' : 'upcoming',
        category: 'islamic_knowledge',
        description: 'Understanding and retelling a simple Islamic story',
        completedAt: ageInMonths >= 20 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 20 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 8, 
        title: 'First Wudu', 
        age: 30, 
        status: ageInMonths >= 30 ? 'completed' : 'upcoming',
        category: 'prayer',
        description: 'Performing wudu with proper steps',
        completedAt: ageInMonths >= 30 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 30 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 9, 
        title: 'First Surah Al-Ikhlas', 
        age: 28, 
        status: ageInMonths >= 28 ? 'completed' : 'upcoming',
        category: 'quran',
        description: 'Reciting Surah Al-Ikhlas from memory',
        completedAt: ageInMonths >= 28 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 28 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 10, 
        title: 'First Dua Before Sleep', 
        age: 22, 
        status: ageInMonths >= 22 ? 'completed' : 'upcoming',
        category: 'duas',
        description: 'Reciting the dua before sleeping',
        completedAt: ageInMonths >= 22 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 22 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 11, 
        title: 'First Eid Celebration', 
        age: 16, 
        status: ageInMonths >= 16 ? 'completed' : 'upcoming',
        category: 'islamic_knowledge',
        description: 'Participating in Eid celebrations and understanding their significance',
        completedAt: ageInMonths >= 16 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 16 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 12, 
        title: 'First Islamic Greeting', 
        age: 15, 
        status: ageInMonths >= 15 ? 'completed' : 'upcoming',
        category: 'manners',
        description: 'Using Islamic greetings like Assalamu alaikum',
        completedAt: ageInMonths >= 15 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 15 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 13, 
        title: 'First Dua After Eating', 
        age: 19, 
        status: ageInMonths >= 19 ? 'completed' : 'upcoming',
        category: 'duas',
        description: 'Reciting the dua after eating',
        completedAt: ageInMonths >= 19 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 19 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 14, 
        title: 'First Surah Al-Asr', 
        age: 32, 
        status: ageInMonths >= 32 ? 'completed' : 'upcoming',
        category: 'quran',
        description: 'Reciting Surah Al-Asr from memory',
        completedAt: ageInMonths >= 32 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 32 ? '2024-12-31' : '2024-12-31'
      },
      { 
        id: 15, 
        title: 'First Complete Prayer Times', 
        age: 42, 
        status: ageInMonths >= 42 ? 'completed' : 'upcoming',
        category: 'prayer',
        description: 'Understanding and recognizing the five daily prayer times',
        completedAt: ageInMonths >= 42 ? new Date().toISOString() : undefined,
        dueDate: ageInMonths >= 42 ? '2024-12-31' : '2024-12-31'
      }
    ] as const;
  };

  // Get upcoming milestones
  const getUpcomingMilestones = (childId: string) => {
    const allMilestones = getAllMilestones(childId);
    return allMilestones.filter(m => m.status === 'upcoming');
  };

  // Get completed milestones
  const getCompletedMilestones = (childId: string) => {
    const allMilestones = getAllMilestones(childId);
    return allMilestones.filter(m => m.status === 'completed');
  };

  // Trigger confetti animation
  const triggerConfetti = () => {
    setShowConfetti(true);
    
    // Fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Reset after animation
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  // Update the milestone completion function
  const markMilestoneCompleted = (milestoneId: string) => {
    setMilestones(prevMilestones => {
      const updatedMilestones = prevMilestones.map(milestone => {
        if (milestone.id.toString() === milestoneId) {
          // Only allow completion if not already completed
          if (milestone.status === 'upcoming') {
            const updatedMilestone: Milestone = {
              ...milestone,
              status: 'completed' as const,
              completedAt: new Date().toISOString()
            };
            
            // Trigger confetti when completing
            triggerConfetti();
            
            return updatedMilestone;
          }
        }
        return milestone;
      });

      // Sort milestones by age
      return updatedMilestones.sort((a, b) => a.age - b.age);
    });
  };

  // Add function to mark milestone as incomplete
  const markMilestoneIncomplete = (milestoneId: string) => {
    setMilestones(prevMilestones => {
      const updatedMilestones = prevMilestones.map(milestone => {
        if (milestone.id.toString() === milestoneId) {
          return {
            ...milestone,
            status: 'upcoming' as const,
            completedAt: undefined
          };
        }
        return milestone;
      });

      // Sort milestones by age
      return updatedMilestones.sort((a, b) => a.age - b.age);
    });
  };

  // Update milestones when selected child changes
  useEffect(() => {
    if (selectedChild) {
      setMilestones(getAllMilestones(selectedChild.id));
    }
  }, [selectedChild]);

  // Define Islamic development stages
  const islamicStages: IslamicStage[] = [
    {
      name: "New Muslim",
      description: "Beginning the journey of Islamic knowledge",
      icon: <Circle className="h-5 w-5" />,
      minPercentage: 0
    },
    {
      name: "Seeker of Knowledge",
      description: "Actively learning Islamic teachings",
      icon: <Star className="h-5 w-5" />,
      minPercentage: 25
    },
    {
      name: "Practicing Muslim",
      description: "Implementing Islamic practices in daily life",
      icon: <Award className="h-5 w-5" />,
      minPercentage: 50
    },
    {
      name: "Righteous Servant",
      description: "Living according to Islamic principles",
      icon: <Crown className="h-5 w-5" />,
      minPercentage: 75
    },
    {
      name: "Beloved of Allah",
      description: "Achieving a high level of Islamic excellence",
      icon: <CheckCircle2 className="h-5 w-5" />,
      minPercentage: 90
    }
  ];

  // Calculate completion percentage
  const calculateCompletionPercentage = (child: Child) => {
    const totalMilestones = milestones.length;
    if (totalMilestones === 0) return 0;
    
    const completedMilestones = milestones.filter(m => m.status === 'completed').length;
    return Math.round((completedMilestones / totalMilestones) * 100);
  };

  // Get current Islamic stage based on completion percentage
  const getCurrentIslamicStage = (percentage: number) => {
    for (let i = islamicStages.length - 1; i >= 0; i--) {
      if (percentage >= islamicStages[i].minPercentage) {
        return islamicStages[i];
      }
    }
    return islamicStages[0];
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-4 sm:py-8 pb-20 md:pb-8">
          <div className="container-app px-4 sm:px-6">
            <div className="flex justify-center py-12">
              <Loading />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-4 sm:py-8 pb-20 md:pb-8">
          <div className="container-app px-4 sm:px-6">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-islamic-green mb-4">Child Progress Tracker</h1>
              <p className="text-gray-600 mb-6">Add a child to start tracking their progress</p>
              <Button asChild>
                <Link to="/add-child">Add Child</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const upcomingMilestones = selectedChild ? getUpcomingMilestones(selectedChild.id) : [];
  const completedMilestones = selectedChild ? getCompletedMilestones(selectedChild.id) : [];
  const displayedMilestones = showAllMilestones ? upcomingMilestones : upcomingMilestones.slice(0, 3);

  // Render the Islamic development timeline
  const renderIslamicTimeline = () => {
    if (!selectedChild) return null;
    
    const completionPercentage = calculateCompletionPercentage(selectedChild);
    const currentStage = getCurrentIslamicStage(completionPercentage);
    const currentStageIndex = islamicStages.findIndex(stage => stage.name === currentStage.name);
    
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Islamic Development Journey</h3>
        <div className="relative">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-islamic-green transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-islamic-green rounded-full border-2 border-white shadow-lg transition-all duration-500"
                style={{ left: `calc(${completionPercentage}% - 8px)` }}
              />
            </div>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
            
            {/* Timeline stages */}
            <div className="flex justify-between relative">
              {islamicStages.map((stage, index) => {
                const isActive = index <= currentStageIndex;
                const isCurrent = index === currentStageIndex;
                
                return (
                  <div key={stage.name} className="relative flex flex-col items-center">
                    {/* Stage marker */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      isActive ? 'bg-islamic-green text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {stage.icon}
                    </div>
                    
                    {/* Stage content */}
                    <div className={`p-3 rounded-lg border text-center w-32 ${
                      isCurrent ? 'border-islamic-green bg-islamic-green/5' : 'border-gray-200'
                    }`}>
                      <h4 className={`font-medium text-sm ${isCurrent ? 'text-islamic-green' : ''}`}>
                        {stage.name}
                        {isCurrent && <span className="block text-xs bg-islamic-green text-white px-2 py-0.5 rounded-full mt-1">Current</span>}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Update the milestone card rendering
  const renderMilestoneCard = (milestone: Milestone) => (
    <Card key={milestone.id} className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{milestone.title}</CardTitle>
        <CardDescription>
          Age: {milestone.age} months • Due: {new Date(milestone.dueDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{milestone.description}</p>
        <div className="flex justify-between items-center">
          <Badge variant="outline">{milestone.category}</Badge>
          {milestone.status === 'upcoming' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markMilestoneCompleted(milestone.id.toString())}
              className="text-xs transition-all duration-300"
            >
              Mark Complete
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                className="text-xs bg-islamic-green hover:bg-islamic-green/90"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Completed
                  {milestone.completedAt && (
                    <span className="text-xs opacity-75">
                      ({format(new Date(milestone.completedAt), 'MMM d, yyyy')})
                    </span>
                  )}
                </div>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markMilestoneIncomplete(milestone.id.toString())}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Undo
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-4 sm:py-8 pb-20 md:pb-8">
        <div className="container-app px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-islamic-green">Child Progress Tracker</h1>
            <p className="mt-1 sm:mt-2 text-gray-600">Monitor your child's Islamic development from 0-7 years</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left sidebar */}
            <div className="w-full md:w-64 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Children</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {children.map((child) => (
                      <Button
                        key={child.id}
                        variant={selectedChild?.id === child.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedChild(child)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        {child.name}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate('/add-child')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Child
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="flex-1">
              {selectedChild ? (
                <>
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold">{selectedChild.name}'s Progress</h1>
                    <p className="text-muted-foreground">
                      Age: {getChildAge(selectedChild.id)}
                    </p>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="overview">Milestones Completed</TabsTrigger>
                      <TabsTrigger value="milestones">Upcoming Milestones</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      {/* Islamic Development Timeline */}
                      {renderIslamicTimeline()}
                      
                      {/* Upcoming Milestones */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Islamic Milestones</CardTitle>
                          <CardDescription>Track your child's next Islamic achievements</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {milestones
                              .filter(m => m.status === 'upcoming')
                              .sort((a, b) => a.age - b.age)
                              .map((milestone) => renderMilestoneCard(milestone))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="milestones" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Milestones Completed</CardTitle>
                          <CardDescription>Celebrate your child's Islamic achievements</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {milestones
                              .filter(m => m.status === 'completed')
                              .sort((a, b) => a.age - b.age)
                              .map((milestone) => renderMilestoneCard(milestone))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold mb-4">No Child Selected</h2>
                  <p className="text-muted-foreground mb-6">
                    Please select a child or add a new one to track their progress.
                  </p>
                  <Button onClick={() => navigate('/add-child')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Child
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-islamic-green mb-2">MashaAllah!</h2>
              <p className="text-xl text-gray-700">Great achievement!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildProgressTracker; 
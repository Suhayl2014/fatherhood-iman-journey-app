import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../context/AuthContext';
import { milestones, Milestone } from '@/data/milestones';
import { ChildMilestone, Child } from '@/types/database.types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Baby, Calendar, Plus, Check, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChildMilestones = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [child, setChild] = useState<Child | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<ChildMilestone[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [completionDate, setCompletionDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>('all');

  // Fetch child and completed milestones data
  useEffect(() => {
    const fetchData = async () => {
      if (!childId || !user) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch child details
        const { data: childData, error: childError } = await supabase
          .from('children')
          .select('*')
          .eq('id', childId)
          .eq('user_id', user.id)
          .single();
          
        if (childError) {
          console.error('Error fetching child:', childError);
          toast({
            title: "Error fetching child data",
            description: childError.message || "We couldn't find this child in your records.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        if (!childData) {
          toast({
            title: "Child not found",
            description: "We couldn't find this child in your records.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        setChild(childData);
        
        // Fetch completed milestones
        const { data: milestonesData, error: milestonesError } = await supabase
          .from('child_milestones')
          .select('*')
          .eq('child_id', childId);
          
        if (milestonesError) {
          console.error('Error fetching milestones:', milestonesError);
          toast({
            title: "Error fetching milestones",
            description: milestonesError.message || "We couldn't load the milestone data.",
            variant: "destructive",
          });
        }
        
        setCompletedMilestones(milestonesData || []);
      } catch (error: any) {
        console.error('Error in fetchData:', error);
        toast({
          title: "Error loading data",
          description: error.message || "There was a problem loading the data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [childId, user]);

  // Handle milestone completion
  const handleAddMilestone = async () => {
    if (!selectedMilestone || !childId || !user || !completionDate) {
      toast({
        title: "Missing information",
        description: "Please select a date when this milestone was achieved",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('child_milestones')
        .insert({
          child_id: childId,
          milestone_id: selectedMilestone.id,
          completed_date: completionDate,
          notes: notes || null,
        })
        .select();
      
      if (error) throw error;
      
      if (data) {
        setCompletedMilestones([...completedMilestones, data[0]]);
        toast({
          title: "Milestone recorded",
          description: `You've recorded the "${selectedMilestone.title}" milestone!`,
        });
        
        // Reset form
        setSelectedMilestone(null);
        setCompletionDate('');
        setNotes('');
        setDialogOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Error recording milestone",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filter milestones based on completion status
  const getMilestones = () => {
    // Map completed milestone IDs for easy lookup
    const completedMilestoneIds = new Set(
      completedMilestones.map(m => m.milestone_id)
    );
    
    return milestones.filter(milestone => {
      if (selectedTab === 'completed') {
        return completedMilestoneIds.has(milestone.id);
      } else if (selectedTab === 'pending') {
        return !completedMilestoneIds.has(milestone.id);
      }
      return true; // 'all' tab
    });
  };

  // Find child milestone for a given milestone
  const findChildMilestone = (milestoneId: string) => {
    return completedMilestones.find(m => m.milestone_id === milestoneId);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    
    if (years === 0) {
      return `${months} months`;
    } else if (years === 1 && months === 0) {
      return `${years} year`;
    } else if (years >= 1 && months === 0) {
      return `${years} years`;
    } else {
      return `${years} years, ${months} months`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container-app">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-islamic-green"></div>
            </div>
          ) : child ? (
            <>
              <div className="mb-8">
                <div className="bg-gradient-to-r from-islamic-green to-islamic-teal text-white p-6 rounded-lg shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Baby className="h-8 w-8" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">{child.name}'s Milestones</h1>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(child.date_of_birth)}
                        </span>
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                          {calculateAge(child.date_of_birth)}
                        </span>
                        <span className="capitalize">{child.gender}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div>
                      <div className="text-sm opacity-80">Completed Milestones</div>
                      <div className="text-2xl font-bold">{completedMilestones.length} of {milestones.length}</div>
                    </div>
                    
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-white text-islamic-green hover:bg-white/90">
                          <Plus className="h-4 w-4 mr-2" /> Record Milestone
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Record a Milestone</DialogTitle>
                          <DialogDescription>
                            Select a milestone that {child.name} has achieved and when it happened.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              Select Milestone
                            </label>
                            <select 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              value={selectedMilestone?.id || ''}
                              onChange={(e) => {
                                const selected = milestones.find(m => m.id === e.target.value);
                                setSelectedMilestone(selected || null);
                              }}
                            >
                              <option value="">Select a milestone...</option>
                              {milestones
                                .filter(m => !completedMilestones.some(cm => cm.milestone_id === m.id))
                                .map(m => (
                                  <option key={m.id} value={m.id}>
                                    {m.title} ({m.ageRange} - {m.category})
                                  </option>
                                ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              When was this milestone achieved?
                            </label>
                            <Input 
                              type="date" 
                              value={completionDate}
                              onChange={(e) => setCompletionDate(e.target.value)}
                              max={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-1 block">
                              Notes (Optional)
                            </label>
                            <Input 
                              placeholder="Add any observations or special memories"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddMilestone}>
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <Tabs defaultValue="all" onValueChange={setSelectedTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All Milestones</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="pending">Not Yet Achieved</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={selectedTab} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getMilestones().map((milestone) => {
                        const childMilestone = findChildMilestone(milestone.id);
                        const isCompleted = !!childMilestone;
                        
                        return (
                          <MilestoneCard 
                            key={milestone.id}
                            milestone={milestone}
                            childMilestone={childMilestone}
                            isCompleted={isCompleted}
                          />
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Child Not Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find this child in your records. This could be because:
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    The child ID in the URL is incorrect
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    The child has been deleted from your records
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    You don't have permission to view this child's records
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/dashboard')} variant="outline">
                Return to Dashboard
              </Button>
                  <Button onClick={() => navigate('/add-child')}>
                    Add New Child
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface MilestoneCardProps {
  milestone: Milestone;
  childMilestone: ChildMilestone | undefined;
  isCompleted: boolean;
}

const MilestoneCard = ({ milestone, childMilestone, isCompleted }: MilestoneCardProps) => {
  const [showTips, setShowTips] = useState(false);
  
  // Choose background color based on category
  const getBgColor = () => {
    switch (milestone.category) {
      case 'physical': return 'bg-islamic-green/10';
      case 'cognitive': return 'bg-islamic-blue/10';
      case 'social': return 'bg-islamic-teal/10';
      case 'emotional': return 'bg-red-500/10';
      case 'spiritual': return 'bg-islamic-gold/10';
      default: return 'bg-gray-100';
    }
  };
  
  // Choose text color based on category
  const getTextColor = () => {
    switch (milestone.category) {
      case 'physical': return 'text-islamic-green';
      case 'cognitive': return 'text-islamic-blue';
      case 'social': return 'text-islamic-teal';
      case 'emotional': return 'text-red-500';
      case 'spiritual': return 'text-islamic-gold';
      default: return 'text-gray-800';
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Card className={`overflow-hidden card-hover h-full flex flex-col ${
      isCompleted ? 'border-green-500 shadow-sm' : ''
    }`}>
      <CardHeader className="pb-2 relative">
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500 text-white">
              <Check className="h-3 w-3 mr-1" /> Achieved
            </Badge>
          </div>
        )}
        <Badge className={`${getBgColor()} ${getTextColor()} border-none mb-2 mt-4`}>
          {milestone.category.charAt(0).toUpperCase() + milestone.category.slice(1)}
        </Badge>
        <CardTitle className={getTextColor()}>{milestone.title}</CardTitle>
        <CardDescription className="flex items-center mt-1">
          <span className="text-sm font-medium">{milestone.ageRange}</span>
        </CardDescription>
        {isCompleted && childMilestone && (
          <div className="mt-2 text-sm text-gray-500">
            <span>Achieved on {formatDate(childMilestone.completed_date)}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4 mt-2">
          <p className="text-gray-600">{milestone.description}</p>
        </div>
        
        <div className="mb-4 mt-2">
          <h4 className="font-semibold text-gray-700 mb-2">Islamic Perspective:</h4>
          <p className="text-gray-600">{milestone.islamicPerspective}</p>
        </div>
        
        {showTips && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Tips for Fathers:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {milestone.tips.map((tip, index) => (
                <li key={index} className="text-gray-600">{tip}</li>
              ))}
            </ul>
          </div>
        )}
        
        {isCompleted && childMilestone?.notes && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <h4 className="font-semibold text-gray-700 mb-1">Your Notes:</h4>
            <p className="text-gray-600">{childMilestone.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <button 
          onClick={() => setShowTips(!showTips)}
          className={`text-sm font-medium ${getTextColor()} hover:underline`}
        >
          {showTips ? "Hide tips" : "Show tips for fathers"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default ChildMilestones;

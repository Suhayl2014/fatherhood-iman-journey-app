import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { milestones, Milestone } from '@/data/milestones';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Baby, Brain, Heart, Users, BookOpen } from "lucide-react";

const Milestones = () => {
  const [selectedAge, setSelectedAge] = useState('all');
  
  // Extract unique age ranges for filtering
  const ageRanges = Array.from(new Set(milestones.map(milestone => milestone.ageRange)));
  
  // Filter milestones based on selected age range
  const filteredMilestones = selectedAge === 'all' 
    ? milestones 
    : milestones.filter(milestone => milestone.ageRange === selectedAge);

  // Group milestones by age range
  const groupedMilestones = filteredMilestones.reduce((acc, milestone) => {
    if (!acc[milestone.ageRange]) {
      acc[milestone.ageRange] = [];
    }
    acc[milestone.ageRange].push(milestone);
    return acc;
  }, {} as Record<string, Milestone[]>);
  
  // Category icon mapping
  const categoryIcons: Record<string, React.ElementType> = {
    physical: Baby,
    cognitive: Brain,
    social: Users,
    emotional: Heart,
    spiritual: BookOpen
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-4 sm:py-8">
        <div className="container-app px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-islamic-green">Islamic Development Milestones</h1>
            <p className="mt-1 sm:mt-2 text-gray-600">Track your child's growth through key Islamic and developmental stages</p>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedAge} className="w-full">
            <div className="flex justify-center overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <TabsList className="mb-6 sm:mb-8">
                <TabsTrigger value="all" className="text-sm sm:text-base">All Ages</TabsTrigger>
                {ageRanges.map(ageRange => (
                  <TabsTrigger key={ageRange} value={ageRange} className="text-sm sm:text-base">
                    {ageRange}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-8 sm:space-y-12">
                {Object.entries(groupedMilestones).map(([ageRange, milestones]) => (
                  <div key={ageRange}>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-islamic-green border-b pb-2">
                      {ageRange}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {milestones.map((milestone) => (
                        <MilestoneCard 
                          key={milestone.id} 
                          milestone={milestone}
                          Icon={categoryIcons[milestone.category]}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {ageRanges.map(ageRange => (
              <TabsContent key={ageRange} value={ageRange} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {groupedMilestones[ageRange]?.map((milestone) => (
                    <MilestoneCard 
                      key={milestone.id} 
                      milestone={milestone} 
                      Icon={categoryIcons[milestone.category]}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Development Categories Explanation */}
        <section className="py-8 sm:py-12 bg-white mt-8 sm:mt-12">
          <div className="container-app px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-islamic-green">Development Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mb-2">
                    <Baby className="h-5 w-5 text-islamic-green" />
                  </div>
                  <CardTitle className="text-islamic-green">Physical</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Motor skills, coordination, and physical abilities.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-islamic-blue/10 flex items-center justify-center mb-2">
                    <Brain className="h-5 w-5 text-islamic-blue" />
                  </div>
                  <CardTitle className="text-islamic-blue">Cognitive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Learning, problem-solving, and mental development.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-islamic-teal" />
                  </div>
                  <CardTitle className="text-islamic-teal">Social</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Interaction with others, communication, and relationships.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <CardTitle className="text-red-500">Emotional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Expressing feelings, recognizing emotions, and developing empathy.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-islamic-gold/10 flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5 text-islamic-gold" />
                  </div>
                  <CardTitle className="text-islamic-gold">Spiritual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">Connection to faith, developing Islamic identity, and understanding of Allah.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Milestone Card Component
const MilestoneCard = ({ milestone, Icon }: { milestone: Milestone; Icon: React.ElementType }) => {
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

  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <CardHeader className="pb-2 p-4">
        <Badge className={`${getBgColor()} ${getTextColor()} border-none mb-2`}>
          {milestone.category.charAt(0).toUpperCase() + milestone.category.slice(1)}
        </Badge>
        <CardTitle className={`${getTextColor()} text-base sm:text-lg`}>{milestone.title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{milestone.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="mb-4 mt-2">
          <h4 className="font-semibold text-gray-700 text-sm sm:text-base mb-2">Islamic Perspective:</h4>
          <p className="text-gray-600 text-sm">{milestone.islamicPerspective}</p>
        </div>
        
        {showTips && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 text-sm sm:text-base mb-2">Tips for Fathers:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {milestone.tips.map((tip, index) => (
                <li key={index} className="text-gray-600 text-sm">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
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

export default Milestones;

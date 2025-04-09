
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
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-islamic-blue text-white py-12">
          <div className="container-app">
            <div className="flex items-center justify-center mb-6">
              <Baby className="h-12 w-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">Child Development Milestones</h1>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              Track your child's development through key stages with guidance from Islamic perspective and practical tips for fathers.
            </p>
          </div>
        </section>
        
        {/* Age Range Tabs */}
        <section className="py-8 bg-gray-50">
          <div className="container-app">
            <Tabs defaultValue="all" onValueChange={setSelectedAge} className="w-full">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="all">All Ages</TabsTrigger>
                  {ageRanges.map(ageRange => (
                    <TabsTrigger key={ageRange} value={ageRange}>{ageRange}</TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="space-y-12">
                  {Object.entries(groupedMilestones).map(([ageRange, milestones]) => (
                    <div key={ageRange}>
                      <h2 className="text-2xl font-bold mb-6 text-islamic-green border-b pb-2">
                        {ageRange}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </section>
        
        {/* Development Categories Explanation */}
        <section className="py-12 bg-white">
          <div className="container-app">
            <h2 className="text-2xl font-bold mb-8 text-islamic-green">Development Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mb-2">
                    <Baby className="h-5 w-5 text-islamic-green" />
                  </div>
                  <CardTitle className="text-islamic-green">Physical</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Movement, motor skills, physical growth and coordination development.</p>
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
                  <p>Learning, thinking, problem-solving, language and memory development.</p>
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
                  <p>Interacting with others, forming relationships, and developing social skills.</p>
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
                  <p>Expressing feelings, recognizing emotions, and developing empathy.</p>
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
                  <p>Connection to faith, developing Islamic identity, and understanding of Allah.</p>
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
      <CardHeader className="pb-2">
        <Badge className={`${getBgColor()} ${getTextColor()} border-none mb-2`}>
          {milestone.category.charAt(0).toUpperCase() + milestone.category.slice(1)}
        </Badge>
        <CardTitle className={getTextColor()}>{milestone.title}</CardTitle>
        <CardDescription>{milestone.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
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

export default Milestones;

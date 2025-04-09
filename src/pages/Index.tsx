
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DailyGuidance from '@/components/DailyGuidance';
import FeatureCard from '@/components/FeatureCard';
import JournalEntry from '@/components/JournalEntry';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Baby, Heart, BookMarked, Users, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [guidanceIndex, setGuidanceIndex] = useState(0);
  
  // Sample guidance content - in a real app this would come from an API or database
  const guidanceContent = [
    {
      title: "The Father's Role",
      subtitle: "From Islamic Perspective",
      content: "The father is not just a provider but a spiritual guide, a teacher, and a role model. The Prophet Muhammad (peace be upon him) said: 'No gift that a father gives his child is better than good manners.'",
      source: "Tirmidhi"
    },
    {
      title: "Patience in Parenting",
      subtitle: "Islamic Wisdom",
      content: "When facing challenges with your children, remember Allah's words in the Quran: 'Indeed, Allah is with the patient.' Parenthood is a journey that requires sabr (patience) and tawakkul (trust in Allah).",
      source: "Quran 2:153"
    },
    {
      title: "Leading by Example",
      subtitle: "Daily Reflection",
      content: "Your children learn more from what you do than what you say. The Prophet Muhammad (peace be upon him) was a living example of the values he taught. As fathers, our actions are the most powerful lessons we provide.",
      source: "Islamic Principle"
    }
  ];
  
  const features = [
    {
      title: "Islamic Lessons",
      description: "Guidance on Islamic parenting principles and practices.",
      icon: BookOpen,
      linkTo: "/lessons"
    },
    {
      title: "Child Milestones",
      description: "Track your child's development with Islamic perspective.",
      icon: Baby,
      linkTo: "/milestones"
    },
    {
      title: "Baby Preparation",
      description: "Islamic traditions for welcoming your newborn.",
      icon: Heart,
      linkTo: "/babyprep",
      highlight: true
    },
    {
      title: "Duas Collection",
      description: "Essential prayers for Muslim fathers and children.",
      icon: BookMarked,
      linkTo: "/duas"
    },
    {
      title: "Fatherhood Community",
      description: "Connect with other Muslim fathers on similar journeys.",
      icon: Users,
      linkTo: "/community"
    }
  ];
  
  // Function to cycle through guidance content
  const changeGuidance = () => {
    setGuidanceIndex((prevIndex) => (prevIndex + 1) % guidanceContent.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-islamic-green text-white py-12 md:py-20">
          <div className="container-app">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-decorative">
                  Your Iman Journey as a Father
                </h1>
                <p className="text-xl mb-6 text-islamic-sand">
                  Islamic guidance and practical tools for Muslim fathers navigating parenthood with faith and purpose.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/lessons')}
                    className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green"
                  >
                    Begin Learning
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/community')}
                    className="border-islamic-sand text-islamic-sand hover:bg-islamic-sand/10"
                  >
                    Join Community
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <div className="rounded-lg overflow-hidden shadow-lg bg-islamic-teal relative">
                  <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                  <div className="p-8 relative z-10">
                    <h2 className="text-2xl font-bold mb-4 text-islamic-cream">
                      "The best of you are those who are best to their families."
                    </h2>
                    <p className="italic text-islamic-sand">- Prophet Muhammad (peace be upon him)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Daily Guidance Section */}
        <section className="py-12 bg-islamic-cream">
          <div className="container-app">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-islamic-green">Today's Guidance</h2>
              <Button variant="ghost" onClick={changeGuidance} className="text-islamic-teal hover:text-islamic-green">
                Next Guidance <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <DailyGuidance {...guidanceContent[guidanceIndex]} />
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-12">
          <div className="container-app">
            <h2 className="text-2xl font-bold mb-8 text-islamic-green">Explore Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  linkTo={feature.linkTo}
                  highlight={feature.highlight}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Quick Journal Entry */}
        <section className="py-12 bg-gray-50">
          <div className="container-app">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-islamic-green">Your Fatherhood Journey</h2>
                <p className="mb-6 text-gray-700">
                  Taking a moment to reflect on your experiences as a father can help you grow both as a parent and in your spiritual journey. Research shows journaling can reduce stress and increase mindfulness.
                </p>
                <Card className="bg-islamic-teal text-white overflow-hidden border-none">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">Benefits of Reflection</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Increases presence and mindfulness with your children</li>
                      <li>Helps track your spiritual growth as a father</li>
                      <li>Creates a valuable record of your child's development</li>
                      <li>Provides an emotional outlet during challenging times</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="md:w-1/2">
                <JournalEntry />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-islamic-green text-white text-center">
          <div className="container-app">
            <Heart className="h-16 w-16 mx-auto mb-6 text-islamic-gold" />
            <h2 className="text-3xl font-bold mb-4">Start Your Iman Journey Today</h2>
            <p className="max-w-2xl mx-auto mb-8 text-islamic-sand">
              Join thousands of Muslim fathers growing spiritually while nurturing their families with confidence and purpose.
            </p>
            <Button
              onClick={() => navigate('/lessons')}
              className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green text-lg px-8 py-6 h-auto"
            >
              Begin Your Journey
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

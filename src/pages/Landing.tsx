import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Baby, BookOpen, CheckCircle, Star, Crown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuth from '../context/AuthContext';
import AuthenticatedNav from '@/components/AuthenticatedNav';
import { WaitlistForm } from "@/components/WaitlistForm";

const Landing = () => {
  const [isHero1Visible, setIsHero1Visible] = useState(true);
  const { user } = useAuth();
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    // First scroll to the waitlist section
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Then focus on the email input after a short delay
    setTimeout(() => {
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
      if (emailInput) {
        emailInput.focus();
        emailInput.classList.add('ring-2', 'ring-islamic-green', 'ring-offset-2');
        setTimeout(() => {
          emailInput.classList.remove('ring-2', 'ring-islamic-green', 'ring-offset-2');
        }, 2000);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {user ? (
        <AuthenticatedNav />
      ) : (
      <header className="bg-white shadow-sm">
        <div className="container-app">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
                <Link to="/auth" className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-islamic-green to-islamic-teal flex items-center justify-center shadow-md">
                    <div className="relative">
                      <Heart className="h-6 w-6 text-white" />
                      <Shield className="h-3 w-3 text-islamic-gold absolute -top-1 -right-1" />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-islamic-green">The Modern Muslim Dad</h1>
                    <p className="text-xs text-islamic-teal">Empowering fathers with faith</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      )}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className={`transition-opacity duration-500 ${isHero1Visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-gradient-to-r from-islamic-green to-islamic-teal text-white py-20">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-decorative">
                      The Modern Muslim Dad
                    </h2>
                    <p className="text-xl mb-6 text-islamic-sand">
                      Islamic guidance and practical tools for Muslim fathers navigating parenthood with faith and purpose.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-green"
                        onClick={scrollToWaitlist}
                      >
                        Start Your Journey
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
            </div>
          </div>

          <div className={`absolute inset-0 transition-opacity duration-500 ${!isHero1Visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-gradient-to-r from-islamic-blue to-islamic-teal text-white py-20">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-decorative">
                      Track Your Child's Growth
                    </h2>
                    <p className="text-xl mb-6">
                      Monitor milestones, celebrate achievements, and nurture development with Islamic guidance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-blue"
                        onClick={scrollToWaitlist}
                      >
                        Start Your Journey
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white text-white hover:bg-white/10"
                        onClick={() => setIsHero1Visible(true)}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Baby, title: "Physical Development", description: "Track physical growth milestones" },
                        { icon: BookOpen, title: "Cognitive Learning", description: "Monitor intellectual development" },
                        { icon: Heart, title: "Emotional Growth", description: "Nurture emotional intelligence" },
                        { icon: Crown, title: "Islamic Values", description: "Incorporate Islamic teachings" }
                      ].map((item, index) => (
                        <div key={index} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                          <item.icon className="h-8 w-8 mb-2 text-islamic-gold" />
                          <h3 className="font-bold mb-1">{item.title}</h3>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-islamic-green">Features Designed for Modern Muslim Dads</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our app combines Islamic wisdom with practical parenting tools to help you raise children with strong faith and character.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Child Milestone Tracking",
                  description: "Monitor your child's development across physical, cognitive, social, emotional, and spiritual domains with Islamic perspective.",
                  icon: Baby,
                },
                {
                  title: "Islamic Lessons",
                  description: "Access age-appropriate Islamic teachings to introduce to your children at the right developmental stages.",
                  icon: BookOpen,
                },
                {
                  title: "Personalized Dashboard",
                  description: "Get an overview of your child's progress and upcoming developmental milestones to focus on.",
                  icon: CheckCircle,
                }
              ].map((feature, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-islamic-green/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-islamic-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-islamic-green">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section ref={waitlistRef} className="py-16 bg-gradient-to-r from-islamic-green to-islamic-teal text-white">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Join Our Exclusive Waitlist</h2>
              <p className="text-lg text-islamic-sand mb-8">
                Be among the first to experience Fatherhood Iman Journey when we launch. Get early access and special benefits.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-islamic-green to-islamic-teal flex items-center justify-center">
                  <div className="relative">
                  <Heart className="h-4 w-4 text-white" />
                    <Star className="h-2 w-2 text-islamic-gold absolute -top-0.5 -right-0.5" />
                  </div>
                </div>
                <span className="font-bold text-islamic-green">The Modern Muslim Dad</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} The Modern Muslim Dad. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { duas, Dua } from '@/data/duas';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, BookMarked, Search, VolumeX, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Duas = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = Array.from(new Set(duas.map(dua => dua.category)));
  
  // Filter duas based on search and category
  const filteredDuas = duas.filter(dua => {
    const matchesSearch = 
      dua.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dua.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.relevance.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory ? dua.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Copy dua text to clipboard
  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `"${title}" has been copied to your clipboard.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-islamic-gold/90 text-islamic-green py-12">
          <div className="container-app">
            <div className="flex items-center justify-center mb-6">
              <BookMarked className="h-12 w-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">Duas for Fathers</h1>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              Essential prayers from the Quran and Sunnah specifically relevant to fathers and parenting in Islam.
            </p>
          </div>
        </section>
        
        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container-app">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative w-full max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search duas..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-gray-500">Filter by category:</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === null ? "default" : "outline"} 
                    onClick={() => setSelectedCategory(null)}
                    className={`${selectedCategory === null ? "bg-islamic-green hover:bg-islamic-green/90" : "hover:bg-gray-100"}`}
                  >
                    All Categories
                  </Button>
                  
                  {categories.map((category) => (
                    <Button 
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={`${selectedCategory === category ? "bg-islamic-green hover:bg-islamic-green/90" : "hover:bg-gray-100"}`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Duas List */}
        <section className="py-12">
          <div className="container-app">
            {filteredDuas.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No duas found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or category filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDuas.map((dua) => (
                  <DuaCard 
                    key={dua.id} 
                    dua={dua} 
                    onCopy={(text) => copyToClipboard(text, dua.title)} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* How to Use Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-app">
            <h2 className="text-2xl font-bold mb-8 text-islamic-green text-center">How to Use These Duas</h2>
            
            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="when">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="when">When to Recite</TabsTrigger>
                  <TabsTrigger value="how">How to Recite</TabsTrigger>
                  <TabsTrigger value="teaching">Teaching Children</TabsTrigger>
                </TabsList>
                
                <TabsContent value="when" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>When to Recite These Duas</CardTitle>
                      <CardDescription>
                        Recommended times and situations for each category of dua
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex gap-2">
                          <Badge className="bg-islamic-green self-start mt-1">Children</Badge>
                          <span>Recite regularly in prayer, especially after obligatory prayers. Also suitable before sleeping or when facing challenges with children.</span>
                        </li>
                        <li className="flex gap-2">
                          <Badge className="bg-islamic-green self-start mt-1">Protection</Badge>
                          <span>Recite in the morning and evening, before your child sleeps, or when leaving the home with your family.</span>
                        </li>
                        <li className="flex gap-2">
                          <Badge className="bg-islamic-green self-start mt-1">Family</Badge>
                          <span>Ideal for family gatherings, before meals together, or during times of family worship.</span>
                        </li>
                        <li className="flex gap-2">
                          <Badge className="bg-islamic-green self-start mt-1">Patience</Badge>
                          <span>Especially beneficial during challenging parenting moments, times of stress, or when needing guidance.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="how" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>How to Recite Effectively</CardTitle>
                      <CardDescription>
                        Best practices for making your duas impactful
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4 list-decimal pl-5">
                        <li>Begin with praise of Allah (Alhamdulillah).</li>
                        <li>Recite with understanding - reflect on the meaning of what you're saying.</li>
                        <li>Have certainty that Allah hears and will respond in the best way.</li>
                        <li>Choose appropriate times when duas are especially accepted (during rain, while fasting, between adhan and iqamah).</li>
                        <li>Face the qiblah when possible and raise your hands.</li>
                        <li>End your dua with salawat (sending blessings upon the Prophet Muhammad ﷺ).</li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="teaching" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Teaching Duas to Your Children</CardTitle>
                      <CardDescription>
                        Ways to help your children learn and love these prayers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex flex-col">
                          <span className="font-medium">Start Simple</span>
                          <span>Begin with short, easy-to-memorize duas like "Bismillah" and "Alhamdulillah".</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-medium">Create Routine</span>
                          <span>Associate specific duas with daily activities - before meals, before sleep, etc.</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-medium">Make it Interactive</span>
                          <span>Use hand gestures, visual aids, or simple melodies to make memorization enjoyable.</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-medium">Explain Meanings</span>
                          <span>As they grow older, explain what the words mean in simple terms they can understand.</span>
                        </li>
                        <li className="flex flex-col">
                          <span className="font-medium">Be Consistent</span>
                          <span>Regular practice and your own example will help them internalize these beautiful words.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Dua Card Component
const DuaCard = ({ dua, onCopy }: { dua: Dua; onCopy: (text: string) => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Function to handle audio playback (simulated)
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 5000); // Simulate audio ending after 5 seconds
  };
  
  // Format text for copying
  const getTextToCopy = () => {
    return `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}\n\n${dua.relevance}`;
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-islamic-gold text-islamic-green mb-2">{dua.category}</Badge>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onCopy(getTextToCopy())}
            className="text-islamic-green hover:text-islamic-teal"
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy dua</span>
          </Button>
        </div>
        <CardTitle className="text-islamic-green">{dua.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-6">
          <div className="text-right">
            <p className="text-xl font-decorative mb-2 text-islamic-green">{dua.arabic}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleAudio}
              className="text-xs"
            >
              {isPlaying ? (
                <>
                  <VolumeX className="h-3 w-3 mr-1" /> Stop Audio
                </>
              ) : (
                <>
                  <Volume2 className="h-3 w-3 mr-1" /> Play Audio
                </>
              )}
            </Button>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Transliteration</h4>
            <p className="italic">{dua.transliteration}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Translation</h4>
            <p>{dua.translation}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Relevance for Fathers</h4>
            <p className="text-sm text-gray-600">{dua.relevance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Duas;

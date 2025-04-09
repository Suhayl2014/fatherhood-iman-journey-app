
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BookMarked, PencilLine, Star, Calendar, Check, Search } from "lucide-react";

// Sample journal entries
const sampleEntries = [
  {
    id: '1',
    date: '2025-04-06',
    title: "First Time at the Mosque",
    content: "Today I took Ahmed to the mosque for Jummah prayer for the first time. He's only 2, but I want him to start feeling comfortable in the masjid environment early. He was curious about everything - the wudu area, the prayer rugs, the mimbar. During the khutbah, he was surprisingly calm for the first 15 minutes before getting restless. A kind elderly man sitting next to us gave him a small toy to keep him occupied. I felt proud watching him observe others praying and trying to imitate the movements. These early experiences will help build his Islamic identity.",
    mood: "Proud",
    gratitude: "The community's patience with children at the mosque",
    tags: ["milestone", "spiritual"]
  },
  {
    id: '2',
    date: '2025-04-05',
    title: "Bedtime Dua Routine",
    content: "We've been consistent with our bedtime dua routine for a week now, and tonight Layla recited part of it with me! I've been teaching her 'Bismika Allahumma amootu wa ahya' before sleep each night. Hearing her tiny voice trying to form the Arabic words filled my heart with joy. I explained to her that these words mean we're asking Allah to protect us while we sleep and when we wake up. She seemed to understand at her level. Need to think about which short dua to teach her next - maybe the one for entering the bathroom since we're working on potty training.",
    mood: "Joyful",
    gratitude: "The gift of passing down faith to my children",
    tags: ["learning", "duas"]
  }
];

const Journal = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState(sampleEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New entry form state
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '',
    gratitude: '',
    tags: ''
  });
  
  // Handle new entry form change
  const handleEntryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving an entry
    setTimeout(() => {
      const newJournalEntry = {
        id: `${entries.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        title: newEntry.title,
        content: newEntry.content,
        mood: newEntry.mood,
        gratitude: newEntry.gratitude,
        tags: newEntry.tags.split(',').map(tag => tag.trim())
      };
      
      setEntries([newJournalEntry, ...entries]);
      setNewEntry({
        title: '',
        content: '',
        mood: '',
        gratitude: '',
        tags: ''
      });
      
      toast({
        title: "Journal Entry Saved",
        description: "Your reflection has been saved successfully.",
        duration: 3000,
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Filter entries based on search term
  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-islamic-teal text-white py-12">
          <div className="container-app">
            <div className="flex items-center justify-center mb-6">
              <BookMarked className="h-12 w-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">Fatherhood Journal</h1>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              Record your journey as a Muslim father, capture precious moments, and reflect on your spiritual growth.
            </p>
          </div>
        </section>
        
        {/* Journal Tabs */}
        <section className="py-12">
          <div className="container-app">
            <Tabs defaultValue="entries" className="w-full">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="entries">
                    <BookMarked className="mr-2 h-4 w-4" />
                    Journal Entries
                  </TabsTrigger>
                  <TabsTrigger value="write">
                    <PencilLine className="mr-2 h-4 w-4" />
                    Write New Entry
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="entries">
                <div className="mb-6">
                  <div className="relative w-full max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search your journal entries..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-600">No entries found</h3>
                    <p className="mt-2 text-gray-500">
                      {searchTerm ? "Try a different search term" : "Start writing your first journal entry"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredEntries.map(entry => (
                      <Card key={entry.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-islamic-teal" />
                              <p className="text-sm text-gray-500">
                                {new Date(entry.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-islamic-gold" />
                              <p className="text-sm text-gray-500">{entry.mood}</p>
                            </div>
                          </div>
                          <CardTitle className="text-islamic-green">{entry.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="whitespace-pre-line">{entry.content}</p>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Gratitude:</h4>
                            <p className="text-sm italic text-gray-600">{entry.gratitude}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {entry.tags.map((tag, index) => (
                              <Badge key={index} tag={tag} />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="write">
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-islamic-green">New Journal Entry</CardTitle>
                    <CardDescription>
                      Reflect on your experiences, challenges, and joys as a Muslim father
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Give your entry a title"
                          value={newEntry.title}
                          onChange={handleEntryChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium mb-1">Reflection</label>
                        <Textarea
                          id="content"
                          name="content"
                          placeholder="What happened today? What challenges or joys did you experience as a father?"
                          className="min-h-[200px] resize-none"
                          value={newEntry.content}
                          onChange={handleEntryChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="mood" className="block text-sm font-medium mb-1">How are you feeling?</label>
                          <Input
                            id="mood"
                            name="mood"
                            placeholder="e.g., Grateful, Challenged, Blessed"
                            value={newEntry.mood}
                            onChange={handleEntryChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="gratitude" className="block text-sm font-medium mb-1">What are you grateful for?</label>
                          <Input
                            id="gratitude"
                            name="gratitude"
                            placeholder="Something you're thankful for today"
                            value={newEntry.gratitude}
                            onChange={handleEntryChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                        <Input
                          id="tags"
                          name="tags"
                          placeholder="e.g., milestone, challenge, spiritual, learning"
                          value={newEntry.tags}
                          onChange={handleEntryChange}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={!newEntry.title || !newEntry.content || isSubmitting}
                        className="bg-islamic-teal hover:bg-islamic-green"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            Saving <span className="ml-2 animate-spin">⏳</span>
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Save Entry <Check className="ml-1 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 bg-islamic-cream">
          <div className="container-app">
            <h2 className="text-2xl font-bold mb-8 text-islamic-green text-center">Benefits of Journaling</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-islamic-teal">Spiritual Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-teal/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-teal" />
                      </div>
                      <span>Track your development as a spiritual guide for your family</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-teal/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-teal" />
                      </div>
                      <span>Notice patterns in your connection with Allah through parenting</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-teal/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-teal" />
                      </div>
                      <span>Reflect on how you're implementing Islamic values in your parenting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-islamic-green">Emotional Wellbeing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-green/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-green" />
                      </div>
                      <span>Process emotions in a healthy, reflective way</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-green/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-green" />
                      </div>
                      <span>Reduce stress by expressing challenges and fears</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-green/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-green" />
                      </div>
                      <span>Cultivate gratitude, which is essential in Islamic practice</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-islamic-blue">Legacy Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-blue/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-blue" />
                      </div>
                      <span>Create a record of your child's development and milestones</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-blue/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-blue" />
                      </div>
                      <span>Document family traditions and how you implement faith</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 bg-islamic-blue/10 rounded-full p-1">
                        <Check className="h-3 w-3 text-islamic-blue" />
                      </div>
                      <span>Build a collection of wisdom to pass down to your children</span>
                    </li>
                  </ul>
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

// Badge component for tags
const Badge = ({ tag }: { tag: string }) => {
  const getColor = () => {
    switch (tag.toLowerCase()) {
      case 'milestone':
        return 'bg-green-100 text-green-800';
      case 'spiritual':
        return 'bg-purple-100 text-purple-800';
      case 'challenge':
        return 'bg-orange-100 text-orange-800';
      case 'learning':
        return 'bg-blue-100 text-blue-800';
      case 'duas':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getColor()}`}>
      {tag}
    </span>
  );
};

export default Journal;

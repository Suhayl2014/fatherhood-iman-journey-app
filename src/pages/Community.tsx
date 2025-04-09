
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Calendar, ChevronUp, ChevronDown, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample community discussions
const sampleDiscussions = [
  {
    id: '1',
    author: 'Ibrahim A.',
    title: "Balancing work and quality time with children",
    content: "As a software engineer, I often find myself working long hours. How do other fathers balance demanding jobs with being present for their children? I want to ensure I'm fulfilling my responsibility as a father while also providing financially.",
    date: '2 days ago',
    category: 'Work-Life Balance',
    replies: 8,
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    author: 'Yusuf M.',
    title: "Teaching children about prayer",
    content: "My son is 4 years old, and I'd like to start introducing him to salah in a way that's engaging and not overwhelming. What approaches have worked for other fathers? I remember my own father was quite strict about it, but I want to foster a love for prayer rather than make it feel like a chore.",
    date: '5 days ago',
    category: 'Islamic Education',
    replies: 15,
    likes: 23,
    isLiked: false
  },
  {
    id: '3',
    author: 'Ahmad K.',
    title: "Dealing with non-Muslim environments",
    content: "My children attend a public school where they're often the only Muslims in their class. They sometimes come home confused about things they hear that conflict with our Islamic values. How do other fathers handle this situation while building their children's confidence in their identity?",
    date: '1 week ago',
    category: 'Cultural Challenges',
    replies: 21,
    likes: 34,
    isLiked: false
  },
];

// Sample upcoming events
const sampleEvents = [
  {
    id: '1',
    title: "Fatherhood Circle: Monthly Meeting",
    description: "Join our monthly gathering of Muslim fathers to discuss challenges, share experiences, and support one another in the journey of fatherhood.",
    date: "April 15, 2025",
    time: "7:00 PM - 8:30 PM",
    location: "Masjid Al-Iman Community Hall",
    category: "Discussion Group"
  },
  {
    id: '2',
    title: "Father-Child Outdoor Activity Day",
    description: "A day of outdoor activities designed for fathers and their children to strengthen bonds through play, exploration, and shared experiences.",
    date: "April 20, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Greenwood Park",
    category: "Activity"
  },
  {
    id: '3',
    title: "Workshop: Islamic Financial Planning for Families",
    description: "Learn about managing family finances in accordance with Islamic principles, including saving for children's education, halal investments, and wealth distribution.",
    date: "May 5, 2025",
    time: "6:30 PM - 8:30 PM",
    location: "Islamic Center Conference Room",
    category: "Workshop"
  }
];

const Community = () => {
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState(sampleDiscussions);
  const [events, setEvents] = useState(sampleEvents);
  
  // New discussion form state
  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    content: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle discussion form change
  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle discussion form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate posting a discussion
    setTimeout(() => {
      const newDiscussion = {
        id: `${discussions.length + 1}`,
        author: 'You',
        title: newPost.title,
        content: newPost.content,
        date: 'Just now',
        category: newPost.category || 'General',
        replies: 0,
        likes: 0,
        isLiked: false
      };
      
      setDiscussions([newDiscussion, ...discussions]);
      setNewPost({
        title: '',
        category: '',
        content: ''
      });
      
      toast({
        title: "Post Published",
        description: "Your discussion has been posted to the community.",
        duration: 3000,
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Handle like discussion
  const handleLike = (id: string) => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === id) {
        const newLikes = discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1;
        return {
          ...discussion,
          likes: newLikes,
          isLiked: !discussion.isLiked
        };
      }
      return discussion;
    }));
  };
  
  // Handle register for event
  const handleRegisterEvent = (id: string) => {
    toast({
      title: "Registration Successful",
      description: "You've been registered for this event. Check your email for details.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-islamic-blue text-white py-12">
          <div className="container-app">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">Father's Community</h1>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              Connect with other Muslim fathers, share experiences, seek advice, and support one another in the beautiful journey of fatherhood.
            </p>
          </div>
        </section>
        
        {/* Community Content */}
        <section className="py-12">
          <div className="container-app">
            <Tabs defaultValue="discussions" className="w-full">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="discussions">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Discussions
                  </TabsTrigger>
                  <TabsTrigger value="events">
                    <Calendar className="mr-2 h-4 w-4" />
                    Events
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="discussions">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column - Start Discussion */}
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-islamic-green">Start a Discussion</CardTitle>
                        <CardDescription>
                          Share your questions, challenges, or insights with other fathers
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                            <Input
                              id="title"
                              name="title"
                              placeholder="What's on your mind?"
                              value={newPost.title}
                              onChange={handlePostChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                            <Input
                              id="category"
                              name="category"
                              placeholder="e.g., Parenting, Education, Faith"
                              value={newPost.category}
                              onChange={handlePostChange}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="content" className="block text-sm font-medium mb-1">Your Post</label>
                            <Textarea
                              id="content"
                              name="content"
                              placeholder="Share your thoughts, questions, or experiences..."
                              className="min-h-[150px] resize-none"
                              value={newPost.content}
                              onChange={handlePostChange}
                              required
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            type="submit" 
                            className="w-full bg-islamic-green"
                            disabled={isSubmitting || !newPost.title || !newPost.content}
                          >
                            {isSubmitting ? "Posting..." : "Post Discussion"}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                    
                    {/* Community Guidelines */}
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="text-islamic-teal">Community Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-islamic-teal">Respect & Brotherhood</h4>
                          <p className="text-sm">Treat all members with respect and kindness, as the Prophet Muhammad (peace be upon him) taught us.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-islamic-teal">Constructive Discussions</h4>
                          <p className="text-sm">Focus on providing helpful advice and support rather than criticism.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-islamic-teal">Privacy</h4>
                          <p className="text-sm">Respect the privacy of your family and others when sharing experiences.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-islamic-teal">Islamic Etiquette</h4>
                          <p className="text-sm">Adhere to Islamic principles in your interactions and advice.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Right Column - Discussions List */}
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-islamic-green">Recent Discussions</h2>
                    
                    <div className="space-y-6">
                      {discussions.map((discussion) => (
                        <DiscussionCard 
                          key={discussion.id} 
                          discussion={discussion} 
                          onLike={() => handleLike(discussion.id)} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="events">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column - Events Info */}
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-islamic-green">Community Events</CardTitle>
                        <CardDescription>
                          Connect with other Muslim fathers in person through our regular events
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>
                          Our community events provide opportunities to build brotherhood, learn from each other, and create meaningful connections with other Muslim fathers.
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-islamic-teal">Why Attend?</h4>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Build relationships with like-minded fathers</li>
                            <li>Share experiences and learn from others</li>
                            <li>Find support for common challenges</li>
                            <li>Strengthen your parenting with Islamic principles</li>
                            <li>Create positive memories with your children</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-islamic-teal">Suggest an Event</h4>
                          <p className="text-sm">
                            Have an idea for a community event? Email us at events@imanjourney.com with your suggestion.
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-islamic-green">
                          Subscribe to Event Updates
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  {/* Right Column - Events List */}
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-islamic-green">Upcoming Events</h2>
                    
                    <div className="space-y-6">
                      {events.map((event) => (
                        <EventCard 
                          key={event.id} 
                          event={event} 
                          onRegister={() => handleRegisterEvent(event.id)} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 bg-islamic-cream">
          <div className="container-app">
            <h2 className="text-2xl font-bold mb-8 text-islamic-green text-center">Community Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="italic text-gray-700">
                      "This community has been a lifeline for me as a new father. The advice from other Muslim dads helped me navigate those challenging first months with confidence and Islamic guidance."
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-islamic-teal flex items-center justify-center mr-3">
                      <span className="text-white font-medium">SA</span>
                    </div>
                    <div>
                      <p className="font-medium">Sami A.</p>
                      <p className="text-sm text-gray-500">Father of 2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="italic text-gray-700">
                      "The father-child events organized by this community have created beautiful memories for me and my son. It's wonderful to see him connect with other Muslim children while I build brotherhood with their fathers."
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-islamic-green flex items-center justify-center mr-3">
                      <span className="text-white font-medium">MT</span>
                    </div>
                    <div>
                      <p className="font-medium">Mohammed T.</p>
                      <p className="text-sm text-gray-500">Father of 1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="italic text-gray-700">
                      "As a convert, I had so many questions about raising my children with Islamic values. The discussions and resources from this community provided me with knowledge, support, and confidence."
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-islamic-blue flex items-center justify-center mr-3">
                      <span className="text-white font-medium">JK</span>
                    </div>
                    <div>
                      <p className="font-medium">James K.</p>
                      <p className="text-sm text-gray-500">Father of 3</p>
                    </div>
                  </div>
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

// Discussion Card Component
const DiscussionCard = ({ discussion, onLike }: { discussion: any; onLike: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge category={discussion.category} />
          <p className="text-sm text-gray-500">{discussion.date}</p>
        </div>
        <CardTitle className="text-islamic-green">{discussion.title}</CardTitle>
        <CardDescription>Posted by {discussion.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className={`${isExpanded ? '' : 'line-clamp-3'}`}>
          {discussion.content}
        </p>
        {discussion.content.length > 300 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-islamic-teal hover:text-islamic-green text-sm font-medium mt-2 flex items-center"
          >
            {isExpanded ? (
              <>Show less <ChevronUp className="ml-1 h-4 w-4" /></>
            ) : (
              <>Read more <ChevronDown className="ml-1 h-4 w-4" /></>
            )}
          </button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={`flex items-center ${discussion.isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart className={`h-4 w-4 mr-1 ${discussion.isLiked ? 'fill-current' : ''}`} />
            <span>{discussion.likes}</span>
          </Button>
          
          <div className="flex items-center text-gray-500">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{discussion.replies} replies</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm">
          Reply
        </Button>
      </CardFooter>
    </Card>
  );
};

// Event Card Component
const EventCard = ({ event, onRegister }: { event: any; onRegister: () => void }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge category={event.category} />
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium text-islamic-green">{event.date}</p>
            <p className="text-xs text-gray-500">{event.time}</p>
          </div>
        </div>
        <CardTitle className="text-islamic-green">{event.title}</CardTitle>
        <CardDescription>{event.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onRegister} className="bg-islamic-green">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

// Badge Component
const Badge = ({ category }: { category: string }) => {
  const getColor = () => {
    switch (category.toLowerCase()) {
      case 'islamic education':
      case 'workshop':
        return 'bg-islamic-teal/10 text-islamic-teal';
      case 'work-life balance':
      case 'discussion group':
        return 'bg-islamic-green/10 text-islamic-green';
      case 'cultural challenges':
      case 'activity':
        return 'bg-islamic-blue/10 text-islamic-blue';
      case 'parenting':
      case 'support':
        return 'bg-islamic-gold/10 text-islamic-gold';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColor()}`}>
      {category}
    </span>
  );
};

export default Community;

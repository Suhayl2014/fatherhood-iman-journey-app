import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Calendar, ChevronUp, ChevronDown, Heart, Send, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// Define interfaces for better type safety
interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface Discussion {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  category: string;
  replies: number;
  likes: number;
  isLiked: boolean;
  replyList: Reply[];
}

// Sample upcoming events
const sampleEvents = [];

const Community = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [events, setEvents] = useState(sampleEvents);
  const [isLoading, setIsLoading] = useState(true);
  
  // New discussion form state
  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    content: '',
    isAnonymous: false
  });
  
  const categories = [
    "Parenting",
    "Islamic Education",
    "Work-Life Balance",
    "Family Life",
    "Mental Health",
    "Other"
  ];
  
  // Filter and pagination state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  
  // Reply state
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isAnonymousReply, setIsAnonymousReply] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch discussions from Supabase
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setIsLoading(true);
        
        // Fetch discussions
        const { data: discussionsData, error: discussionsError } = await supabase
          .from('discussions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (discussionsError) {
          // Check if the error is due to missing tables
          if (discussionsError.code === '42P01') {
            console.log('Database tables not set up yet. Please run the SQL schema in your Supabase project.');
            // Set empty discussions array instead of showing error
            setDiscussions([]);
            return;
          }
          throw discussionsError;
        }
        
        // Fetch replies for each discussion
        const discussionsWithReplies = await Promise.all(
          discussionsData.map(async (discussion) => {
            const { data: repliesData, error: repliesError } = await supabase
              .from('replies')
              .select('*')
              .eq('discussion_id', discussion.id)
              .order('created_at', { ascending: true });
            
            if (repliesError) {
              // If replies table doesn't exist, just continue with empty replies
              if (repliesError.code === '42P01') {
                return {
                  id: discussion.id,
                  author: discussion.is_anonymous ? 'Anonymous' : discussion.author_name || 'Anonymous',
                  title: discussion.title,
                  content: discussion.content,
                  date: formatDate(discussion.created_at),
                  category: discussion.category || 'General',
                  replies: 0,
                  likes: discussion.likes || 0,
                  isLiked: false,
                  replyList: []
                };
              }
              throw repliesError;
            }
            
            // Format the discussion data
            return {
              id: discussion.id,
              author: discussion.is_anonymous ? 'Anonymous' : discussion.author_name || 'Anonymous',
              title: discussion.title,
              content: discussion.content,
              date: formatDate(discussion.created_at),
              category: discussion.category || 'General',
              replies: repliesData.length,
              likes: discussion.likes || 0,
              isLiked: false, // This would need to be tracked per user
              replyList: repliesData.map(reply => ({
                id: reply.id,
                author: reply.is_anonymous ? 'Anonymous' : reply.author_name || 'Anonymous',
                content: reply.content,
                date: formatDate(reply.created_at)
              }))
            };
          })
        );
        
        setDiscussions(discussionsWithReplies);
      } catch (error) {
        console.error('Error fetching discussions:', error);
        toast({
          title: "Error",
          description: "Failed to load discussions. Please try again later.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDiscussions();
  }, [toast]);
  
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Filter discussions based on selected category
  const filteredDiscussions = selectedCategory && selectedCategory !== "all"
    ? discussions.filter(discussion => discussion.category === selectedCategory)
    : discussions;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredDiscussions.length / itemsPerPage);
  const paginatedDiscussions = filteredDiscussions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle category filter change
  const handleFilterChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  // Handle discussion form change
  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setNewPost(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setNewPost(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleCategoryChange = (value: string) => {
    setNewPost(prev => ({
      ...prev,
      category: value
    }));
  };
  
  // Handle discussion form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert the discussion into Supabase
      const { data: discussionData, error: discussionError } = await supabase
        .from('discussions')
        .insert({
          title: newPost.title,
          content: newPost.content,
          category: newPost.category || 'General',
          is_anonymous: newPost.isAnonymous,
          author_name: newPost.isAnonymous ? null : (user?.user_metadata?.full_name || 'Anonymous'),
          author_id: user?.id || null,
          likes: 0
        })
        .select();
      
      if (discussionError) {
        // Check if the error is due to missing tables
        if (discussionError.code === '42P01') {
          toast({
            title: "Database Setup Required",
            description: "The discussions feature is not set up yet. Please contact the administrator.",
            variant: "destructive",
            duration: 5000,
          });
          return;
        }
        throw discussionError;
      }
      
      // Create a new discussion object for the UI
      const newDiscussion: Discussion = {
        id: discussionData[0].id,
        author: newPost.isAnonymous ? 'Anonymous' : (user?.user_metadata?.full_name || 'Anonymous'),
        title: newPost.title,
        content: newPost.content,
        date: 'Just now',
        category: newPost.category || 'General',
        replies: 0,
        likes: 0,
        isLiked: false,
        replyList: []
      };
      
      // Update the discussions state
      setDiscussions(prevDiscussions => [newDiscussion, ...prevDiscussions]);
      
      // Reset the form
      setNewPost({
        title: '',
        category: '',
        content: '',
        isAnonymous: false
      });
      
      // Show success toast
      toast({
        title: "Post Published",
        description: "Your discussion has been posted to the community.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error posting discussion:', error);
      toast({
        title: "Error",
        description: "There was a problem posting your discussion. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle like discussion
  const handleLike = async (id: string) => {
    try {
      // Find the discussion to get its current likes
      const discussion = discussions.find(d => d.id === id);
      if (!discussion) return;
      
      const newLikes = discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1;
      
      // Update likes in Supabase
      const { error } = await supabase
        .from('discussions')
        .update({ likes: newLikes })
        .eq('id', id);
      
      if (error) {
        // Check if the error is due to missing tables
        if (error.code === '42P01') {
          toast({
            title: "Database Setup Required",
            description: "The likes feature is not set up yet. Please contact the administrator.",
            variant: "destructive",
            duration: 5000,
          });
          return;
        }
        throw error;
      }
      
      // Update the local state
      setDiscussions(prev => prev.map(discussion => {
        if (discussion.id === id) {
          return {
            ...discussion,
            likes: newLikes,
            isLiked: !discussion.isLiked
          };
        }
        return discussion;
      }));
    } catch (error) {
      console.error('Error updating likes:', error);
      toast({
        title: "Error",
        description: "Failed to update likes. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  // Handle reply submission
  const handleReplySubmit = async (discussionId: string) => {
    if (!replyContent.trim()) return;
    
    try {
      // Insert the reply into Supabase
      const { data: replyData, error: replyError } = await supabase
        .from('replies')
        .insert({
          discussion_id: discussionId,
          content: replyContent,
          is_anonymous: isAnonymousReply,
          author_name: isAnonymousReply ? null : (user?.user_metadata?.full_name || 'Anonymous'),
          author_id: user?.id || null
        })
        .select();
      
      if (replyError) {
        // Check if the error is due to missing tables
        if (replyError.code === '42P01') {
          toast({
            title: "Database Setup Required",
            description: "The replies feature is not set up yet. Please contact the administrator.",
            variant: "destructive",
            duration: 5000,
          });
          return;
        }
        throw replyError;
      }
      
      // Create a new reply object for the UI
      const newReply: Reply = {
        id: replyData[0].id,
        author: isAnonymousReply ? 'Anonymous' : (user?.user_metadata?.full_name || 'Anonymous'),
        content: replyContent,
        date: 'Just now'
      };
      
      // Update the discussions state
      setDiscussions(prev => prev.map(discussion => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            replies: discussion.replies + 1,
            replyList: [...discussion.replyList, newReply]
          };
        }
        return discussion;
      }));
      
      // Reset the reply form
      setReplyContent('');
      setReplyingTo(null);
      setIsAnonymousReply(false);
      
      // Show success toast
      toast({
        title: "Reply Posted",
        description: "Your reply has been added to the discussion.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error posting reply:', error);
      toast({
        title: "Error",
        description: "There was a problem posting your reply. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
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
                            <Select value={newPost.category} onValueChange={handleCategoryChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                          
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="isAnonymous"
                              name="isAnonymous"
                              checked={newPost.isAnonymous}
                              onChange={handlePostChange}
                              className="h-2.5 w-2.5 rounded border-gray-300 text-islamic-green focus:ring-islamic-green"
                            />
                            <label htmlFor="isAnonymous" className="text-sm text-gray-600">
                              Post anonymously
                            </label>
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
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-islamic-green">Recent Discussions</h2>
                      {discussions.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Filter className="h-4 w-4 text-gray-500" />
                          <Select value={selectedCategory} onValueChange={handleFilterChange}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      {isLoading ? (
                        <Card>
                          <CardContent className="py-8 text-center">
                            <p className="text-gray-600">Loading discussions...</p>
                          </CardContent>
                        </Card>
                      ) : discussions.length === 0 ? (
                        <Card>
                          <CardContent className="py-8 text-center">
                            <p className="text-gray-600">
                              Be the first to start a discussion! Share your experiences, ask questions, or seek advice from other Muslim fathers. Your insights could help someone else on their journey.
                            </p>
                          </CardContent>
                        </Card>
                      ) : (
                        <>
                          <Card>
                            <CardContent className="py-4">
                              <p className="text-gray-600 text-center">
                                Join the conversation! Share your thoughts, experiences, and advice. Together, we can support and learn from each other in our journey of fatherhood.
                              </p>
                            </CardContent>
                          </Card>
                          {paginatedDiscussions.map((discussion) => (
                            <DiscussionCard 
                              key={discussion.id} 
                              discussion={discussion} 
                              onLike={() => handleLike(discussion.id)}
                              replyContent={replyContent}
                              setReplyContent={setReplyContent}
                              isAnonymousReply={isAnonymousReply}
                              setIsAnonymousReply={setIsAnonymousReply}
                              handleReplySubmit={handleReplySubmit}
                            />
                          ))}
                          
                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="flex justify-center mt-6 space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </Button>
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                  key={page}
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handlePageChange(page)}
                                  className={currentPage === page ? "bg-islamic-green" : ""}
                                >
                                  {page}
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </Button>
                            </div>
                          )}
                        </>
                      )}
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
                          Connect with other Muslim fathers through our regular in-person and online events
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">
                          Want to register your event? Email us at{' '}
                          <a href="mailto:info@TheModernMuslimDad.co.uk" className="text-islamic-green hover:text-islamic-teal">
                            info@TheModernMuslimDad.co.uk
                          </a>
                        </p>
                        <p className="text-sm text-gray-500">
                          Our community events provide opportunities to build brotherhood, learn from each other, and create meaningful connections with other Muslim fathers.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Right Column - Events List */}
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-islamic-green">Upcoming Events</h2>
                    <div className="text-center py-8">
                      <p className="text-gray-600">
                        No upcoming events at the moment. Check back soon for new events!
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Discussion Card Component
const DiscussionCard = ({ 
  discussion, 
  onLike,
  replyContent,
  setReplyContent,
  isAnonymousReply,
  setIsAnonymousReply,
  handleReplySubmit
}: { 
  discussion: Discussion; 
  onLike: () => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  isAnonymousReply: boolean;
  setIsAnonymousReply: (isAnonymous: boolean) => void;
  handleReplySubmit: (discussionId: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  
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
        
        {/* Display Replies */}
        {discussion.replyList && discussion.replyList.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-islamic-teal hover:text-islamic-green text-sm font-medium flex items-center"
            >
              {showReplies ? (
                <>Hide {discussion.replies} replies <ChevronUp className="ml-1 h-4 w-4" /></>
              ) : (
                <>View {discussion.replies} replies <ChevronDown className="ml-1 h-4 w-4" /></>
              )}
            </button>
            
            {showReplies && (
              <div className="mt-3 space-y-3 pl-4 border-l-2 border-islamic-teal/20">
                {discussion.replyList.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">{reply.author}</p>
                      <p className="text-xs text-gray-500">{reply.date}</p>
                    </div>
                    <p className="text-sm mt-1">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 space-y-3">
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`anonymous-reply-${discussion.id}`}
                  checked={isAnonymousReply}
                  onChange={(e) => setIsAnonymousReply(e.target.checked)}
                  className="h-2.5 w-2.5 rounded border-gray-300 text-islamic-green focus:ring-islamic-green"
                />
                <label htmlFor={`anonymous-reply-${discussion.id}`} className="text-sm text-gray-600">
                  Reply anonymously
                </label>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyContent('');
                    setIsAnonymousReply(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-islamic-green"
                  onClick={() => {
                    if (replyContent.trim()) {
                      handleReplySubmit(discussion.id);
                      setShowReplyForm(false);
                    }
                  }}
                  disabled={!replyContent.trim()}
                >
                  <Send className="h-4 w-4 mr-1" />
                  Post Reply
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={onLike}
              className="flex items-center space-x-1 text-gray-500 hover:text-islamic-green"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm">{discussion.likes}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-gray-500 hover:text-islamic-green"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">Reply</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Badge Component
const Badge = ({ category }: { category: string }) => {
  const getColor = () => {
    switch (category) {
      case 'Parenting':
        return 'bg-blue-100 text-blue-800';
      case 'Islamic Education':
        return 'bg-green-100 text-green-800';
      case 'Work-Life Balance':
        return 'bg-purple-100 text-purple-800';
      case 'Family Life':
        return 'bg-pink-100 text-pink-800';
      case 'Mental Health':
        return 'bg-yellow-100 text-yellow-800';
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

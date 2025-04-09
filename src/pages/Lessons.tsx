import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { lessons, Lesson } from '@/data/lessons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, BookOpen } from "lucide-react";

const Lessons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories for filtering
  const categories = Array.from(new Set(lessons.map(lesson => lesson.category)));
  
  // Filter lessons based on search term and category
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory ? lesson.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-islamic-teal text-white py-12">
          <div className="container-app">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">Islamic Parenting Lessons</h1>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              Explore bite-sized lessons on Islamic parenting principles, practical wisdom, and spiritual guidance for Muslim fathers.
            </p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="container-app">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative w-full max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search lessons..."
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
        
        {/* Lessons Grid */}
        <section className="py-12">
          <div className="container-app">
            {filteredLessons.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No lessons found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Lesson Card Component
const LessonCard = ({ lesson }: { lesson: Lesson }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-islamic-teal mb-2">{lesson.category}</Badge>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{lesson.duration}</span>
          </div>
        </div>
        <CardTitle className="text-islamic-green">{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className={`prose prose-sm max-w-none ${isExpanded ? '' : 'line-clamp-4'}`}>
          <p>{lesson.content}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-islamic-teal hover:text-islamic-green p-0 hover:bg-transparent"
        >
          {isExpanded ? "Show less" : "Read more"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Lessons;

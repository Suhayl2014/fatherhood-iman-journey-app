import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send thank you email (this would be handled by your backend)
      // For now, we'll just show a success message
      toast({
        title: "Thank you for joining our waitlist!",
        description: "We've sent you a confirmation email with more details.",
        duration: 5000,
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-islamic-green" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-9 bg-white text-gray-900 placeholder:text-gray-500 border-islamic-green/20 focus:border-islamic-green"
          required
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-islamic-green hover:bg-islamic-green/90 text-white"
      >
        {isLoading ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  );
} 
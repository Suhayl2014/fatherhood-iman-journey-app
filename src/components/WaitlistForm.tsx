import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if email already exists
      const { data: existingEntry, error: selectError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('Error checking if email exists:', selectError);
        throw selectError;
      }

      if (existingEntry) {
        toast({
          title: "You're already on our waitlist!",
          description: "We'll notify you when we launch.",
          duration: 5000,
        });
        setEmail('');
        return;
      }

      // Add email to waitlist
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([
          { 
            email,
            status: 'pending'
          }
        ]);

      if (insertError) {
        console.error('Error adding to waitlist:', insertError);
        throw insertError;
      }

      // Send welcome email using Supabase Edge Function
      const { error: emailError } = await supabase.functions.invoke('send-waitlist-email', {
        body: { email }
      });

      if (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't throw the error, just log it - we still want to show success for waitlist signup
      }

      toast({
        title: "Thank you for joining our waitlist!",
        description: "We've sent you a confirmation email with more details.",
        duration: 5000,
      });
      
      setEmail('');
    } catch (error: any) {
      console.error('Error adding to waitlist:', error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
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
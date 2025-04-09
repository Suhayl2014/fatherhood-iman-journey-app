
import { useState, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const JournalEntry = () => {
  const { toast } = useToast();
  const [entry, setEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving an entry
    setTimeout(() => {
      toast({
        title: "Journal Entry Saved",
        description: "Your reflection has been saved successfully.",
        duration: 3000,
      });
      setEntry('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="overflow-hidden border-islamic-teal/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-islamic-teal">Today's Reflection</CardTitle>
        <CardDescription>
          Take a moment to reflect on your journey as a father today.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="What moments with your child brought you joy today? What challenges did you face as a father?"
            className="min-h-[120px] resize-none"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!entry.trim() || isSubmitting}
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
  );
};

export default JournalEntry;

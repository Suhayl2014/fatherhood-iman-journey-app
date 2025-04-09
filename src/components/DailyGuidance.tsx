
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, BookmarkPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DailyGuidanceProps {
  title: string;
  subtitle: string;
  content: string;
  source: string;
}

const DailyGuidance = ({ title, subtitle, content, source }: DailyGuidanceProps) => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved items" : "Saved successfully",
      description: isSaved ? 
        "This guidance has been removed from your saved items." : 
        "This guidance has been added to your saved items.",
      duration: 3000,
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: content,
      })
      .catch(() => {
        toast({
          title: "Sharing not available",
          description: "The share functionality isn't available on your device.",
          variant: "destructive",
        });
      });
    } else {
      navigator.clipboard.writeText(`${title}\n\n${content}\n\n- ${source}`);
      toast({
        title: "Copied to clipboard",
        description: "The guidance content has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="overflow-hidden bg-islamic-green text-white">
      <CardHeader className="pb-2 border-b border-white/20">
        <CardTitle className="text-islamic-cream">{title}</CardTitle>
        <CardDescription className="text-islamic-sand">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4 text-lg">{content}</p>
        <p className="text-islamic-sand text-sm italic">- {source}</p>
      </CardContent>
      <CardFooter className="border-t border-white/20 pt-4 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSave}
          className="text-islamic-sand hover:text-islamic-cream hover:bg-islamic-teal"
        >
          <BookmarkPlus className="mr-1 h-4 w-4" />
          {isSaved ? "Saved" : "Save"}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleShare}
          className="text-islamic-sand hover:text-islamic-cream hover:bg-islamic-teal"
        >
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyGuidance;

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Lightbulb, BookOpen, Heart } from 'lucide-react';

interface DailyMessage {
  type: 'tip' | 'hadith' | 'reminder';
  content: string;
  source?: string;
}

const messages: DailyMessage[] = [
  {
    type: 'hadith',
    content: "The Prophet (ﷺ) said: 'He is not of us who does not have mercy on our young children, or does not respect our elders.'",
    source: "Tirmidhi"
  },
  {
    type: 'tip',
    content: "Try reading a short surah with your child before bedtime. Even if they're too young to understand, the sound of Quranic recitation soothes their soul."
  },
  {
    type: 'reminder',
    content: "Remember to say 'Bismillah' before activities with your child. This simple act teaches them to begin everything in Allah's name."
  },
  {
    type: 'hadith',
    content: "The Prophet (ﷺ) said: 'The best of you are those who are best to their families.'",
    source: "Tirmidhi"
  },
  {
    type: 'tip',
    content: "Create a special 'Islamic corner' in your home where you can pray and read Quran together as a family."
  },
  {
    type: 'reminder',
    content: "Take a moment today to express gratitude to Allah for the blessing of your children."
  },
  {
    type: 'hadith',
    content: "The Prophet (ﷺ) said: 'No father has given a greater gift to his children than good moral training.'",
    source: "Tirmidhi"
  },
  {
    type: 'tip',
    content: "Start teaching your child simple duas like the dua before eating or sleeping."
  },
  {
    type: 'reminder',
    content: "Your child learns more from your actions than your words. Be mindful of your behavior around them."
  },
  {
    type: 'hadith',
    content: "The Prophet (ﷺ) said: 'When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.'",
    source: "Muslim"
  }
];

const DailyBanner = () => {
  const [message, setMessage] = useState<DailyMessage | null>(null);

  useEffect(() => {
    // Get today's date as a number (0-9) to select a message
    const today = new Date().getDate() % messages.length;
    setMessage(messages[today]);
  }, []);

  if (!message) return null;

  const getIcon = () => {
    switch (message.type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-islamic-green" />;
      case 'hadith':
        return <BookOpen className="h-5 w-5 text-islamic-green" />;
      case 'reminder':
        return <Heart className="h-5 w-5 text-islamic-green" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-8 bg-islamic-green/5 border-islamic-green/20">
      <div className="p-4 flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div>
          <p className="text-sm text-gray-700">{message.content}</p>
          {message.source && (
            <p className="text-xs text-gray-500 mt-1">Source: {message.source}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DailyBanner; 
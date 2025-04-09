export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  ageGroup: AgeGroup;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export type AgeGroup = 
  | 'Pre-Birth'
  | '0-6 Months'
  | '6-12 Months'
  | '1-2 Years'
  | '3-4 Years'
  | '5-6 Years'
  | '6-7 Years'
  | '7+ Years';

export const AGE_GROUPS: AgeGroup[] = [
  'Pre-Birth',
  '0-6 Months',
  '6-12 Months',
  '1-2 Years',
  '3-4 Years',
  '5-6 Years',
  '6-7 Years',
  '7+ Years'
];

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Understanding Islamic Names",
    description: "Learn about the importance and meaning of Islamic names",
    content: "Islamic names carry deep meanings and significance...",
    category: "Islamic Knowledge",
    ageGroup: "Pre-Birth",
    estimatedTime: "15 mins",
    difficulty: "Beginner"
  },
  {
    id: "2",
    title: "Welcoming a New Baby in Islam",
    description: "Essential practices for welcoming a newborn",
    content: "When Allah blesses us with a new child...",
    category: "Islamic Traditions",
    ageGroup: "Pre-Birth",
    estimatedTime: "20 mins",
    difficulty: "Beginner"
  },
  {
    id: "3",
    title: "Early Childhood Duas",
    description: "Essential duas for young children",
    content: "Teaching children duas from an early age...",
    category: "Duas & Dhikr",
    ageGroup: "0-6 Months",
    estimatedTime: "10 mins",
    difficulty: "Beginner"
  },
  {
    id: "4",
    title: "Building Islamic Character",
    description: "Nurturing good character from early years",
    content: "Character development is essential in Islam...",
    category: "Character Building",
    ageGroup: "1-2 Years",
    estimatedTime: "25 mins",
    difficulty: "Intermediate"
  },
  {
    id: "5",
    title: "Teaching Salah to Children",
    description: "Guide to introducing prayer to young ones",
    content: "Prayer is the foundation of our faith...",
    category: "Worship",
    ageGroup: "3-4 Years",
    estimatedTime: "30 mins",
    difficulty: "Intermediate"
  },
  {
    id: "6",
    title: "Quran Learning Basics",
    description: "Introduction to Quran learning for kids",
    content: "Starting Quran education early is important...",
    category: "Quran",
    ageGroup: "5-6 Years",
    estimatedTime: "20 mins",
    difficulty: "Intermediate"
  },
  {
    id: "7",
    title: "Islamic Etiquettes",
    description: "Teaching daily Islamic manners",
    content: "Proper etiquettes are essential in Islam...",
    category: "Manners",
    ageGroup: "6-7 Years",
    estimatedTime: "15 mins",
    difficulty: "Beginner"
  },
  {
    id: "8",
    title: "Understanding Halal and Haram",
    description: "Teaching children about permissible and forbidden",
    content: "Learning to distinguish between halal and haram...",
    category: "Islamic Knowledge",
    ageGroup: "7+ Years",
    estimatedTime: "25 mins",
    difficulty: "Intermediate"
  }
];

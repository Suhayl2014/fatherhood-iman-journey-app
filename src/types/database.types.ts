export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface Child {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
}

export interface ChildMilestone {
  id: string;
  created_at: string;
  child_id: string;
  milestone_id: string;
  completed_date: string;
  notes: string | null;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  notes: string;
  rating: number;
  difficulty: number;
  timeSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface WaitlistEntry {
  id: string;
  created_at: string;
  email: string;
  status: 'pending' | 'contacted' | 'registered';
}

// Define the Database interface to properly type Supabase client operations
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      children: {
        Row: Child;
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          date_of_birth: string;
          gender: 'male' | 'female' | 'other';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          date_of_birth?: string;
          gender?: 'male' | 'female' | 'other';
          created_at?: string;
          updated_at?: string;
        };
      };
      child_milestones: {
        Row: ChildMilestone;
        Insert: {
          id?: string;
          child_id: string;
          milestone_id: string;
          completed_date: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          milestone_id?: string;
          completed_date?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      waitlist: {
        Row: WaitlistEntry;
        Insert: {
          id?: string;
          email: string;
          status?: 'pending' | 'contacted' | 'registered';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          status?: 'pending' | 'contacted' | 'registered';
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

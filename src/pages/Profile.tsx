import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/use-toast';
import { User, CalendarClock, GraduationCap, Heart, Loader2 } from 'lucide-react';

// Define types for the profile data
interface ProfileData {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  parenting_style: string | null;
  parenting_values: string[] | null;
  challenges: string | null;
  goals: string | null;
  support_network: string | null;
  islamic_education_priority: string | null;
  religious_practices_frequency: string | null;
}

// Define parenting values options
const parentingValues = [
  { id: "respect", label: "Respect" },
  { id: "kindness", label: "Kindness" },
  { id: "patience", label: "Patience" },
  { id: "honesty", label: "Honesty" },
  { id: "discipline", label: "Discipline" },
  { id: "responsibility", label: "Responsibility" },
  { id: "compassion", label: "Compassion" },
  { id: "integrity", label: "Integrity" },
  { id: "gratitude", label: "Gratitude" },
  { id: "humility", label: "Humility" },
  { id: "perseverance", label: "Perseverance" },
  { id: "mercy", label: "Mercy" },
  { id: "generosity", label: "Generosity" },
  { id: "taqwa", label: "Taqwa (God-consciousness)" },
  { id: "spirituality", label: "Spirituality" },
];

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // Profile doesn't exist, create it
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([{ id: user.id }])
              .select()
              .single();

            if (createError) throw createError;
            setProfileData(newProfile);
          } else {
            throw error;
          }
        } else {
          setProfileData(data);
          if (data?.parenting_values) {
            setSelectedValues(data.parenting_values);
          }
        }
      } catch (error: any) {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (profileData) {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (profileData) {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const toggleParentingValue = (value: string) => {
    setSelectedValues(prevValues => {
      const newValues = prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value];
        
      // Also update the profileData
      if (profileData) {
        setProfileData({
          ...profileData,
          parenting_values: newValues,
        });
      }

      return newValues;
    });
  };

  const handleSaveProfile = async () => {
    if (!user || !profileData) return;

    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          bio: profileData.bio,
          parenting_style: profileData.parenting_style,
          parenting_values: selectedValues,
          challenges: profileData.challenges,
          goals: profileData.goals,
          support_network: profileData.support_network,
          islamic_education_priority: profileData.islamic_education_priority,
          religious_practices_frequency: profileData.religious_practices_frequency,
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-islamic-green mb-4" />
            <p className="text-gray-500">Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container-app">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <p className="mt-2 text-gray-600">
              Share your fatherhood journey and approach to Islamic parenting
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-islamic-green" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Your personal information and brief bio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="full_name"
                    value={profileData?.full_name || ''}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData?.bio || ''}
                    onChange={handleInputChange}
                    placeholder="Tell us a bit about yourself and your family"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-islamic-green" />
                  Parenting Approach
                </CardTitle>
                <CardDescription>
                  Your parenting style, values, challenges, and goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="parentingStyle">Parenting Style</Label>
                  <Select
                    value={profileData?.parenting_style || ''}
                    onValueChange={(value) => handleSelectChange('parenting_style', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your parenting style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="authoritative">Authoritative - Balanced guidance and autonomy</SelectItem>
                      <SelectItem value="authoritarian">Authoritarian - Strong rules and discipline</SelectItem>
                      <SelectItem value="permissive">Permissive - Few rules, more freedom</SelectItem>
                      <SelectItem value="uninvolved">Uninvolved - Minimal engagement</SelectItem>
                      <SelectItem value="attachment">Attachment - Strong emotional bonds</SelectItem>
                      <SelectItem value="positive">Positive - Encouragement-focused</SelectItem>
                      <SelectItem value="islamic">Islamic - Following Islamic teachings</SelectItem>
                      <SelectItem value="mixed">Mixed - Combination of styles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Parenting Values (select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {parentingValues.map((value) => (
                      <div key={value.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={value.id} 
                          checked={selectedValues.includes(value.id)}
                          onCheckedChange={() => toggleParentingValue(value.id)}
                        />
                        <label
                          htmlFor={value.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {value.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Parenting Challenges</Label>
                  <Textarea
                    id="challenges"
                    name="challenges"
                    value={profileData?.challenges || ''}
                    onChange={handleInputChange}
                    placeholder="What challenges do you face as a parent?"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goals">Parenting Goals</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    value={profileData?.goals || ''}
                    onChange={handleInputChange}
                    placeholder="What are your goals as a parent?"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportNetwork">Support Network</Label>
                  <Textarea
                    id="supportNetwork"
                    name="support_network"
                    value={profileData?.support_network || ''}
                    onChange={handleInputChange}
                    placeholder="Who supports you in your parenting journey? (Family, friends, community)"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-islamic-green" />
                  Islamic Education & Practices
                </CardTitle>
                <CardDescription>
                  Your approach to religious education and practices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="islamicEducationPriority">Islamic Education Priority</Label>
                  <Select
                    value={profileData?.islamic_education_priority || ''}
                    onValueChange={(value) => handleSelectChange('islamic_education_priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very_high">Very High - Central to our family life</SelectItem>
                      <SelectItem value="high">High - Important but balanced with other priorities</SelectItem>
                      <SelectItem value="moderate">Moderate - Basic teaching with flexibility</SelectItem>
                      <SelectItem value="low">Low - Limited formal teaching</SelectItem>
                      <SelectItem value="still_learning">Still Learning - I'm developing my knowledge to teach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="religiousPracticesFrequency">Religious Practices Frequency</Label>
                  <Select
                    value={profileData?.religious_practices_frequency || ''}
                    onValueChange={(value) => handleSelectChange('religious_practices_frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily - Regular prayer and practices</SelectItem>
                      <SelectItem value="weekly">Weekly - Mainly on Fridays/weekends</SelectItem>
                      <SelectItem value="occasional">Occasional - During holidays and special occasions</SelectItem>
                      <SelectItem value="rarely">Rarely - Limited religious practice</SelectItem>
                      <SelectItem value="developing">Developing - Working on establishing regular practices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-4">
              <Button onClick={handleSaveProfile} disabled={saving} className="min-w-[150px]">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

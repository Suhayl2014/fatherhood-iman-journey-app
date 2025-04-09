import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Baby, Calendar, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Child } from '@/types/database.types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ChildCardProps {
  child: Child;
  onUpdate: () => void;
}

const ChildCard = ({ child, onUpdate }: ChildCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [name, setName] = useState(child.name);
  const [dateOfBirth, setDateOfBirth] = useState(child.date_of_birth);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(child.gender as 'male' | 'female' | 'other');
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    
    if (years === 0) {
      return `${months} months`;
    } else if (years === 1 && months === 0) {
      return `${years} year`;
    } else if (years >= 1 && months === 0) {
      return `${years} years`;
    } else {
      return `${years} years, ${months} months`;
    }
  };

  // Handle update child
  const handleUpdateChild = async () => {
    if (!name || !dateOfBirth || !gender) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from('children')
        .update({
          name,
          date_of_birth: dateOfBirth,
          gender,
          updated_at: new Date().toISOString(),
        })
        .eq('id', child.id);
        
      if (error) throw error;
      
      toast({
        title: "Child updated",
        description: `${name}'s information has been updated successfully.`,
      });
      
      setIsUpdateDialogOpen(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error updating child",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete child
  const handleDeleteChild = async () => {
    try {
      setIsDeleting(true);
      
      // First delete child milestones
      const { error: milestonesError } = await supabase
        .from('child_milestones')
        .delete()
        .eq('child_id', child.id);
        
      if (milestonesError) throw milestonesError;
      
      // Then delete child
      const { error } = await supabase
        .from('children')
        .delete()
        .eq('id', child.id);
        
      if (error) throw error;
      
      toast({
        title: "Child removed",
        description: `${child.name}'s records have been deleted.`,
      });
      
      setIsDeleteDialogOpen(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error removing child",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <CardHeader className="bg-gradient-to-r from-islamic-green to-islamic-teal text-white">
          <CardTitle className="flex justify-between items-center">
            <span>{child.name}</span>
            <Baby className="h-5 w-5" />
          </CardTitle>
          <CardDescription className="text-islamic-cream">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(child.date_of_birth)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col flex-grow">
          <div className="mb-4">
            <div className="text-sm text-gray-500">Age</div>
            <div className="font-medium">{calculateAge(child.date_of_birth)}</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500">Gender</div>
            <div className="font-medium capitalize">{child.gender}</div>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                size="sm"
                onClick={() => setIsUpdateDialogOpen(true)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Child Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Child Information</DialogTitle>
            <DialogDescription>
              Update your child's information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date of Birth
              </Label>
              <Input
                id="date"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Gender
              </Label>
              <RadioGroup 
                value={gender} 
                onValueChange={(value) => setGender(value as 'male' | 'female' | 'other')}
                className="col-span-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateChild} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Child Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              Remove Child
            </DialogTitle>
            <DialogDescription>
              This will permanently remove {child.name}'s information and all their milestone records. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteChild} disabled={isDeleting}>
              {isDeleting ? "Removing..." : "Yes, Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChildCard;

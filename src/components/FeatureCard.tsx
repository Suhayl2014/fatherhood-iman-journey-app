
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkTo: string;
  className?: string;
  highlight?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  linkTo,
  className = "",
  highlight = false,
}) => {
  return (
    <Card className={`overflow-hidden card-hover ${highlight ? 'border-islamic-gold border-2' : ''} ${className}`}>
      <CardHeader className="pb-2">
        <div className={`w-10 h-10 rounded-full ${highlight ? 'bg-islamic-gold/20' : 'bg-islamic-teal/10'} flex items-center justify-center mb-3`}>
          <Icon className={`h-5 w-5 ${highlight ? 'text-islamic-gold' : 'text-islamic-teal'}`} />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content can be added here if needed */}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className={`p-0 hover:bg-transparent ${highlight ? 'text-islamic-gold' : 'text-islamic-teal'}`}>
          <Link to={linkTo} className="flex items-center">
            Explore <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;

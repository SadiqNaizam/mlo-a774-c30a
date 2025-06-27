import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn function

// Define the props for the MetricCard component
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType; // Allows passing Lucide icons as a component
  change: number; // e.g., 20.1 for +20.1% or -5.2 for -5.2%
  changeText?: string; // e.g., "from last month"
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, // Rename for use as a component
  change,
  changeText = "from last month" 
}) => {
  console.log('MetricCard loaded for:', title);

  const isPositiveChange = change >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className={cn(
            "flex items-center gap-1 font-semibold",
            isPositiveChange ? "text-green-600" : "text-red-600"
          )}>
            {isPositiveChange ? 
              <ArrowUp className="h-4 w-4" /> : 
              <ArrowDown className="h-4 w-4" />
            }
            {Math.abs(change)}%
          </span>
          <span className="ml-2">{changeText}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
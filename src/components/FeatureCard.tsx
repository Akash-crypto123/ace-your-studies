import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FeatureCard = ({ icon, title, description, color, className, style }: FeatureCardProps) => {
  return (
    <Card className={cn("bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-1", className)} style={style}>
      <CardHeader className="text-center">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} mx-auto mb-4 flex items-center justify-center text-white`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-center">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  badge?: string;
  image?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function ContentCard({ title, description, children, className }: ContentCardProps) {
  return (
    <Card className={cn(className)}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function FeatureCard({ title, description, children, className, icon: Icon }: ContentCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      {Icon && <Icon className="mb-3 h-6 w-6 text-primary" />}
      {title && <h3 className="mb-2 font-semibold">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </Card>
  );
}

export function CardGrid({
  children,
  className,
  columns = 3,
}: {
  children?: React.ReactNode;
  className?: string;
  columns?: number;
}) {
  const colClass: Record<number, string> = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };
  return (
    <div className={cn("grid gap-4", colClass[columns] ?? "sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}

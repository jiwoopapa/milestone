import { cn } from "@/lib/utils";

interface DemoSectionProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  code?: string;
  codeLanguage?: string;
  [key: string]: unknown;
}

export function DemoSection({ title, description, children, className }: DemoSectionProps) {
  return (
    <section className={cn("space-y-4 py-8", className)}>
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {description && <p className="text-muted-foreground">{description}</p>}
      {children}
    </section>
  );
}

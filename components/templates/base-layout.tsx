import { cn } from "@/lib/utils";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export function BaseLayout({ children, className }: LayoutProps) {
  return (
    <div className={cn("mx-auto max-w-5xl px-4 py-8", className)}>
      {children}
    </div>
  );
}

export function Container({ children, className }: LayoutProps) {
  return (
    <div className={cn("mx-auto max-w-5xl px-4", className)}>
      {children}
    </div>
  );
}

export function Section({ children, className }: LayoutProps) {
  return (
    <section className={cn("py-12", className)}>
      {children}
    </section>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-2 pb-8", className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}

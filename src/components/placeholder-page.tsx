import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function PlaceholderPage({
  title,
  subtitle,
  hint,
}: {
  title: string;
  subtitle: string;
  hint?: string;
}) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <Card className="p-10 flex flex-col items-center justify-center text-center border-dashed shadow-[var(--shadow-card)]">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h2 className="font-semibold text-foreground">Coming up in this hour's commit</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          This screen is scaffolded. Wire it to Lovable Cloud data and build the UI next.
        </p>
        {hint && (
          <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {hint}
          </div>
        )}
      </Card>
    </div>
  );
}

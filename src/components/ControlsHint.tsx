import { Card } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";

export const ControlsHint = () => {
  return (
    <Card className="fixed top-20 right-6 p-4 bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.2)] animate-fade-in">
      <div className="flex items-start gap-3">
        <Gamepad2 className="w-5 h-5 text-primary mt-0.5" />
        <div className="space-y-2">
          <div className="font-semibold text-sm text-foreground">Controls</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">W</kbd>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">A</kbd>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">S</kbd>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">D</kbd>
              <span>Move</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">↑ ↓ ← →</kbd>
              <span>Arrow Keys</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

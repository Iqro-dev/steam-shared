import { ArrowRight } from "lucide-react";
import { steamIdFormHints } from "@/constants/steam-id-form-hints";

export function SteamIdHints() {
  return (
    <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 space-y-2">
      <p className="font-medium text-foreground/80">Your Steam ID should:</p>

      <ul className="space-y-1.5 cursor-default">
        {steamIdFormHints.map((hint) => (
          <li key={hint} className="flex items-center gap-2 group">
            <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
            <span className="group-hover:text-primary transition-colors">{hint}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

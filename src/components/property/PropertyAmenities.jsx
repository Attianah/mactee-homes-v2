import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PropertyAmenities({ amenities }) {
  const [open, setOpen] = useState(false);

  if (!amenities.length) return null;

  return (
    <div className="mt-6 border-t border-charcoal/25">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-[13px] text-charcoal"
      >
        <span>Features &amp; amenities ({amenities.length})</span>
        <span
          className={cn(
            "text-[16px] leading-none text-charcoal/50 transition-transform duration-300",
            open && "rotate-45"
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("overflow-hidden", !open && "invisible")}>
          <ul className="grid grid-cols-1 gap-2 pb-4 sm:grid-cols-2">
            {amenities.map((amenity) => (
              <li key={amenity} className="flex items-start gap-2 text-[13px] leading-relaxed text-charcoal/75">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2.4} />
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
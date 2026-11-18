import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "@/components/site/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { BUDGET_RANGES, LOCATIONS } from "@/lib/siteOptions";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "All Properties", value: "" },
  { label: "For Sale", value: "For Sale" },
  { label: "For Rent", value: "For Rent" },
];

export default function PropertySection({ search, onClearSearch, initialProperties }) {
  const [tab, setTab] = useState("");
  const { properties, isLoading } = useProperties({ tab, search, initialProperties });

  const budgetLabel = BUDGET_RANGES.find((range) => range.value === search?.budget)?.label;
  const activeFilters = [
    search?.location,
    search?.property_type,
    budgetLabel ? budgetLabel.split("·")[0].trim() : null,
  ].filter(Boolean);

  return (
    <section id="properties" className="scroll-mt-24 bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              Featured Properties
            </span>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight text-charcoal sm:text-5xl">
              Homes selected for how you want to live.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-charcoal/65">
              Every listing is inspected, priced honestly and title-verified before it reaches
              this page. {properties.length} {properties.length === 1 ? "home" : "homes"} available
              right now.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 rounded-sm border border-charcoal/12 bg-white p-1">
            {TABS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setTab(item.value)}
                aria-pressed={tab === item.value}
                className={cn(
                  "rounded-sm px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                  tab === item.value
                    ? "bg-charcoal text-sand"
                    : "text-charcoal/60 hover:text-charcoal"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-charcoal/10 py-3">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/45">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.8} />
              Filtered by
            </span>
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-sm bg-gold/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal"
              >
                {filter}
              </span>
            ))}
            <button
              type="button"
              onClick={onClearSearch}
              className="ml-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/50 underline decoration-gold underline-offset-4 transition-colors hover:text-charcoal"
            >
              <X className="h-3 w-3" strokeWidth={2.2} />
              Clear
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse overflow-hidden rounded-sm bg-white ring-1 ring-charcoal/10">
                <div className="aspect-[4/3] bg-sand-deep" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-1/3 rounded bg-sand-deep" />
                  <div className="h-5 w-2/3 rounded bg-sand-deep" />
                  <div className="h-4 w-1/4 rounded bg-sand-deep" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="mt-12 rounded-sm border border-dashed border-charcoal/20 bg-white/60 px-6 py-16 text-center">
            <h3 className="font-heading text-2xl text-charcoal">No homes match that search yet.</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/60">
              We often have off-market listings in{" "}
              {search?.location || "Accra"}. Clear your filters, or send us a WhatsApp message and
              an agent will call you back.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClearSearch}
                className="rounded-sm bg-charcoal px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand transition-colors hover:bg-forest"
              >
                Clear filters
              </button>
              <a
                href={`https://wa.me/233505814053?text=${encodeURIComponent(
                  `Hello Mactee Homes, I'm looking for a property${search?.location ? ` in ${search.location}` : " in Accra"}. Can you help?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-forest px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:bg-forest hover:text-white"
              >
                Ask an agent
              </a>
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-charcoal/35">
              Available areas: {LOCATIONS.join(" · ")}
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
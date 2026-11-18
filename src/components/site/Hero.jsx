import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Image } from "@/components/ui/image";
import { BUDGET_RANGES, LOCATIONS, PROPERTY_TYPES } from "@/lib/siteOptions";

const HERO_IMAGES = [
  {
    src: "https://media.base44.com/images/public/6afa19a081aacf8e0203b792/40e7059f4_generated_e3c1ded3.png",
    alt: "Teak screens and warm plaster on the facade of a Spintex villa",
    delay: "0.42s",
  },
  {
    src: "https://media.base44.com/images/public/6afa19a081aacf8e0203b792/d2792acd6_generated_a4607154.png",
    alt: "Sunlit living room with cream linen seating and floor-to-ceiling windows",
    delay: "0.54s",
  },
  {
    src: "https://media.base44.com/images/public/6afa19a081aacf8e0203b792/8d19c989a_generated_6e3397e3.png",
    alt: "Brass tap and stone worktop in a Mactee designed kitchen",
    delay: "0.66s",
  },
];

const HEADLINE = "Buy, Sell & Transform Your Space in Accra.";

function Headline() {
  let index = 0;
  return HEADLINE.split("").map((char, position) => {
    if (char === " ") return <span key={position}> </span>;
    const delay = `${(index++ * 0.09).toFixed(2)}s`;
    return (
      <span key={position} className="animate-letter-wave inline" style={{ animationDelay: delay }}>
        {char}
      </span>
    );
  });
}

function Field({ label, children }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5 border-charcoal/10 px-4 py-3 sm:border-l sm:first:border-l-0">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/45">
        {label}
      </span>
      <span className="relative flex items-center">
        {children}
        <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-charcoal/40" strokeWidth={1.6} />
      </span>
    </label>
  );
}

export default function Hero({ onSearch }) {
  const [form, setForm] = useState({ location: "", property_type: "", budget: "" });

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    onSearch(form);
  };

  return (
    <section className="relative overflow-hidden bg-sand" aria-label="Mactee Homes introduction">
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          <span className="animate-rise text-[11px] font-semibold uppercase tracking-[0.34em] text-gold" style={{ animationDelay: "0s" }}>
            Real Estate &amp; Interiors · Accra
          </span>

          <h1 className="mt-6 max-w-4xl font-heading text-[2.45rem] font-normal leading-[1.1] tracking-[-0.02em] text-charcoal sm:text-6xl lg:text-[4.4rem]">
            <Headline />
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-[15px] leading-relaxed text-charcoal/70 sm:text-lg" style={{ animationDelay: "0.18s" }}>
            Verified residential properties, bespoke interior design, and 3D architectural
            visualization from Spintex to East Legon.
          </p>

          <a
            href="#properties"
            className="animate-rise group mt-8 inline-flex h-12 items-stretch overflow-hidden rounded-sm border border-charcoal bg-gold text-charcoal transition-colors hover:border-forest hover:bg-forest hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="flex items-center px-5 text-[13px] font-semibold uppercase tracking-[0.16em]">
              Browse Properties
            </span>
            <span className="w-px self-stretch bg-current opacity-60" aria-hidden="true" />
            <span className="flex w-12 items-center justify-center" aria-hidden="true">
              <svg viewBox="0 0 17.4 17.4" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M11.35 1.52l2.76 3.16a5.9 5.9 0 010 7.78l-2.76 3.16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M15.5 8.63H1.07" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
          </a>
        </div>

        <form
          onSubmit={submit}
          className="mx-auto mt-12 w-full max-w-4xl rounded-sm border border-gold/50 bg-white/90 p-2 shadow-[0_28px_60px_-40px_rgba(28,28,30,0.55)] backdrop-blur-xl sm:mt-14"
        >
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">
            <Field label="Location">
              <select
                value={form.location}
                onChange={update("location")}
                aria-label="Location"
                className="w-full appearance-none bg-transparent pr-5 text-sm font-medium text-charcoal focus:outline-none"
              >
                <option value="">Any neighbourhood</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </Field>

            <Field label="Property Type">
              <select
                value={form.property_type}
                onChange={update("property_type")}
                aria-label="Property type"
                className="w-full appearance-none bg-transparent pr-5 text-sm font-medium text-charcoal focus:outline-none"
              >
                <option value="">All types</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </Field>

            <Field label="Budget (USD / GHS)">
              <select
                value={form.budget}
                onChange={update("budget")}
                aria-label="Budget range"
                className="w-full appearance-none bg-transparent pr-5 text-sm font-medium text-charcoal focus:outline-none"
              >
                <option value="">Any budget</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </Field>

            <button
              type="submit"
              className="m-1 flex items-center justify-center gap-2 rounded-sm bg-charcoal px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-sand transition-colors hover:bg-forest sm:py-3"
            >
              <Search className="h-4 w-4" strokeWidth={1.8} />
              Search Properties
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto mt-10 h-[260px] max-w-7xl overflow-hidden px-5 sm:mt-14 sm:h-[360px] sm:px-8 lg:h-[440px]">
        <div className="grid h-full grid-cols-3 gap-3 sm:gap-4">
          {HERO_IMAGES.map((image, position) => (
            <div
              key={image.src}
              className={`h-full ${position === 1 ? "translate-y-6 sm:translate-y-10 lg:translate-y-[60px]" : ""}`}
            >
              <figure
                className="animate-rise-photo relative h-[calc(100%+70px)] overflow-hidden rounded-t-[14px] bg-charcoal/80"
                style={{ animationDelay: image.delay }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover object-top"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
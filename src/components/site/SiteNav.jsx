import { useEffect, useState } from "react";
import { Building2, Menu, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/siteOptions";

const NAV_LINKS = [
  { label: "Properties", href: "#properties" },
  { label: "Interior Design", href: "#interior" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-500",
        scrolled
          ? "border-charcoal/10 bg-sand/95 shadow-[0_10px_30px_-24px_rgba(28,28,30,0.6)] backdrop-blur-xl"
          : "border-transparent bg-sand/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Mactee Homes home">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/50 bg-white text-gold transition-colors group-hover:bg-gold group-hover:text-white">
            <Building2 className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold uppercase tracking-[0.24em] text-charcoal">
              Mactee
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.42em] text-gold">
              Homes
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[13px] font-medium uppercase tracking-[0.14em] text-charcoal/70 transition-colors hover:text-charcoal after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#contact"
            className="hidden items-center justify-center rounded-sm border border-charcoal bg-gold px-5 py-3 text-[13px] font-semibold tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-sand sm:inline-flex"
          >
            Book a Free Viewing
          </a>
          <a
            href={whatsappLink("Hello Mactee Homes, I'd like to speak with an agent about a property.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Mactee Homes on WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-white transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-charcoal/20 text-charcoal transition-colors hover:border-charcoal/40 lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-charcoal px-6 py-6 transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold uppercase tracking-[0.32em] text-sand/70">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-sand/25 text-sand"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>

        <nav className="mt-14 flex flex-col gap-1" aria-label="Mobile">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-sand/10 py-5 font-heading text-3xl text-sand transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
              style={{ transitionDelay: open ? `${120 + index * 70}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-sm bg-gold py-4 text-sm font-semibold uppercase tracking-[0.16em] text-charcoal"
          >
            Book a Free Viewing
          </a>
          <a
            href={whatsappLink("Hello Mactee Homes, I'd like to speak with an agent about a property.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-sm border border-forest bg-forest py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
            WhatsApp Us
          </a>
          <p className="pt-2 text-center text-xs uppercase tracking-[0.24em] text-sand/50">
            Kakalika Plaza · Spintex Road
          </p>
        </div>
      </div>
    </>
  );
}
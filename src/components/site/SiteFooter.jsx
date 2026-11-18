import { Building2, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { ADDRESS, INSTAGRAM_URL, PHONES, whatsappLink } from "@/lib/siteOptions";

const QUICK_LINKS = [
  { label: "Properties", href: "#properties" },
  { label: "Interior Design", href: "#interior" },
  { label: "About Us", href: "#about" },
  { label: "Book a Viewing", href: "#contact" },
];

export default function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-charcoal text-sand">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/50 text-gold">
                <Building2 className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold uppercase tracking-[0.24em] text-sand">Mactee</span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.42em] text-gold">Homes</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand/60">
              A premier real estate brokerage and interior design studio on Spintex Road, Accra.
              Verified residential properties, bespoke interiors and photorealistic 3D
              visualization — one team, one standard.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-sand/20 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.8} />
                @mactee_homes
              </a>
              <a
                href={whatsappLink("Hello Mactee Homes, I found you online and would like to know more.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-forest px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-forest/90"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-sand/65 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Visit &amp; Call
            </h3>
            <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-sand/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} />
              {ADDRESS}
            </p>
            <ul className="mt-4 space-y-2">
              {PHONES.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 text-sm text-sand/65 transition-colors hover:text-gold"
                  >
                    <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
                    {phone.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-sand/35">
              Mon – Sat · 8:00 – 18:00
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-sand/10 pt-6 text-[11px] uppercase tracking-[0.16em] text-sand/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mactee Homes. All rights reserved.</p>
          <p>Real Estate &amp; Interior Design · Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bath, BedDouble, MapPin, MessageCircle, Ruler } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatPrice, priceSuffix, propertyInquiryMessage, whatsappLink } from "@/lib/siteOptions";

function Spec({ icon: Icon, value, label }) {
  return (
    <span className="flex items-center gap-1.5 text-[13px] text-charcoal/70">
      <Icon className="h-4 w-4 text-gold" strokeWidth={1.6} />
      <span className="font-semibold text-charcoal">{value}</span>
      <span className="text-charcoal/50">{label}</span>
    </span>
  );
}

export default function PropertyCard({ property }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-white ring-1 ring-charcoal/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_34px_70px_-45px_rgba(28,28,30,0.6)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-deep">
        <Image
          src={property.images?.[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-sm bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          {property.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/50">
          <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
          {property.location}
        </p>

        <h3 className="mt-3 font-heading text-[22px] leading-snug text-charcoal sm:text-2xl">
          {property.title}
        </h3>

        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold tracking-tight text-charcoal">
            {formatPrice(property)}
          </span>
          <span className="text-sm text-charcoal/55">{priceSuffix(property)}</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-charcoal/10 py-3">
          <Spec icon={BedDouble} value={property.beds} label="Beds" />
          <Spec icon={Bath} value={property.baths} label="Baths" />
          <Spec icon={Ruler} value={property.sqm} label="sqm" />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row">
          <Link
            to="/properties/$propertyId"
            params={{ propertyId: property.id }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-charcoal/25 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
          <a
            href={whatsappLink(propertyInquiryMessage(property))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-forest px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-forest/90"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </article>
  );
}
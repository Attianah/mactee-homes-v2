import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import WhatsAppFab from "@/components/site/WhatsAppFab";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertySpecs from "@/components/property/PropertySpecs";
import PropertyActions from "@/components/property/PropertyActions";
import PropertyAmenities from "@/components/property/PropertyAmenities";
import { getProperty } from "@/lib/server-fns";
import { formatPrice, priceSuffix } from "@/lib/siteOptions";

export const Route = createFileRoute("/properties/$propertyId")({
  loader: async ({ params }) => {
    const property = await getProperty({ data: { id: params.propertyId } });
    if (!property) throw notFound();
    return property;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} in ${loaderData.area} — Mactee Homes` : "Property — Mactee Homes";
    const description = loaderData
      ? `${loaderData.title} in ${loaderData.location}. ${loaderData.beds} bedrooms, ${loaderData.baths} bathrooms, ${loaderData.sqm} sqm. ${loaderData.listing_type} at ${formatPrice(loaderData)}${priceSuffix(loaderData)} with Mactee Homes.`
      : "Verified residential property from Mactee Homes in Accra.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(loaderData?.images?.[0] ? [{ property: "og:image", content: loaderData.images[0] }] : []),
      ],
    };
  },
  component: PropertyPage,
});

function PropertyPage() {
  const property = Route.useLoaderData();
  const images = (property.images ?? []).filter(Boolean);

  return (
    <div className="min-h-screen bg-sand text-charcoal">
      <SiteNav />

      <main className="px-3 pb-16 pt-24 sm:px-5 sm:pt-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-3">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <Link to="/" className="font-heading text-[17px] text-charcoal transition-colors hover:text-gold">
                Mactee Homes
              </Link>
              <Link
                to="/"
                hash="properties"
                className="text-[13px] text-charcoal/60 transition-colors hover:text-charcoal"
              >
                All properties
              </Link>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/45">
              {property.listing_type} · Ref {property.id.slice(-6).toUpperCase()}
            </span>
          </div>
          <hr className="border-charcoal/25" />

          <div className="grid gap-y-3 pt-3 md:grid-cols-2 md:gap-x-3 md:gap-y-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-charcoal/25 pb-3 md:col-start-2 md:row-start-1">
              <h1 className="max-w-[32ch] font-heading text-[26px] leading-[1.15] text-charcoal sm:text-[32px]">
                {property.title}
              </h1>
              <p className="flex items-baseline gap-1.5">
                <span className="text-[19px] font-semibold tracking-tight text-charcoal sm:text-xl">
                  {formatPrice(property)}
                </span>
                <span className="text-[13px] text-charcoal/55">{priceSuffix(property)}</span>
              </p>
            </div>

            <PropertyGallery images={images} title={property.title} />

            <div className="md:col-start-2 md:row-start-2">
              <p className="flex items-center gap-1.5 pt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal/50">
                <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
                {property.location}
              </p>

              <p className="mt-4 text-[13.5px] leading-[1.7] text-charcoal/70">{property.description}</p>

              <PropertySpecs property={property} />
              <PropertyActions property={property} />

              <p className="mt-3.5 flex items-center gap-2 text-[12px] text-charcoal/60">
                <ShieldCheck className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                Title verified before listing · Guided inspection is free
              </p>

              <PropertyAmenities amenities={property.amenities ?? []} />

              <Link
                to="/"
                hash="properties"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-charcoal underline decoration-gold underline-offset-4 transition-colors hover:text-gold"
              >
                See all available homes
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.9} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import SiteNav from "@/components/site/SiteNav";
import Hero from "@/components/site/Hero";
import PropertySection from "@/components/site/PropertySection";
import ServicesSection from "@/components/site/ServicesSection";
import AboutSection from "@/components/site/AboutSection";
import BookingSection from "@/components/site/BookingSection";
import SiteFooter from "@/components/site/SiteFooter";
import WhatsAppFab from "@/components/site/WhatsAppFab";
import { listProperties } from "@/lib/server-fns";

export const Route = createFileRoute("/")({
  loader: () => listProperties({ data: {} }),
  head: () => ({
    meta: [
      { title: "Mactee Homes — Luxury Real Estate & Interior Design in Accra" },
      {
        name: "description",
        content:
          "Buy, sell or rent verified homes across Spintex, East Legon, Cantonments and Airport Residential. Bespoke interior design and 3D visualization from Mactee Homes, Kakalika Plaza, Accra.",
      },
      { property: "og:title", content: "Mactee Homes — Luxury Real Estate & Interior Design in Accra" },
      {
        property: "og:description",
        content:
          "Verified residential properties, bespoke interior design and photorealistic 3D visualization from Spintex to East Legon.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const EMPTY_SEARCH = { location: "", property_type: "", budget: "" };

function HomePage() {
  const initialProperties = Route.useLoaderData();
  const [search, setSearch] = useState(EMPTY_SEARCH);

  const handleSearch = (next) => {
    setSearch(next);
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="top" className="min-h-screen bg-sand text-charcoal">
      <SiteNav />
      <main>
        <Hero onSearch={handleSearch} />
        <PropertySection
          search={search}
          onClearSearch={() => setSearch(EMPTY_SEARCH)}
          initialProperties={initialProperties}
        />
        <ServicesSection />
        <AboutSection />
        <BookingSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
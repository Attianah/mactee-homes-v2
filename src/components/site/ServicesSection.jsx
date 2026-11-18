import { Boxes, Building2, Sofa } from "lucide-react";
import { Image } from "@/components/ui/image";

const SERVICES = [
  {
    icon: Building2,
    title: "Property Sales & Brokerage",
    copy: "Litigation-free homes and investment properties across Accra's prime neighbourhoods — every title verified, every price negotiated on your behalf.",
  },
  {
    icon: Sofa,
    title: "Interior Design & Space Planning",
    copy: "Complete turnkey interior transformations tailored to your lifestyle, from layout and joinery through to the final cushion.",
  },
  {
    icon: Boxes,
    title: "3D Visualization",
    copy: "Photorealistic 3D architectural renders so you can walk through your space and approve every finish before renovation begins.",
  },
];

export default function ServicesSection() {
  return (
    <section id="interior" className="scroll-mt-24 border-t border-charcoal/10 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              More Than Just Real Estate
            </span>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight text-charcoal sm:text-5xl">
              We hand over the keys — then make the space yours.
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-charcoal/65 lg:pb-2">
            Mactee Homes is a brokerage and an interior studio under one roof in Kakalika Plaza.
            Buy through us and the same team can plan, render and deliver the interior — one
            relationship, one standard of finish.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="group relative flex flex-col border-t border-gold/60 bg-sand/60 p-6 transition-colors duration-500 hover:bg-sand sm:p-7"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal/30">
                0{index + 1}
              </span>
              <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-sm border border-gold/50 bg-white text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                <service.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-heading text-xl leading-snug text-charcoal">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{service.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand-deep">
            <Image
              src="https://media.base44.com/images/public/6afa19a081aacf8e0203b792/1c69753f3_generated_fb1dceb1.png"
              alt="Finished living space designed by Mactee Homes with warm sand upholstery and brass lighting"
              className="h-full w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5 pt-16 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Interior design &amp; styling
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand-deep">
            <Image
              src="https://media.base44.com/images/public/6afa19a081aacf8e0203b792/06e60ddeb_generated_fcc6275c.png"
              alt="Photorealistic 3D render of a modern Accra villa at dusk"
              className="h-full w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5 pt-16 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              3D architectural visualization
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
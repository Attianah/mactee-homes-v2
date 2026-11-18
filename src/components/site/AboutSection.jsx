import { MapPin, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import { ADDRESS } from "@/lib/siteOptions";

const STATS = [
  { value: "100%", label: "Title-verified listings" },
  { value: "12+", label: "Neighbourhoods covered" },
  { value: "One", label: "Team for home & interiors" },
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative">
            <figure className="overflow-hidden rounded-sm bg-sand-deep">
              <Image
                src="https://media.base44.com/images/public/6afa19a081aacf8e0203b792/a54fbd58e_generated_8f58312a.png"
                alt="Modern villa with teak screens and landscaped gardens in Accra"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
            <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-4">
              <figure className="overflow-hidden rounded-sm bg-sand-deep">
                <Image
                  src="https://media.base44.com/images/public/6afa19a081aacf8e0203b792/b0782a152_generated_d9eafb51.png"
                  alt="Mactee Homes office interior at Kakalika Plaza on Spintex Road"
                  className="aspect-[3/2] w-full object-cover"
                />
              </figure>
              <div className="flex flex-col justify-center rounded-sm border border-gold/40 bg-white p-4">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={1.8} />
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/45">
                  Our office
                </p>
                <p className="mt-1 text-[13px] leading-snug text-charcoal">{ADDRESS}</p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              About Us
            </span>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight text-charcoal sm:text-5xl">
              Accra natives, quietly obsessed with how a home feels.
            </h2>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-charcoal/70">
              <p>
                Mactee Homes began on Spintex Road with a simple frustration: too many buyers were
                walking into disputes, incomplete paperwork or finishes that looked nothing like the
                photos. So we built a brokerage that verifies before it advertises.
              </p>
              <p>
                From Kakalika Plaza we sell residential homes across Spintex, East Legon,
                Cantonments, Airport Residential and Tema — and we design the interiors that follow.
                Whether you are buying your first home, selling a family property or renovating a
                single room, you deal with one team from the first viewing to the final walkthrough.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-sm border border-charcoal/10 bg-white p-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-forest" strokeWidth={1.7} />
              <p className="text-[13px] leading-relaxed text-charcoal/75">
                Litigation-free documentation is non-negotiable. If a title cannot be verified, we
                will not list it.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-2xl text-charcoal sm:text-3xl">{stat.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase leading-snug tracking-[0.12em] text-charcoal/45">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
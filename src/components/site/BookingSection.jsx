import { useState } from "react";
import { CalendarCheck, Check, Clock, Loader2, MapPin, Phone } from "lucide-react";
import { submitEnquiry } from "@/lib/server-fns";
import { ADDRESS, PHONES, WHATSAPP_NUMBER } from "@/lib/siteOptions";

const INTERESTS = ["Buying a Home", "Renting", "Interior Design", "Selling My Property"];

const inputClass =
  "w-full border-0 border-b border-sand/25 bg-transparent py-3 text-[15px] text-sand placeholder:text-sand/35 focus:border-gold focus:outline-none [color-scheme:dark]";

export default function BookingSection() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    preferred_date: "",
    service_interest: "Buying a Home",
  });
  const [status, setStatus] = useState("idle");

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitEnquiry({
        data: {
          full_name: form.full_name,
          phone: form.phone,
          preferred_date: form.preferred_date,
          service_interest: form.service_interest,
        },
      });
      setStatus("sent");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-charcoal py-20 text-sand sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">
              Schedule Your Free Property Viewing
            </span>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight text-sand sm:text-5xl">
              Come and see it in person.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-sand/65">
              Visit our office at Kakalika Plaza, off Spintex Road, or book a guided tour of any
              property on this page. Viewings are free, and an agent will confirm your time by
              phone or WhatsApp.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand/40">Office</p>
                  <p className="mt-1 text-sm leading-relaxed text-sand/80">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand/40">Hours</p>
                  <p className="mt-1 text-sm text-sand/80">Monday – Saturday, 8:00 – 18:00</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand/40">Call us</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sand/80">
                    {PHONES.map((phone) => (
                      <a key={phone.href} href={phone.href} className="transition-colors hover:text-gold">
                        {phone.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-sand/15 bg-white/[0.04] p-6 sm:p-9">
            {status === "sent" ? (
              <div className="flex h-full flex-col justify-center py-6 text-center">
                <CalendarCheck className="mx-auto h-10 w-10 text-gold" strokeWidth={1.4} />
                <h3 className="mt-5 font-heading text-2xl text-sand">Your viewing request is in.</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-sand/65">
                  Thank you, {form.full_name.split(" ")[0] || "friend"}. An agent will call{" "}
                  {form.phone} to confirm a time — usually within the hour during working days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ full_name: "", phone: "", preferred_date: "", service_interest: "Buying a Home" });
                    setStatus("idle");
                  }}
                  className="mx-auto mt-6 inline-flex items-center gap-2 rounded-sm border border-sand/25 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand transition-colors hover:border-gold hover:text-gold"
                >
                  Book another viewing
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/45">
                      Full Name
                    </span>
                    <input
                      required
                      value={form.full_name}
                      onChange={update("full_name")}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/45">
                      Phone / WhatsApp
                    </span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder={`+${WHATSAPP_NUMBER}`}
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/45">
                    Preferred Date
                  </span>
                  <input
                    type="date"
                    value={form.preferred_date}
                    onChange={update("preferred_date")}
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/45">
                    Service Interest
                  </span>
                  <select
                    value={form.service_interest}
                    onChange={update("service_interest")}
                    className={inputClass}
                  >
                    {INTERESTS.map((interest) => (
                      <option key={interest} value={interest} className="bg-white text-charcoal">
                        {interest}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-sand disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.2} />
                  ) : (
                    <Check className="h-4 w-4" strokeWidth={2.4} />
                  )}
                  Request My Free Viewing
                </button>

                {status === "error" && (
                  <p className="text-[12px] text-gold">
                    That didn&apos;t send. Please try again, or call us on {PHONES[0].label}.
                  </p>
                )}

                <p className="text-[11px] leading-relaxed text-sand/35">
                  We only use your number to arrange the viewing. No newsletters, no resale of
                  your details.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
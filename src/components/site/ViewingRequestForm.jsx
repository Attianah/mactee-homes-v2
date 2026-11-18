import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/lib/server-fns";

export default function ViewingRequestForm({ property }) {
  const [form, setForm] = useState({ full_name: "", phone: "", preferred_date: "" });
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
          service_interest: "Property Viewing",
          property_title: property.title,
        },
      });
      setStatus("sent");
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-sm border border-forest/25 bg-forest/5 p-4">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={2.4} />
        <div>
          <p className="text-[13px] font-semibold text-charcoal">Viewing request received.</p>
          <p className="mt-1 text-[13px] leading-relaxed text-charcoal/65">
            An agent will call {form.phone} to confirm a time for {property.title}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={form.full_name}
          onChange={update("full_name")}
          placeholder="Full name"
          aria-label="Full name"
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal/35 focus:border-gold focus:outline-none"
        />
        <input
          required
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="Phone / WhatsApp"
          aria-label="Phone or WhatsApp number"
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal/35 focus:border-gold focus:outline-none"
        />
      </div>
      <input
        type="date"
        value={form.preferred_date}
        onChange={update("preferred_date")}
        aria-label="Preferred viewing date"
        className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-[13px] text-charcoal focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-charcoal hover:text-sand disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.2} />}
        Request a Viewing
      </button>
      {status === "error" && (
        <p className="text-[12px] text-destructive">
          That didn&apos;t send. Please check your details and try again, or message us on WhatsApp.
        </p>
      )}
    </form>
  );
}
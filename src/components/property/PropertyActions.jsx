import { useState } from "react";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import ViewingRequestForm from "@/components/site/ViewingRequestForm";
import { PHONES, propertyInquiryMessage, whatsappLink } from "@/lib/siteOptions";
import { cn } from "@/lib/utils";

export default function PropertyActions({ property }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="inline-flex min-h-[42px] flex-1 basis-[190px] items-center justify-center gap-2 border border-charcoal bg-transparent px-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-charcoal transition-colors hover:bg-charcoal hover:text-sand"
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={1.9} />
          {open ? "Hide viewing form" : "Book a private viewing"}
        </button>
        <a
          href={whatsappLink(propertyInquiryMessage(property))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire about this property on WhatsApp"
          className="inline-flex h-[42px] w-[42px] items-center justify-center border border-forest text-forest transition-colors hover:bg-forest hover:text-white"
        >
          <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </a>
        <a
          href={PHONES[0].href}
          aria-label={`Call Mactee Homes on ${PHONES[0].label}`}
          className="inline-flex h-[42px] w-[42px] items-center justify-center border border-charcoal/30 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
        >
          <Phone className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </a>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("overflow-hidden", !open && "invisible")}>
          <ViewingRequestForm property={property} />
        </div>
      </div>
    </div>
  );
}
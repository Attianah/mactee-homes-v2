import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/siteOptions";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hello Mactee Homes, I'd like to speak with an agent about a property.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mactee Homes on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-[0_18px_40px_-18px_rgba(28,28,30,0.7)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 animate-ring-pulse rounded-full border border-gold" aria-hidden="true" />
      <MessageCircle className="h-6 w-6" strokeWidth={1.7} />
    </a>
  );
}
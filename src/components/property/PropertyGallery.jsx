import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function PropertyGallery({ images, title }) {
  const [lightbox, setLightbox] = useState(-1);
  const total = images.length;

  useEffect(() => {
    if (lightbox < 0) return;
    const onKey = (event) => {
      if (event.key === "Escape") setLightbox(-1);
      if (event.key === "ArrowRight") setLightbox((i) => (i + 1) % total);
      if (event.key === "ArrowLeft") setLightbox((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, total]);

  return (
    <>
      <div className="relative aspect-[3/4] overflow-hidden md:col-start-1 md:row-span-2 md:row-start-1 md:aspect-auto">
        <div className="absolute inset-0 flex snap-y snap-proximity flex-col gap-3 overflow-y-auto md:snap-none">
          {images.map((src, index) => (
            <figure key={`${src}-${index}`} className="group relative aspect-[3/4] shrink-0 snap-start overflow-hidden bg-sand-deep">
              <Image src={src} alt={`${title} — photo ${index + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setLightbox(index)}
                aria-label={`Open photo ${index + 1} of ${total} full screen`}
                className="absolute inset-0 cursor-zoom-in"
              >
                <span className="absolute left-3 top-3 rounded-sm bg-charcoal/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sand backdrop-blur">
                  {index + 1} / {total}
                </span>
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-sm bg-charcoal/65 text-sand opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {lightbox >= 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          className="fixed inset-0 z-[90] flex flex-col bg-charcoal p-4 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sand/60">
              {lightbox + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(-1)}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center border border-sand/30 text-sand transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            <Image
              src={images[lightbox]}
              alt={`${title} — photo ${lightbox + 1}`}
              fittingType="fit"
              className="max-h-full max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => setLightbox((i) => (i - 1 + total) % total)}
              aria-label="Previous photo"
              className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-sand/25 bg-charcoal/70 text-sand transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => setLightbox((i) => (i + 1) % total)}
              aria-label="Next photo"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-sand/25 bg-charcoal/70 text-sand transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-sand/40">
            Use arrow keys to browse · Esc to close
          </p>
        </div>
      )}
    </>
  );
}
import { useState } from "react";
import { type ImageItem } from "../types";

interface GalleryProps {
  items: ImageItem[];
  onClear: () => void;
}

export default function Gallery({ items, onClear }: GalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (img: string, idx: number) => {
    navigator.clipboard.writeText(img);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleDownload = (img: string, idx: number) => {
    const link = document.createElement("a");
    link.href = img.startsWith("data:") ? img : `data:image/png;base64,${img}`;
    link.download = `campaign-visual-${idx + 1}.png`;
    link.click();
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600">
            <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
          </svg>
        </div>
        <p className="text-sm text-zinc-500">Your generated visuals will appear here.</p>
        <p className="mt-1 text-xs text-zinc-700">Head over to Create to generate your first campaign.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Campaign Gallery</h2>
          <p className="mt-1 text-xs text-zinc-500">{items.length} visual{items.length !== 1 ? "s" : ""} generated</p>
        </div>
        <button
          onClick={onClear}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs text-zinc-400 transition hover:border-red-500/40 hover:text-red-400"
        >
          Clear All
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => {
          const imgSrc = item.image.startsWith("data:") ? item.image : `data:image/png;base64,${item.image}`;
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            >
              {/* Image */}
              <div
                className="relative aspect-square cursor-pointer overflow-hidden bg-zinc-950"
                onClick={() => setLightbox(imgSrc)}
              >
                <img
                  src={imgSrc}
                  alt={`Campaign visual ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>

              {/* Info + Actions */}
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="text-xs font-medium text-zinc-300">Visual #{idx + 1}</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.status === "success" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    <span className="text-[10px] capitalize text-zinc-500">{item.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(item.image, idx)}
                    title="Copy base64"
                    className="rounded-lg border border-zinc-700 p-1.5 text-zinc-400 transition hover:border-zinc-500 hover:text-white"
                  >
                    {copiedIdx === idx ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDownload(imgSrc, idx)}
                    title="Download"
                    className="rounded-lg border border-zinc-700 p-1.5 text-zinc-400 transition hover:border-zinc-500 hover:text-white"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-zinc-700"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox} alt="Lightbox" className="max-h-[85vh] w-auto object-contain" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
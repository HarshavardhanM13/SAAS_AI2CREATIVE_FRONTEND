import { useState, useRef, useCallback } from "react";
import { generateImages } from "../api/campaigns";
import {  type ImageItem } from "../types";

const BUSINESS_TYPES = [
  "Restaurant & Food",
  "Fashion & Apparel",
  "Beauty & Wellness",
  "Fitness & Sports",
  "Tech & SaaS",
  "E-commerce & Retail",
  "Real Estate",
  "Education & Coaching",
  "Travel & Tourism",
  "Healthcare & Clinic",
  "Finance & Investment",
  "Art & Creative Studio",
];

const REGIONS = [
  "North America",
  "South America",
  "Europe",
  "South Asia",
  "Southeast Asia",
  "Middle East",
  "Africa",
  "Australia & Oceania",
  "East Asia",
  "Central Asia",
];

interface GenerateFormProps {
  onResults: (items: ImageItem[]) => void;
}

export default function GenerateForm({ onResults }: GenerateFormProps) {
  const [businessType, setBusinessType] = useState("");
  const [region, setRegion] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;
    setLogo(file);
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType || !region) {
      setError("Please select both a business type and region.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const results = await generateImages({ business_type: businessType, region, logo });
      onResults(results);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero text */}
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
          Generate Your{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Campaign
          </span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          Describe your brand and market. Our AI crafts scroll-stopping visuals
          tailored to your audience in seconds.
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-3 text-xs text-zinc-500">
        {["Business Type", "Region", "Logo (optional)"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-700 text-[10px] text-zinc-400">
              {i + 1}
            </span>
            <span>{s}</span>
            {i < 2 && <span className="text-zinc-700">—</span>}
          </div>
        ))}
      </div>

      {/* Business Type */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-[2px] text-zinc-400">
          Business Type
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {BUSINESS_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setBusinessType(type)}
              className={`rounded-lg border px-3 py-2.5 text-left text-xs transition-all duration-150 ${
                businessType === type
                  ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-[2px] text-zinc-400">
          Target Region
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {REGIONS.map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-lg border px-3 py-2.5 text-left text-xs transition-all duration-150 ${
                region === r
                  ? "border-orange-400/60 bg-orange-400/10 text-orange-300"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Upload */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-[2px] text-zinc-400">
          Brand Logo{" "}
          <span className="ml-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] text-zinc-500 normal-case tracking-normal">
            Optional
          </span>
        </label>

        {logoPreview ? (
          <div className="flex items-center gap-4 rounded-xl border border-zinc-700 bg-zinc-900/60 p-4">
            <img
              src={logoPreview}
              alt="Logo preview"
              className="h-14 w-14 rounded-lg object-contain"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-200">{logo?.name}</p>
              <p className="text-xs text-zinc-500">
                {logo ? (logo.size / 1024).toFixed(1) + " KB" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={removeLogo}
              className="rounded-lg border border-zinc-700 p-1.5 text-zinc-400 transition hover:border-red-500/50 hover:text-red-400"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
              dragOver
                ? "border-amber-400/60 bg-amber-400/5"
                : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/60"
            }`}
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
            </div>
            <p className="text-sm text-zinc-400">
              Drop your logo here, or{" "}
              <span className="text-amber-400 underline underline-offset-2">browse</span>
            </p>
            <p className="mt-1 text-[11px] text-zinc-600">PNG, JPG, SVG up to 10MB</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-red-400">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
          </svg>
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !businessType || !region}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/20 transition-all duration-200 hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Generating Campaign...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
            Generate Campaign Visuals
          </>
        )}
      </button>
    </form>
  );
}
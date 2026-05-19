import { useState } from "react";
import Header from "./components/Header";
import GenerateForm from "./components/GenerateForm";
import Gallery from "./components/Gallery";
import ComingSoon from "./components/ComingSoon";
import { type ImageItem, type AppTab } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("generate");
  const [galleryItems, setGalleryItems] = useState<ImageItem[]>([]);

  const handleResults = (items: ImageItem[]) => {
    setGalleryItems((prev) => [...items, ...prev]);
    setActiveTab("gallery");
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="relative mx-auto max-w-5xl px-6 py-12">
        {activeTab === "generate" && (
          <GenerateForm onResults={handleResults} />
        )}
        {activeTab === "gallery" && (
          <Gallery
            items={galleryItems}
            onClear={() => setGalleryItems([])}
          />
        )}
        {activeTab === "coming-soon" && <ComingSoon />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center">
        <p className="text-[11px] uppercase tracking-[2px] text-zinc-700">
          EasyContent Studio — Built for Everyone
        </p>
      </footer>
    </div>
  );
}
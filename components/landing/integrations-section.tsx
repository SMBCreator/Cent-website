"use client";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

const formats = [
  { name: "Banners", category: "Баннерная реклама" },
  { name: "Display", category: "Баннерная реклама" },
  { name: "Video", category: "Видеореклама" },
  { name: "Native", category: "Нативная реклама" },
  { name: "Mobile", category: "Мобильная реклама" },
  { name: "CTV", category: "Smart TV" },
  { name: "Rich Media", category: "Интерактивные форматы" },
  { name: "In-Stream", category: "Pre-roll, Mid-roll" },
  { name: "Out-Stream", category: "Автостарт в контенте" },
  { name: "Rewarded", category: "За вознаграждение" },
  { name: "In-App", category: "Реклама в приложениях" },
  { name: "Push", category: "Push-уведомления" },
  { name: "Interstitial", category: "Полноэкранные форматы" },
];

/** Visual mock of each format inside a device */
function FormatVisual({ name }: { name: string }) {
  // Desktop shell
  const Desktop = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full">
      <div className="border border-foreground/20 rounded-lg overflow-hidden bg-background" style={{ aspectRatio: "16/9" }}>
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-foreground/10 bg-foreground/[0.03]">
          {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-foreground/20" />)}
          <div className="flex-1 h-2.5 rounded bg-foreground/5 ml-1" />
        </div>
        <div className="relative w-full h-full">{children}</div>
      </div>
      <div className="w-6 h-1.5 bg-foreground/15 mx-auto" />
      <div className="w-12 h-0.5 bg-foreground/10 rounded mx-auto" />
    </div>
  );

  // Mobile shell
  const Mobile = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto" style={{ width: 80 }}>
      <div className="border border-foreground/20 rounded-2xl overflow-hidden bg-background relative" style={{ height: 140 }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-foreground/20 rounded-b-full z-10" />
        <div className="pt-4 relative h-full">{children}</div>
      </div>
    </div>
  );

  // TV shell
  const TV = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full">
      <div className="border-2 border-foreground/20 rounded-lg overflow-hidden bg-foreground/5" style={{ aspectRatio: "16/9" }}>
        <div className="relative w-full h-full">{children}</div>
      </div>
      <div className="w-4 h-2 bg-foreground/15 mx-auto" />
      <div className="w-16 h-0.5 bg-foreground/10 rounded mx-auto" />
    </div>
  );

  if (name === "Banners") return (
    <Desktop>
      <div className="p-2 space-y-1">
        <div className="h-1.5 bg-foreground/10 rounded w-full" />
        <div className="h-1 bg-foreground/10 rounded w-3/4" />
      </div>
      {/* Leaderboard top banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-foreground/20 to-foreground/10 border-b border-foreground/20 flex items-center justify-center" style={{ height: "22%" }}>
        <span className="font-mono text-[6px] text-muted-foreground uppercase tracking-widest">728×90 Leaderboard</span>
      </div>
    </Desktop>
  );

  if (name === "Display") return (
    <Desktop>
      <div className="flex h-full gap-1 p-2">
        <div className="flex-1 space-y-1">
          <div className="h-1.5 bg-foreground/10 rounded" />
          <div className="h-1 bg-foreground/10 rounded w-3/4" />
          <div className="h-1 bg-foreground/10 rounded w-1/2" />
          <div className="h-1 bg-foreground/10 rounded" />
          <div className="h-1 bg-foreground/10 rounded w-2/3" />
        </div>
        {/* Sidebar 300x250 */}
        <div className="shrink-0 bg-gradient-to-b from-foreground/20 to-foreground/10 border border-foreground/20 flex items-center justify-center rounded" style={{ width: "28%" }}>
          <span className="font-mono text-[5px] text-muted-foreground uppercase">300×250</span>
        </div>
      </div>
    </Desktop>
  );

  if (name === "Video") return (
    <Desktop>
      {/* Video player */}
      <div className="absolute inset-x-2 inset-y-2 bg-foreground/10 rounded flex flex-col overflow-hidden">
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-6 h-6 rounded-full border border-foreground/40 flex items-center justify-center">
            <span className="text-foreground/40 text-xs ml-0.5">▶</span>
          </div>
          {/* Skip button */}
          <div className="absolute bottom-1 right-1 bg-foreground/30 px-1 py-0.5 rounded text-[5px] font-mono text-background/80">Skip 5s</div>
          {/* Ad label */}
          <div className="absolute top-1 left-1 bg-foreground/30 px-1 py-0.5 rounded text-[5px] font-mono text-background/80">Ad</div>
        </div>
        <div className="h-2 bg-foreground/20 relative">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-foreground/50 rounded-l" />
        </div>
      </div>
    </Desktop>
  );

  if (name === "Native") return (
    <Mobile>
      <div className="px-2 space-y-1.5">
        <div className="h-1.5 bg-foreground/10 rounded" />
        <div className="h-1 bg-foreground/10 rounded w-3/4" />
        {/* Native card blends into feed */}
        <div className="border border-foreground/20 rounded p-1.5 bg-foreground/[0.03]">
          <div className="h-8 bg-foreground/10 rounded mb-1" />
          <div className="h-1 bg-foreground/15 rounded w-full mb-0.5" />
          <div className="h-1 bg-foreground/10 rounded w-2/3" />
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono text-[5px] text-muted-foreground/60">Sponsored</span>
            <div className="h-2.5 w-8 bg-foreground/20 rounded-full" />
          </div>
        </div>
        <div className="h-1 bg-foreground/10 rounded" />
      </div>
    </Mobile>
  );

  if (name === "Mobile") return (
    <Mobile>
      <div className="px-2 space-y-1 pt-1">
        <div className="h-1.5 bg-foreground/10 rounded" />
        <div className="h-1 bg-foreground/10 rounded w-3/4" />
        <div className="h-10 bg-foreground/5 rounded" />
      </div>
      {/* Bottom mobile banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-foreground/25 to-foreground/15 border-t border-foreground/20 flex items-center justify-center" style={{ height: "18%" }}>
        <span className="font-mono text-[5px] text-muted-foreground uppercase">320×50</span>
      </div>
    </Mobile>
  );

  if (name === "CTV") return (
    <TV>
      {/* TV content */}
      <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
        <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">▶</span>
        </div>
      </div>
      {/* L-shape / pause overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/40 to-transparent flex items-end p-2" style={{ height: "35%" }}>
        <div className="flex items-center gap-2 w-full">
          <div className="w-8 h-8 bg-foreground/20 rounded border border-foreground/30 flex items-center justify-center">
            <span className="font-mono text-[5px] text-background/60">logo</span>
          </div>
          <div className="flex-1">
            <div className="h-1.5 bg-foreground/40 rounded w-3/4 mb-0.5" />
            <div className="h-1 bg-foreground/30 rounded w-1/2" />
          </div>
          <div className="h-4 w-8 bg-foreground/30 rounded-full flex items-center justify-center">
            <span className="font-mono text-[4px] text-background/70">CTA</span>
          </div>
        </div>
      </div>
    </TV>
  );

  if (name === "Rich Media") return (
    <Desktop>
      <div className="flex h-full gap-1 p-2">
        <div className="flex-1 space-y-1">
          <div className="h-1.5 bg-foreground/10 rounded" />
          <div className="h-1 bg-foreground/10 rounded w-3/4" />
          <div className="h-1 bg-foreground/10 rounded w-1/2" />
        </div>
      </div>
      {/* Expanded rich media overlay */}
      <div className="absolute inset-x-2 bottom-2 bg-gradient-to-br from-foreground/25 to-foreground/10 border border-foreground/30 rounded-lg p-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[5px] text-muted-foreground uppercase">Rich Media</span>
          <div className="w-2 h-2 rounded-full border border-foreground/30 flex items-center justify-center">
            <span className="text-[4px] text-muted-foreground">+</span>
          </div>
        </div>
        <div className="h-6 bg-foreground/10 rounded flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-foreground/30 animate-pulse" />
        </div>
        <div className="h-2 w-10 bg-foreground/20 rounded-full mx-auto" />
      </div>
    </Desktop>
  );

  if (name === "In-Stream") return (
    <Mobile>
      <div className="px-2">
        {/* Pre-roll */}
        <div className="relative bg-foreground/10 rounded overflow-hidden" style={{ height: 60 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border border-foreground/30 flex items-center justify-center">
              <span className="text-foreground/30 text-[8px] ml-0.5">▶</span>
            </div>
          </div>
          <div className="absolute top-1 left-1 bg-foreground/30 px-1 rounded text-[4px] font-mono text-background/80">Pre-roll Ad</div>
          <div className="absolute bottom-1 right-1 bg-foreground/40 px-1 py-0.5 rounded text-[4px] font-mono text-background/80">Skip ›</div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/20">
            <div className="h-full w-2/5 bg-foreground/60 rounded-l" />
          </div>
        </div>
      </div>
    </Mobile>
  );

  if (name === "Out-Stream") return (
    <Mobile>
      <div className="px-2 space-y-1">
        <div className="h-1 bg-foreground/10 rounded w-3/4" />
        {/* Out-stream video in content */}
        <div className="relative bg-foreground/10 rounded border border-foreground/20 overflow-hidden" style={{ height: 50 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-foreground/40 flex items-center justify-center">
              <span className="text-foreground/40 text-[7px]">▶</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-foreground/15 flex items-center justify-between px-1" style={{ height: "22%" }}>
            <span className="font-mono text-[4px] text-muted-foreground">Out-stream</span>
            <span className="font-mono text-[4px] text-muted-foreground">×</span>
          </div>
        </div>
        <div className="h-1 bg-foreground/10 rounded w-1/2" />
      </div>
    </Mobile>
  );

  if (name === "Rewarded") return (
    <Mobile>
      {/* Fullscreen rewarded overlay */}
      <div className="absolute inset-0 top-3 bg-gradient-to-b from-foreground/15 to-foreground/5 flex flex-col items-center justify-center gap-2 p-3">
        <div className="w-8 h-8 rounded-full bg-foreground/20 border border-foreground/30 flex items-center justify-center">
          <span className="text-base">🎁</span>
        </div>
        <div className="text-center">
          <div className="h-1.5 bg-foreground/30 rounded w-16 mb-1" />
          <div className="h-1 bg-foreground/20 rounded w-12" />
        </div>
        <div className="h-5 w-16 bg-foreground/30 rounded-full flex items-center justify-center">
          <span className="font-mono text-[5px] text-background/70">Watch & earn</span>
        </div>
        <div className="absolute top-1 right-2">
          <span className="font-mono text-[5px] text-muted-foreground">15s</span>
        </div>
      </div>
    </Mobile>
  );

  if (name === "In-App") return (
    <Mobile>
      <div className="px-2 space-y-1 pt-1">
        <div className="h-5 bg-foreground/5 rounded flex items-center px-1.5">
          <div className="flex gap-1">
            {[0,1,2,3].map(i => <div key={i} className="w-1 h-3.5 bg-foreground/10 rounded-sm" />)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[0,1,2,3,4,5].map(i => <div key={i} className="aspect-square bg-foreground/10 rounded" />)}
        </div>
      </div>
      {/* In-app banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-foreground/25 to-foreground/15 border-t border-foreground/20 flex items-center justify-between px-2" style={{ height: "16%" }}>
        <span className="font-mono text-[4px] text-muted-foreground uppercase">In-App Ad</span>
        <div className="h-2.5 w-6 bg-foreground/30 rounded-full" />
      </div>
    </Mobile>
  );

  if (name === "Push") return (
    <Desktop>
      <div className="p-2 space-y-1">
        <div className="h-1.5 bg-foreground/10 rounded w-3/4" />
        <div className="h-1 bg-foreground/10 rounded w-1/2" />
        <div className="h-1 bg-foreground/10 rounded w-2/3" />
      </div>
      {/* Push notification */}
      <div className="absolute top-2 right-2 w-28 bg-foreground/90 text-background rounded-lg p-2 shadow-lg">
        <div className="flex items-start gap-1.5">
          <div className="w-4 h-4 bg-background/20 rounded shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-1.5 bg-background/60 rounded mb-0.5" />
            <div className="h-1 bg-background/40 rounded w-4/5" />
            <div className="h-1 bg-background/30 rounded w-3/5 mt-0.5" />
          </div>
        </div>
      </div>
    </Desktop>
  );

  if (name === "Interstitial") return (
    <Mobile>
      {/* Full-screen interstitial */}
      <div className="absolute inset-0 top-3 bg-gradient-to-br from-foreground/20 to-foreground/5 flex flex-col items-center justify-between p-3">
        <div className="self-end">
          <div className="w-4 h-4 rounded-full border border-foreground/30 flex items-center justify-center">
            <span className="font-mono text-[6px] text-muted-foreground">×</span>
          </div>
        </div>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-foreground/15 rounded-xl mx-auto border border-foreground/20 flex items-center justify-center">
            <span className="font-mono text-[8px] text-muted-foreground">AD</span>
          </div>
          <div className="h-1.5 bg-foreground/30 rounded w-20" />
          <div className="h-1 bg-foreground/20 rounded w-14" />
        </div>
        <div className="h-6 w-20 bg-foreground/30 rounded-full flex items-center justify-center">
          <span className="font-mono text-[5px] text-background/70">Open App</span>
        </div>
      </div>
    </Mobile>
  );

  return null;
}

/** Full-page push overlay */
function FormatsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-foreground/10 flex items-center justify-between px-6 lg:px-12 h-16">
        <div className="flex items-center gap-3">
          <span className="font-display text-base font-semibold">Форматы рекламы</span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{formats.length} форматов</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
        >
          Закрыть
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {formats.map((format, i) => (
            <div
              key={format.name}
              className="group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Device mockup */}
              <div className="mb-4">
                <FormatVisual name={format.name} />
              </div>
              {/* Label */}
              <div className="font-display text-base mb-0.5 group-hover:translate-x-1 transition-transform duration-300">
                {format.name}
              </div>
              <div className="font-mono text-xs text-muted-foreground">{format.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Prevent background scroll when overlay open
  useEffect(() => {
    if (showFormats) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showFormats]);

  return (
    <>
      <section id="formats" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className={`text-center max-w-2xl mx-auto mb-12 lg:mb-20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
              <span className="w-6 h-px bg-foreground/30" />
              Рекламные форматы
              <span className="w-6 h-px bg-foreground/30" />
            </span>
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-4">
              Все форматы
              <br />
              digital-рекламы
            </h2>
            <p className="text-base text-muted-foreground mb-8">
              От баннеров до Smart TV. Размещение на сайтах, в соцсетях, мобильных приложениях и стриминговых сервисах.
            </p>
            <button
              onClick={() => setShowFormats(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 hover:border-foreground/60 hover:bg-foreground/[0.04] transition-all duration-300 text-sm font-medium rounded-full group"
            >
              Интерактивные примеры форматов
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Marquee row 1 — 60s */}
        <div className="w-full mb-4 overflow-hidden">
          <div className="flex gap-4" style={{ width: "max-content", animation: "marquee 60s linear infinite" }}>
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 shrink-0">
                {formats.map((format) => (
                  <div
                    key={`${format.name}-${setIndex}`}
                    className="shrink-0 px-6 py-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group"
                  >
                    <div className="text-sm font-medium group-hover:translate-x-1 transition-transform">{format.name}</div>
                    <div className="text-xs text-muted-foreground">{format.category}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee row 2 reverse — 50s */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-4" style={{ width: "max-content", animation: "marquee-reverse 50s linear infinite" }}>
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 shrink-0">
                {[...formats].reverse().map((format) => (
                  <div
                    key={`${format.name}-reverse-${setIndex}`}
                    className="shrink-0 px-6 py-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group"
                  >
                    <div className="text-sm font-medium group-hover:translate-x-1 transition-transform">{format.name}</div>
                    <div className="text-xs text-muted-foreground">{format.category}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showFormats && <FormatsOverlay onClose={() => setShowFormats(false)} />}
    </>
  );
}

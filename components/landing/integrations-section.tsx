"use client";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

const ACCENT = "#3d3aff";

const formats = [
  { name: "Banners", category: "Баннерная реклама" },
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

const formatDetails: Record<string, { device: "desktop" | "mobile" | "tv"; desc: string; details: string[] }> = {
  "Banners": {
    device: "desktop",
    desc: "Классические графические баннеры на сайтах. Размещаются в шапке, подвале или сайдбаре.",
    details: ["Leaderboard 728×90", "Medium Rectangle 300×250", "Half Page 300×600", "Billboard 970×250"],
  },
  "Video": {
    device: "desktop",
    desc: "Рекламные ролики внутри видеоплеера или автостарт в контенте.",
    details: ["Pre-roll (6–30s)", "Mid-roll в длинных видео", "Post-roll", "Bumper Ads 6s"],
  },
  "Native": {
    device: "mobile",
    desc: "Реклама, органично вписанная в контент сайта или приложения.",
    details: ["Статья-натив", "Карточка в ленте", "Рекомендации под контентом", "Список в поиске"],
  },
  "Mobile": {
    device: "mobile",
    desc: "Форматы, оадаптированные для мобильных браузеров и приложений.",
    details: ["Баннер 320×50", "Smart Banner", "Full Page Ad", "Адаптивный баннер"],
  },
  "CTV": {
    device: "tv",
    desc: "Реклама на умных ТВ и стриминговых сервисах.",
    details: ["Pre-roll CTV", "Pause Ad (пауза-баннер)", "L-Banner", "OTT Video Ad"],
  },
  "Rich Media": {
    device: "desktop",
    desc: "Интерактивные баннеры с анимацией, видео и игровыми элементами.",
    details: ["Expandable", "Float", "Видео-баннер", "Геймифицированный баннер"],
  },
  "In-Stream": {
    device: "mobile",
    desc: "Видеореклама до, во время или после основного видеоконтента.",
    details: ["Pre-roll с пропуском", "Pre-roll без пропуска", "Mid-roll", "Post-roll"],
  },
  "Out-Stream": {
    device: "mobile",
    desc: "Автостарт видео внутри текстового контента, без видеоплеера.",
    details: ["Инлайн-видео в ленте", "Плавающий блок", "Scroll-triggered", "Автомьют без звука"],
  },
  "Rewarded": {
    device: "mobile",
    desc: "Пользователь добровольно смотрит рекламу в обмен на награду.",
    details: ["Видео 15–30s", "Награда после просмотра", "Playable Ad", "Opt-in механика"],
  },
  "In-App": {
    device: "mobile",
    desc: "Реклама внутри мобильных приложений разных категорий.",
    details: ["Баннер внутри игры", "Баннер в приложении", "MREC 300×250", "Интерстишиал в приложении"],
  },
  "Push": {
    device: "desktop",
    desc: "Уведомления в браузере или на мобильном устройстве.",
    details: ["Web Push", "Mobile Push", "In-Page Push", "Calendar Push"],
  },
  "Interstitial": {
    device: "mobile",
    desc: "Полноэкранные объявления между экранами или в переходах.",
    details: ["Межстраничный", "Реклама при загрузке", "Video Interstitial", "Playable"],
  },
};

// === Device Mockups ===

function DesktopMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="border border-foreground/20 rounded-lg overflow-hidden bg-background" style={{ aspectRatio: "16/9" }}>
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/10 bg-foreground/[0.03] shrink-0">
          {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-foreground/20" />)}
          <div className="flex-1 h-3 rounded bg-foreground/5 ml-2" />
        </div>
        <div className="relative flex-1" style={{ height: "calc(100% - 32px)" }}>{children}</div>
      </div>
      <div className="w-8 h-2 bg-foreground/15 mx-auto" />
      <div className="w-16 h-0.5 bg-foreground/10 rounded mx-auto" />
    </div>
  );
}

function MobileMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto" style={{ width: 120 }}>
      <div className="border-2 border-foreground/25 rounded-[20px] overflow-hidden bg-background relative" style={{ height: 220 }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-foreground/20 rounded-b-full z-10" />
        <div className="pt-5 relative h-full">{children}</div>
      </div>
      <div className="w-8 h-1 bg-foreground/15 rounded mx-auto mt-1" />
    </div>
  );
}

function TVMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="border-2 border-foreground/25 rounded-lg overflow-hidden bg-foreground/5" style={{ aspectRatio: "16/9" }}>
        <div className="relative w-full h-full">{children}</div>
      </div>
      <div className="w-6 h-3 bg-foreground/15 mx-auto" />
      <div className="w-20 h-0.5 bg-foreground/10 rounded mx-auto" />
    </div>
  );
}

// === Format visuals with ACCENT color ===

function FormatPreview({ name, device }: { name: string; device: string }) {
  const a = ACCENT;

  const content: Record<string, React.ReactNode> = {
    "Banners": (
      <div className="relative w-full h-full p-3">
        <div className="space-y-1.5 pt-8">
          <div className="h-2 bg-foreground/10 rounded w-3/4" />
          <div className="h-1.5 bg-foreground/10 rounded w-1/2" />
          <div className="h-1.5 bg-foreground/10 rounded w-2/3" />
        </div>
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3" style={{ height: 28, background: a }}>
          <span className="font-mono text-[7px] text-white/90 uppercase tracking-wider">Central ADV</span>
          <span className="font-mono text-[6px] text-white/60">728×90</span>
        </div>
      </div>
    ),
    "Video": (
      <div className="relative w-full h-full bg-foreground/5 flex flex-col">
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute inset-2 rounded overflow-hidden" style={{ background: `${a}15`, border: `1.5px solid ${a}40` }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: a }}>
                <span className="text-white text-sm ml-0.5">▶</span>
              </div>
            </div>
            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[6px] font-mono text-white" style={{ background: a }}>AD</div>
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[6px] font-mono text-white/80" style={{ background: "rgba(0,0,0,0.4)" }}>Skip › 5s</div>
          </div>
        </div>
        <div className="h-2 bg-foreground/10">
          <div className="h-full w-1/3 rounded-l" style={{ background: a }} />
        </div>
      </div>
    ),
    "Native": (
      <div className="px-3 pt-2 space-y-2">
        <div className="h-1.5 bg-foreground/10 rounded" />
        <div className="h-1 bg-foreground/10 rounded w-3/4" />
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: `${a}40` }}>
          <div className="h-12 flex items-center justify-center" style={{ background: `${a}18` }}>
            <span className="font-mono text-[7px] uppercase" style={{ color: a }}>Sponsored Content</span>
          </div>
          <div className="p-2 space-y-1">
            <div className="h-1.5 bg-foreground/15 rounded" />
            <div className="h-1 bg-foreground/10 rounded w-4/5" />
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-[6px] text-muted-foreground">Sponsored</span>
              <div className="h-3.5 w-10 rounded-full flex items-center justify-center" style={{ background: a }}>
                <span className="text-[5px] text-white">Читать</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-foreground/10 rounded w-1/2" />
      </div>
    ),
    "Mobile": (
      <div className="relative h-full">
        <div className="px-3 pt-2 space-y-2">
          <div className="h-1.5 bg-foreground/10 rounded w-3/4" />
          <div className="h-1 bg-foreground/10 rounded w-1/2" />
          <div className="h-16 bg-foreground/5 rounded" />
          <div className="h-1 bg-foreground/10 rounded" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3" style={{ height: 32, background: a }}>
          <span className="font-mono text-[7px] text-white/90 uppercase tracking-wide">Central ADV — Кликните!</span>
          <span className="font-mono text-[6px] text-white/60">320×50</span>
        </div>
      </div>
    ),
    "CTV": (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-foreground/15 flex items-center justify-center">
            <span className="text-foreground/20 text-xl">▶</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4" style={{ height: "38%", background: `linear-gradient(to top, ${a}cc, ${a}44)` }}>
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <span className="font-mono text-[7px] text-white">LOGO</span>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-white/50 rounded w-3/4 mb-1" />
            <div className="h-1.5 bg-white/30 rounded w-1/2" />
          </div>
          <div className="h-7 w-14 rounded-full bg-white/30 flex items-center justify-center shrink-0">
            <span className="font-mono text-[7px] text-white">Узнать</span>
          </div>
        </div>
      </div>
    ),
    "Rich Media": (
      <div className="relative w-full h-full p-3">
        <div className="space-y-1.5">
          <div className="h-2 bg-foreground/10 rounded w-3/4" />
          <div className="h-1.5 bg-foreground/10 rounded w-1/2" />
        </div>
        <div className="absolute inset-x-3 bottom-3 rounded-xl overflow-hidden border" style={{ borderColor: `${a}50`, background: `${a}12` }}>
          <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: `1px solid ${a}30` }}>
            <span className="font-mono text-[7px] uppercase tracking-wider" style={{ color: a }}>Rich Media</span>
            <span className="font-mono text-[8px]" style={{ color: a }}>+</span>
          </div>
          <div className="p-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg" style={{ background: `${a}30` }}>
              <div className="w-full h-full rounded-lg animate-pulse" style={{ background: a, opacity: 0.4 }} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="h-1.5 bg-foreground/15 rounded" />
              <div className="h-1 bg-foreground/10 rounded w-2/3" />
            </div>
          </div>
          <div className="px-2 pb-2">
            <div className="h-6 rounded-full flex items-center justify-center" style={{ background: a }}>
              <span className="font-mono text-[6px] text-white">Узнать больше →</span>
            </div>
          </div>
        </div>
      </div>
    ),
    "In-Stream": (
      <div className="px-3 pt-2">
        <div className="h-1.5 bg-foreground/10 rounded w-3/4 mb-2" />
        <div className="relative rounded-lg overflow-hidden" style={{ height: 100, background: `${a}10`, border: `1.5px solid ${a}35` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: a }}>
              <span className="text-white text-xs ml-0.5">▶</span>
            </div>
          </div>
          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[6px] font-mono text-white" style={{ background: a }}>Pre-roll</div>
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[6px] font-mono text-white/70" style={{ background: "rgba(0,0,0,0.5)" }}>Skip › 5</div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-foreground/10">
            <div className="h-full w-2/5 rounded-l" style={{ background: a }} />
          </div>
        </div>
      </div>
    ),
    "Out-Stream": (
      <div className="px-3 pt-2 space-y-2">
        <div className="h-1.5 bg-foreground/10 rounded w-3/4" />
        <div className="h-1 bg-foreground/10 rounded w-1/2" />
        <div className="relative rounded-lg overflow-hidden" style={{ height: 80, background: `${a}10`, border: `1.5px solid ${a}35` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: a }}>
              <span className="text-white text-[10px] ml-0.5">▶</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1" style={{ background: `${a}40` }}>
            <span className="font-mono text-[6px] text-white">Out-stream • Автостарт</span>
            <span className="font-mono text-[8px] text-white/70">×</span>
          </div>
        </div>
        <div className="h-1 bg-foreground/10 rounded w-1/3" />
      </div>
    ),
    "Rewarded": (
      <div className="relative h-full">
        <div className="absolute inset-0 top-4 flex flex-col items-center justify-center gap-3 px-4" style={{ background: `${a}12`, borderTop: `2px solid ${a}40` }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: a }}>
            <span className="text-xl">🎁</span>
          </div>
          <div className="text-center">
            <div className="h-2 rounded w-24 mb-1" style={{ background: `${a}60` }} />
            <div className="h-1.5 bg-foreground/15 rounded w-16 mx-auto" />
          </div>
          <div className="h-7 w-28 rounded-full flex items-center justify-center" style={{ background: a }}>
            <span className="font-mono text-[7px] text-white">Watch & earn ▶</span>
          </div>
          <div className="absolute top-2 right-3">
            <span className="font-mono text-[7px]" style={{ color: a }}>15s</span>
          </div>
        </div>
      </div>
    ),
    "In-App": (
      <div className="relative h-full">
        <div className="px-3 pt-2 space-y-1">
          <div className="h-6 rounded flex items-center px-2" style={{ background: `${a}20` }}>
            <span className="font-mono text-[6px]" style={{ color: a }}>MyApp</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="aspect-square rounded-lg" style={{ background: i === 2 ? `${a}20` : "rgba(0,0,0,0.06)" }} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3" style={{ height: 30, background: a }}>
          <span className="font-mono text-[6px] text-white/90">In-App Banner</span>
          <div className="h-4 w-8 rounded-full bg-white/25 flex items-center justify-center">
            <span className="font-mono text-[5px] text-white">Клик</span>
          </div>
        </div>
      </div>
    ),
    "Push": (
      <div className="relative w-full h-full p-3">
        <div className="space-y-1.5">
          <div className="h-2 bg-foreground/10 rounded w-3/4" />
          <div className="h-1.5 bg-foreground/10 rounded w-1/2" />
          <div className="h-1.5 bg-foreground/10 rounded w-2/3" />
          <div className="h-1.5 bg-foreground/10 rounded w-3/5" />
        </div>
        <div className="absolute top-3 right-3 rounded-xl overflow-hidden shadow-lg" style={{ width: 140, background: a }}>
          <div className="flex items-start gap-2 p-2.5">
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-[8px]">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-2 bg-white/70 rounded mb-1" />
              <div className="h-1.5 bg-white/50 rounded w-4/5 mb-0.5" />
              <div className="h-1.5 bg-white/35 rounded w-3/5" />
            </div>
          </div>
          <div className="flex border-t border-white/20">
            <div className="flex-1 py-1.5 text-center border-r border-white/20">
              <span className="font-mono text-[6px] text-white/70">Отклонить</span>
            </div>
            <div className="flex-1 py-1.5 text-center">
              <span className="font-mono text-[6px] text-white">Открыть</span>
            </div>
          </div>
        </div>
      </div>
    ),
    "Interstitial": (
      <div className="relative h-full">
        <div className="absolute inset-0 top-4 flex flex-col items-center justify-between p-4" style={{ background: `${a}15` }}>
          <div className="self-end w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: `${a}60` }}>
            <span className="font-mono text-[8px]" style={{ color: a }}>×</span>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center" style={{ background: a }}>
              <span className="font-mono text-[9px] text-white font-bold">ADV</span>
            </div>
            <div>
              <div className="h-2 rounded w-24 mx-auto mb-1.5" style={{ background: `${a}70` }} />
              <div className="h-1.5 bg-foreground/15 rounded w-16 mx-auto" />
            </div>
          </div>
          <div className="h-9 w-32 rounded-full flex items-center justify-center" style={{ background: a }}>
            <span className="font-mono text-[8px] text-white">Узнать больше →</span>
          </div>
        </div>
      </div>
    ),
  };

  const inner = content[name] ?? null;

  if (device === "desktop") return <DesktopMockup>{inner}</DesktopMockup>;
  if (device === "mobile") return <MobileMockup>{inner}</MobileMockup>;
  if (device === "tv") return <TVMockup>{inner}</TVMockup>;
  return null;
}

// === Bottom-sheet overlay: 4/5 height, blurred backdrop on remaining 1/5 ===

function FormatsOverlay({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(0);
  const format = formats[active];
  const detail = formatDetails[format.name];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop — top 1/5, blurred semi-transparent like the header */}
      <div
        className="shrink-0 cursor-pointer"
        style={{ height: "20vh", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        onClick={onClose}
      />

      {/* Panel — bottom 4/5 */}
      <div
        className="relative bg-foreground text-background overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500"
        style={{ height: "80vh" }}
      >
        {/* Diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)`
          }} />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 lg:px-12 h-16 border-b border-background/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-semibold">Форматы рекламы</span>
            <span className="font-mono text-[10px] text-background/40 uppercase tracking-widest">{formats.length} форматов</span>
          </div>
          <button onClick={onClose} className="flex items-center gap-1.5 text-xs text-background/50 hover:text-background transition-colors">
            Закрыть <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="relative z-10 flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

              {/* Left: format list */}
              <div className="space-y-0">
                {formats.map((f, i) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`w-full text-left py-5 border-b border-background/10 transition-all duration-500 group ${
                      active === i ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <span className="font-display text-xl text-background/30 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-display mb-1 group-hover:translate-x-2 transition-transform duration-300">
                          {f.name}
                        </h3>
                        <p className="text-sm text-background/50">{f.category}</p>
                        {active === i && (
                          <div className="mt-3 h-px bg-background/20 overflow-hidden">
                            <div className="h-full bg-background" style={{ animation: "progress 8s linear forwards" }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right: sticky device preview */}
              <div className="lg:sticky lg:top-8 self-start">
                <div className="border border-background/10 overflow-hidden">
                  <div className="px-6 py-4 border-b border-background/10 flex items-center justify-between">
                    <div className="flex gap-2">
                      {[0,1,2].map(i => <div key={i} className="w-3 h-3 rounded-full bg-background/20" />)}
                    </div>
                    <span className="text-xs font-mono text-background/40">{format.name}</span>
                  </div>

                  <div className="p-6 bg-background/[0.03]">
                    <div key={format.name} className="transition-all duration-300">
                      <FormatPreview name={format.name} device={detail.device} />
                    </div>
                  </div>

                  <div className="p-6 border-t border-background/10">
                    <p className="text-sm text-background/60 mb-4">{detail.desc}</p>
                    <ul className="space-y-2">
                      {detail.details.map((d, li) => (
                        <li key={`${format.name}-${li}`} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                          <span className="text-sm text-background/70">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-6 py-4 border-t border-background/10 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ACCENT }} />
                    <span className="text-xs font-mono text-background/40">Доступно для запуска</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
}

// === Main section ===

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showFormats ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showFormats]);

  return (
    <>
      <section id="formats" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className={`text-center max-w-2xl mx-auto mb-12 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
              <span className="w-6 h-px bg-foreground/30" />
              Рекламные форматы
              <span className="w-6 h-px bg-foreground/30" />
            </span>
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-4">
              Все форматы<br />
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
            {[...Array(4)].map((_, si) => (
              <div key={si} className="flex gap-4 shrink-0">
                {formats.map(f => (
                  <div key={`${f.name}-${si}`} className="shrink-0 px-6 py-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group">
                    <div className="text-sm font-medium group-hover:translate-x-1 transition-transform">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.category}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee row 2 reverse — 50s */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-4" style={{ width: "max-content", animation: "marquee-reverse 50s linear infinite" }}>
            {[...Array(4)].map((_, si) => (
              <div key={si} className="flex gap-4 shrink-0">
                {[...formats].reverse().map(f => (
                  <div key={`${f.name}-reverse-${si}`} className="shrink-0 px-6 py-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group">
                    <div className="text-sm font-medium group-hover:translate-x-1 transition-transform">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.category}</div>
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

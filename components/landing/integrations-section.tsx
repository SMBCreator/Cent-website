"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

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

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="formats" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
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
          <Link
            href="/formats"
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 hover:border-foreground/60 hover:bg-foreground/[0.04] transition-all duration-300 text-sm font-medium rounded-full group"
          >
            Интерактивные примеры форматов
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
      
      {/* Full-width marquee row 1 */}
      <div className="w-full mb-4 overflow-hidden">
        <div className="flex gap-4 marquee" style={{ width: "max-content" }}>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-4 shrink-0">
              {formats.map((format) => (
                <div
                  key={`${format.name}-${setIndex}`}
                  className="shrink-0 px-6 py-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group"
                >
                  <div className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                    {format.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{format.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Full-width marquee row 2 - reverse */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-4 marquee-reverse" style={{ width: "max-content" }}>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-4 shrink-0">
              {[...formats].reverse().map((format) => (
                <div
                  key={`${format.name}-reverse-${setIndex}`}
                  className="shrink-0 px-6 py-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group"
                >
                  <div className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                    {format.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{format.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

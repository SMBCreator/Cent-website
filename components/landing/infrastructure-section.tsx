"use client";

import { useEffect, useState, useRef } from "react";

const technologies = [
  { name: "Bidding Autopilot", description: "Автоматическое управление ставками" },
  { name: "Dynamic Creatives", description: "Динамическая персонализация креативов" },
  { name: "Omni-Channel", description: "Единая кампания на всех каналах" },
  { name: "Anti Fraud", description: "Защита от мошеннического трафика" },
  { name: "Brand Safety", description: "Контроль безопасности бренда" },
  { name: "Cross-device", description: "Отслеживание между устройствами" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTech, setActiveTech] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % technologies.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="tech" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
              <span className="w-6 h-px bg-foreground/30" />
              Технологии
            </span>
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-6">
              Programmatic
              <br />
              нового уровня
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Programmatic реклама - это не просто закупка трафика, а интеллектуальное 
              управление аудиторией в реальном времени. Central ADV использует передовые технологии.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl lg:text-4xl font-display font-semibold mb-1">100+</div>
                <div className="text-xs text-muted-foreground">Рекламных сетей</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-display font-semibold mb-1">RTB</div>
                <div className="text-xs text-muted-foreground">Аукцион в реальном времени</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-display font-semibold mb-1">AI</div>
                <div className="text-xs text-muted-foreground">Машинное обучение</div>
              </div>
            </div>
          </div>

          {/* Right: Technology list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-5 py-3 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Tech Stack</span>
                <span className="flex items-center gap-2 text-[10px] font-mono text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Активно
                </span>
              </div>

              {/* Technologies */}
              <div>
                {technologies.map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`px-5 py-4 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeTech === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span 
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          activeTech === index ? "bg-foreground" : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="text-sm font-medium">{tech.name}</div>
                        <div className="text-xs text-muted-foreground">{tech.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

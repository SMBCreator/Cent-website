"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-display font-semibold tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

const metrics = [
  { 
    value: 100, 
    suffix: "+", 
    prefix: "",
    label: "Рекламных сетей DSP/SSP",
  },
  { 
    value: 200, 
    suffix: "+", 
    prefix: "",
    label: "Довольных рекламодателей",
  },
  { 
    value: 24, 
    suffix: "ч", 
    prefix: "",
    label: "Запуск рекламной кампании",
  },
  { 
    value: 5, 
    suffix: "+", 
    prefix: "",
    label: "Лет на рынке digital-рекламы",
  },
];

export function MetricsSection() {
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
    <section id="metrics" ref={sectionRef} className="relative py-24 lg:py-32 border-y border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-20">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
              <span className="w-6 h-px bg-foreground/30" />
              Результаты
            </span>
            <h2
              className={`text-3xl lg:text-5xl font-display tracking-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Цифры, которые
              <br />
              говорят сами за себя
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Активно работаем
            </span>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-background p-6 lg:p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter 
                end={typeof metric.value === 'number' ? metric.value : 0} 
                suffix={metric.suffix} 
                prefix={metric.prefix}
              />
              <div className="mt-3 text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

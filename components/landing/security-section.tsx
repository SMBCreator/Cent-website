"use client";

import { useEffect, useState, useRef } from "react";
import { Layers, BarChart3, Clock, Settings } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Полный full-service",
    description: "Полный цикл работ: от разработки стратегии до отчётности. Мы берём на себя всё.",
  },
  {
    icon: Settings,
    title: "Медиапланирование и стратегия",
    description: "Анализ рынка, аудитории, подбор каналов и форматов, составление медиаплана.",
  },
  {
    icon: BarChart3,
    title: "Оптимизация и аналитика",
    description: "Постоянное тестирование гипотез, работа с данными и AI для улучшения результатов.",
  },
  {
    icon: Clock,
    title: "Поддержка 24/7",
    description: "Команда и автоматизированные системы мониторинга следят за кампаниями и оперативно вносят изменения.",
  },
];

const industries = ["Авто", "FMCG", "Фарма", "E-commerce", "Услуги"];

export function SecuritySection() {
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
    <section id="service" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
              <span className="w-6 h-px bg-foreground/30" />
              Full-Service
            </span>
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-6">
              Полный сервис
              <br />
              для вашего бренда
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Мы помогаем бизнесу находить свою аудиторию в digital-пространстве 
              и взаимодействовать с ней максимально эффективно.
            </p>

            {/* Industries */}
            <div className="flex flex-wrap gap-2">
              {industries.map((industry, index) => (
                <span
                  key={industry}
                  className={`px-3 py-1.5 border border-foreground/10 text-xs font-mono transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Services */}
          <div className="grid gap-4">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`p-5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-9 h-9 flex items-center justify-center border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <service.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

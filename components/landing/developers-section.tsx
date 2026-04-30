"use client";

import { useState, useEffect, useRef } from "react";

const placements = [
  { name: "DSP/SSP сети", count: "100+" },
  { name: "Видеоплатформы", count: "20+" },
  { name: "Соцсети", count: "5+" },
  { name: "Мобильные приложения", count: "1000+" },
  { name: "Онлайн-кинотеатры", count: "10+" },
  { name: "Smart TV", count: "15+" },
];

const advantages = [
  { 
    title: "Опытная команда", 
    description: "Маркетологи, аналитики и специалисты по рекламе."
  },
  { 
    title: "Понятный язык", 
    description: "Говорим просто о сложном digital-маркетинге."
  },
  { 
    title: "Полная ответственность", 
    description: "Берём всю работу на себя от А до Я."
  },
  { 
    title: "Прозрачные отчёты", 
    description: "Детальная аналитика по каждой кампании."
  },
];

export function DevelopersSection() {
  const [activeItem, setActiveItem] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % placements.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="team" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
              <span className="w-6 h-px bg-foreground/30" />
              Команда
            </span>
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-6">
              Ваши задачи -
              <br />
              <span className="text-muted-foreground">наш приоритет</span>
            </h2>
            <p className="text-base text-muted-foreground mb-10 leading-relaxed">
              Наша команда - это маркетологи, аналитики и специалисты по рекламе, 
              которые берут на себя всю работу и говорят на понятном языке. 
              Вам не нужно разбираться в настройках, просто поставьте задачу - мы всё сделаем.
            </p>
            
            {/* Trust badge */}
            <div className="p-5 border border-foreground/10 bg-foreground/[0.02] mb-6">
              <div className="text-3xl font-display font-semibold mb-1">200+</div>
              <div className="text-sm text-muted-foreground">рекламодателей доверяют Central ADV</div>
            </div>
            
            {/* Advantages */}
            <div className="grid grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div
                  key={advantage.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="text-sm font-medium mb-0.5">{advantage.title}</h3>
                  <p className="text-xs text-muted-foreground">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Placements */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-5 py-3 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Где размещаем</span>
                <span className="flex items-center gap-2 text-[10px] font-mono text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Активные площадки
                </span>
              </div>
              
              {/* Placements list */}
              <div>
                {placements.map((placement, index) => (
                  <div
                    key={placement.name}
                    className={`px-5 py-4 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeItem === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span 
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          activeItem === index ? "bg-foreground" : "bg-foreground/20"
                        }`}
                      />
                      <span className="text-sm font-medium">{placement.name}</span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{placement.count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Links */}
            <div className="mt-5 flex items-center gap-5 text-xs">
              <a href="#contact" className="text-foreground hover:underline underline-offset-4">
                Связаться с нами
              </a>
              <span className="text-foreground/20">|</span>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Скачать презентацию
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

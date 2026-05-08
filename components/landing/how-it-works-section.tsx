"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Заявка и бриф",
    description: "Оставляете контактные данные на сайте. Заполняем бриф по почте или телефону, уточняем цели, аудиторию, продукт.",
    details: [
      "Анализ бизнес-целей",
      "Определение целевой аудитории",
      "Изучение продукта и конкурентов",
      "Формирование KPI кампании",
    ],
  },
  {
    number: "II",
    title: "Медиаплан и согласование",
    description: "Подбираем стратегии и каналы, рекламные форматы. Обсуждаем бюджет, сроки и параметры запуска кампании.",
    details: [
      "Выбор рекламных каналов",
      "Подбор форматов размещения",
      "Расчёт бюджета и прогноз",
      "Финальное согласование",
    ],
  },
  {
    number: "III",
    title: "Запуск и аналитика",
    description: "Кампания запускается, проводится тестирование, вносятся корректировки и оптимизация по результатам.",
    details: [
      "Запуск рекламной кампании",
      "A/B тестирование креативов",
      "Оптимизация в реальном времени",
      "Подробные отчёты клиенту",
    ],
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#2563eb] text-white overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">
            <span className="w-6 h-px bg-white/30" />
            Процесс работы
          </span>
          <h2
            className={`text-3xl lg:text-5xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Наш подход.
            <br />
            <span className="text-white/60">Запуск за 24 часа!</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-6 border-b border-white/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-5">
                  <span className="font-display text-2xl text-white/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-display mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-white/20 overflow-hidden">
                        <div 
                          className="h-full bg-white w-0"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Details display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-white/10 overflow-hidden">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <span className="text-xs font-mono text-white/40">Этап {activeStep + 1}</span>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[240px]">
                <h4 className="text-xl font-display mb-5 text-white">
                  {steps[activeStep].title}
                </h4>
                <ul className="space-y-3">
                  {steps[activeStep].details.map((detail, lineIndex) => (
                    <li 
                      key={`${activeStep}-${lineIndex}`} 
                      className="flex items-center gap-3 code-line-reveal"
                      style={{ 
                        animationDelay: `${lineIndex * 100}ms`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                      <span className="text-white/70 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-white/40">Готовы к работе</span>
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
        
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Гибкий и точный таргетинг",
    description: "Находим вашу аудиторию среди миллионов пользователей. Сегментация по интересам, поведению, геолокации и демографии.",
    visual: "target",
  },
  {
    number: "02",
    title: "AI-управление ставками",
    description: "Интеллектуальная система автоматически оптимизирует ставки в реальном времени для максимальной эффективности бюджета.",
    visual: "ai",
  },
  {
    number: "03",
    title: "Защита от фрода и ботов",
    description: "Многоуровневая система верификации трафика. Ваш бюджет работает только на реальных пользователей.",
    visual: "security",
  },
  {
    number: "04",
    title: "Кросс-платформенность",
    description: "Единая кампания на всех устройствах: десктоп, мобильные, Smart TV. Омниканальный охват вашей аудитории.",
    visual: "cross",
  },
];

function TargetVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Target circles */}
      <circle cx="100" cy="80" r="50" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <circle cx="100" cy="80" r="35" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="100" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <circle cx="100" cy="80" r="8" fill="currentColor">
        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Scanning lines */}
      <line x1="50" y1="80" x2="150" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="100" y1="30" x2="100" y2="130" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      
      {/* Moving dot */}
      <circle r="4" fill="currentColor" opacity="0.8">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#targetPath" />
        </animateMotion>
      </circle>
      <path id="targetPath" d="M 50 80 A 50 50 0 1 1 50 79.9" fill="none" />
    </svg>
  );
}

function AIVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Central node */}
      <circle cx="100" cy="80" r="12" fill="currentColor">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 50;
        return (
          <g key={i}>
            <line
              x1="100"
              y1="80"
              x2={100 + Math.cos(angle) * radius}
              y2={80 + Math.sin(angle) * radius}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
            
            <circle
              cx={100 + Math.cos(angle) * radius}
              cy={80 + Math.sin(angle) * radius}
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
      
      {/* Pulse rings */}
      <circle cx="100" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="20;60" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function SecurityVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Shield */}
      <path
        d="M 100 20 L 150 40 L 150 90 Q 150 130 100 145 Q 50 130 50 90 L 50 40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Inner shield */}
      <path
        d="M 100 35 L 135 50 L 135 85 Q 135 115 100 128 Q 65 115 65 85 L 65 50 Z"
        fill="currentColor"
        opacity="0.1"
      >
        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite" />
      </path>
      
      {/* Check mark */}
      <path
        d="M 80 80 L 95 95 L 120 65"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Scan lines */}
      <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="y1" values="40;120;40" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y2" values="40;120;40" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

function CrossVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Devices */}
      {/* Desktop */}
      <rect x="70" y="40" width="60" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="100" y1="80" x2="100" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="85" y1="90" x2="115" y2="90" stroke="currentColor" strokeWidth="2" />
      
      {/* Mobile */}
      <rect x="40" y="55" width="20" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="85" r="2" fill="currentColor" />
      
      {/* TV */}
      <rect x="140" y="50" width="30" height="22" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="148" y1="72" x2="162" y2="72" stroke="currentColor" strokeWidth="2" />
      
      {/* Connection lines */}
      <path d="M 60 70 Q 80 100 100 100 Q 120 100 155 70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
      </path>
      
      {/* Data packets */}
      <circle r="3" fill="currentColor">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath href="#crossPath" />
        </animateMotion>
      </circle>
      <path id="crossPath" d="M 60 70 Q 80 100 100 100 Q 120 100 155 70" fill="none" />
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "target":
      return <TargetVisual />;
    case "ai":
      return <AIVisual />;
    case "security":
      return <SecurityVisual />;
    case "cross":
      return <CrossVisual />;
    default:
      return <TargetVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 py-10 lg:py-16 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-xs text-muted-foreground">{feature.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-foreground">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
            <span className="w-6 h-px bg-foreground/30" />
            Ключевые возможности
          </span>
          <h2
            className={`text-3xl lg:text-5xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Programmatic-реклама
            <br />
            <span className="text-muted-foreground">нового уровня</span>
          </h2>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

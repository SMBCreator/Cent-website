"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const words = ["объясним", "подскажем", "посчитаем", "запустим"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-48 lg:pb-56">
        {/* Eyebrow */}
        <div 
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span className="w-6 h-px bg-foreground/30" />
            Programmatic Advertising Platform
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-8">
          <h1 
            className={`text-[clamp(1.75rem,5vw,3.5rem)] font-display leading-[1.15] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Технологии, экспертиза</span>
            <span className="block">и персональный подход</span>
            <span className="block text-muted-foreground">
              для ваших целей в digital
            </span>
          </h1>
        </div>
        
        {/* Animated slogan */}
        <div 
          className={`mb-10 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xl lg:text-2xl text-muted-foreground">
            Мы{" "}
            <span className="relative inline-block text-foreground font-medium">
              <span 
                key={wordIndex}
                className="inline-flex"
              >
                {words[wordIndex].split("").map((char, i) => (
                  <span
                    key={`${wordIndex}-${i}`}
                    className="inline-block animate-char-in"
                    style={{
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="absolute -bottom-0.5 left-0 right-0 h-1.5 bg-[#2563eb]/20" />
            </span>
          </span>
        </div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <p 
            className={`text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Комплексные Programmatic решения для брендов. Помогаем бизнесу находить свою аудиторию в digital-пространстве.
          </p>
          
          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 h-12 text-sm rounded-full group"
            >
              Написать
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-6 text-sm rounded-full border-foreground/20 hover:bg-foreground/5"
            >
              Подробнее
            </Button>
          </div>
        </div>
        
      </div>
      
      {/* Stats marquee */}
      <div 
        className={`absolute bottom-8 lg:bottom-12 left-0 right-0 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-12 marquee whitespace-nowrap py-4 border-t border-b border-foreground/5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12">
              {[
                { value: "100+", label: "рекламных сетей", company: "DSP/SSP" },
                { value: "200+", label: "рекламодателей", company: "ДОВЕРЯЮТ" },
                { value: "24ч", label: "запуск кампании", company: "СКОРОСТЬ" },
                { value: "5+", label: "отраслей", company: "ОПЫТ" },
              ].map((stat) => (
                <div key={`${stat.company}-${i}`} className="flex items-baseline gap-3">
                  <span className="text-3xl lg:text-4xl font-display font-semibold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-[10px] mt-0.5 uppercase tracking-wider">{stat.company}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Central ADV помогли нам увеличить охват в 3 раза при том же бюджете. Отличная оптимизация и прозрачная аналитика.",
    author: "Александр Петров",
    role: "Директор по маркетингу",
    company: "АвтоПлюс",
    metric: "3x рост охвата",
  },
  {
    quote: "Запустили кампанию за один день. Команда реально понимает что делает и объясняет всё простым языком.",
    author: "Мария Иванова",
    role: "Brand Manager",
    company: "FreshFood",
    metric: "24ч до запуска",
  },
  {
    quote: "Наконец-то нашли агентство, которое не просто тратит бюджет, а реально работает на результат.",
    author: "Дмитрий Козлов",
    role: "CEO",
    company: "PharmaTech",
    metric: "ROI 280%",
  },
  {
    quote: "Качественный трафик, никакого фрода. Видим реальные конверсии и довольных клиентов.",
    author: "Елена Смирнова",
    role: "E-commerce Director",
    company: "StyleShop",
    metric: "+45% конверсий",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="relative py-24 lg:py-32 border-t border-foreground/10 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Отзывы клиентов
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-[10px] text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main Quote */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <blockquote
              className={`transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.2] tracking-tight text-foreground">
                &laquo;{activeTestimonial.quote}&raquo;
              </p>
            </blockquote>

            {/* Author */}
            <div
              className={`mt-8 flex items-center gap-4 transition-all duration-300 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <span className="font-display text-lg text-foreground">
                  {activeTestimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{activeTestimonial.author}</p>
                <p className="text-xs text-muted-foreground">
                  {activeTestimonial.role}, {activeTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`p-6 border border-foreground/10 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase block mb-3">
                Результат
              </span>
              <p className="font-display text-2xl md:text-3xl text-foreground">
                {activeTestimonial.metric}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-1.5 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-1.5 transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-6 bg-foreground"
                      : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Company Logos Marquee Label */}
        <div className="mt-16 pt-10 border-t border-foreground/10">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-6 text-center">
            Решения для отраслей
          </p>
        </div>
      </div>
      
      {/* Full-width marquee outside container */}
      <div className="w-full">
        <div className="flex gap-12 items-center marquee">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-12 items-center shrink-0">
              {["Авто", "FMCG", "Фарма", "E-commerce", "Услуги", "Финансы", "Недвижимость", "Телеком"].map(
                (industry) => (
                  <span
                    key={`${setIdx}-${industry}`}
                    className="font-display text-lg md:text-xl text-foreground/30 whitespace-nowrap hover:text-foreground transition-colors duration-300"
                  >
                    {industry}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  "Услуги": [
    { name: "Programmatic", href: "#features" },
    { name: "Display реклама", href: "#formats" },
    { name: "Видеореклама", href: "#formats" },
    { name: "Мобильная реклама", href: "#formats" },
  ],
  "Компания": [
    { name: "О нас", href: "#team" },
    { name: "Процесс работы", href: "#how-it-works" },
    { name: "Технологии", href: "#tech" },
    { name: "Блог", href: "#" },
  ],
  "Отрасли": [
    { name: "Авто", href: "#" },
    { name: "FMCG", href: "#" },
    { name: "Фарма", href: "#" },
    { name: "E-commerce", href: "#" },
  ],
  "Контакты": [
    { name: "info@central-adv.com", href: "mailto:info@central-adv.com" },
    { name: "+7 906 668 35 03", href: "tel:+79066683503", badge: "СПб" },
    { name: "+375 44 786-91-17", href: "tel:+375447869117", badge: "Минск" },
  ],
};

const socialLinks = [
  { name: "ВКонтакте", href: "https://vk.com/centraladv" },
  { name: "Telegram", href: "#" },
  { name: "Email", href: "mailto:info@central-adv.com" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-12 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-5">
                <span className="text-xl font-display">Central ADV</span>
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">buying</span>
              </a>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                Технологии, экспертиза и персональный подход для достижения ваших целей в digital-маркетинге.
              </p>

              {/* Social Links */}
              <div className="flex gap-5">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-xs font-medium mb-4 uppercase tracking-wider">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            2025 Central ADV. Все права защищены.
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Принимаем заявки
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

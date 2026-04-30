"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  "Все",
  "B2B",
  "Ecommerce",
  "FMCG",
  "Retail",
  "Автомобили",
  "Маркетплейс",
  "Недвижимость",
  "Фарма",
  "Чековые промо",
];

const cases = [
  {
    id: 1,
    title: "Запуск нового SUV на рынок",
    client: "АвтоПремиум",
    category: "Автомобили",
    image: null,
    goals: "Повышение знания бренда нового SUV среди аудитории 28–45 лет",
    actions: "Programmatic видео + rich media баннеры, таргетинг по интересам к авто",
    formats: "Pre-roll, Rich Media, Display",
    result: "Охват 4,2 млн уникальных пользователей, рост знания +18%",
  },
  {
    id: 2,
    title: "Рост продаж в e-commerce",
    client: "StyleShop",
    category: "Ecommerce",
    image: null,
    goals: "Увеличить количество транзакций в интернет-магазине на 30%",
    actions: "Ретаргетинг по брошенным корзинам, динамические баннеры с товарами",
    formats: "Dynamic Display, In-App, Mobile Banner",
    result: "+45% конверсий, CPO снижен на 22%",
  },
  {
    id: 3,
    title: "Национальный запуск FMCG-продукта",
    client: "FreshFood",
    category: "FMCG",
    image: null,
    goals: "Быстрый охват целевой аудитории 18–35 лет по всей стране за 2 недели",
    actions: "Масштабная programmatic кампания с частотным таргетингом",
    formats: "Video, Display, Native, CTV",
    result: "Охват 7,8 млн человек, частота 4.2 контакта на пользователя",
  },
  {
    id: 4,
    title: "Продвижение аптечной сети",
    client: "PharmaTech",
    category: "Фарма",
    image: null,
    goals: "Привлечение трафика в офлайн-аптеки через геотаргетинг",
    actions: "Гиперлокальный таргетинг в радиусе 1 км от аптек, мобильная реклама",
    formats: "Mobile Banner, In-App, Push",
    result: "ROI 280%, рост визитов в аптеки +23%",
  },
  {
    id: 5,
    title: "B2B лидогенерация для SaaS",
    client: "TechSolutions",
    category: "B2B",
    image: null,
    goals: "Привлечение квалифицированных лидов среди IT-директоров и CTO",
    actions: "Таргетинг по профессиональным интересам, нативные материалы в деловых медиа",
    formats: "Native, Display, In-Stream Video",
    result: "CPL снижен на 35%, 142 квалифицированных лида за месяц",
  },
  {
    id: 6,
    title: "Акция для торговой сети",
    client: "RetailMax",
    category: "Retail",
    image: null,
    goals: "Анонс скидочной акции и рост трафика в магазины в выходные",
    actions: "Флайтовая кампания с пиком в пятницу-субботу, геотаргетинг по районам",
    formats: "Display, Mobile, Push, Out-Stream",
    result: "Трафик в магазины в выходные +31%, CTR 0.38%",
  },
  {
    id: 7,
    title: "Продвижение ЖК бизнес-класса",
    client: "GrandEstate",
    category: "Недвижимость",
    image: null,
    goals: "Привлечение заявок от аудитории с доходом выше среднего",
    actions: "Таргетинг по поведенческим паттернам, rich media с 3D-визуализацией",
    formats: "Rich Media, Video, Display, Native",
    result: "87 целевых заявок, стоимость заявки в 2.1 раза ниже рынка",
  },
  {
    id: 8,
    title: "Чековое промо для маркетплейса",
    client: "MegaMall",
    category: "Чековые промо",
    image: null,
    goals: "Вовлечение покупателей в чековую акцию и рост среднего чека",
    actions: "Таргетинг на покупателей категорий, интерактивные форматы с механикой",
    formats: "Interstitial, Rich Media, In-App",
    result: "Участников акции 23 000+, средний чек вырос на 17%",
  },
  {
    id: 9,
    title: "Запуск нового маркетплейса",
    client: "QuickMart",
    category: "Маркетплейс",
    image: null,
    goals: "Привлечение первых покупателей и продавцов на платформу",
    actions: "Двойная аудитория (B2C + B2B), сплит бюджета на знание и перформанс",
    formats: "Video, Display, Native, Mobile",
    result: "12 000 регистраций за первый месяц, CPA ниже плана на 28%",
  },
];

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? cases
    : cases.filter(c => c.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10 group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Назад
        </Link>

        <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
          <span className="w-6 h-px bg-foreground/30" />
          Портфолио
        </span>
        <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-4">
          Кейсы
          <br />
          <span className="text-muted-foreground">клиентов</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Реальные результаты для брендов из разных отраслей.
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-mono rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group border border-foreground/10 hover:border-foreground/30 transition-all duration-300 flex flex-col"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center border-b border-foreground/10 relative overflow-hidden">
                <div className="text-center">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{item.client}</div>
                  <div className="font-mono text-[8px] text-muted-foreground/50 mt-1">{item.category}</div>
                </div>
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
                }} />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[9px] text-muted-foreground border border-foreground/10 px-2 py-1 rounded-full whitespace-nowrap">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  <div>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Цель</span>
                    <p className="text-xs text-foreground/70 mt-0.5 leading-relaxed">{item.goals}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Что делали</span>
                    <p className="text-xs text-foreground/70 mt-0.5 leading-relaxed">{item.actions}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Форматы</span>
                    <p className="text-xs text-foreground/70 mt-0.5">{item.formats}</p>
                  </div>
                </div>

                {/* Result */}
                <div className="pt-3 border-t border-foreground/10">
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Результат</span>
                  <p className="text-sm font-display text-foreground mt-1">{item.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-mono text-sm">Нет кейсов в этой категории</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl mb-2">Готовы к следующему кейсу?</h3>
            <p className="text-sm text-muted-foreground">Обсудим вашу задачу и предложим стратегию</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-all duration-300 group shrink-0"
          >
            Обсудить кампанию
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

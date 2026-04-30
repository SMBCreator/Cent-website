import Link from "next/link";

const formatExamples = [
  {
    id: "banner-leaderboard",
    name: "Leaderboard Banner",
    size: "728×90",
    device: "desktop",
    description: "Горизонтальный баннер в шапке или подвале страницы",
    color: "from-foreground/5 to-foreground/10",
  },
  {
    id: "banner-halfpage",
    name: "Half Page",
    size: "300×600",
    device: "desktop",
    description: "Вертикальный баннер в сайдбаре",
    color: "from-foreground/5 to-foreground/10",
  },
  {
    id: "banner-mrec",
    name: "Medium Rectangle",
    size: "300×250",
    device: "desktop",
    description: "Самый популярный формат в контентных блоках",
    color: "from-foreground/5 to-foreground/10",
  },
  {
    id: "mobile-banner",
    name: "Mobile Banner",
    size: "320×50",
    device: "mobile",
    description: "Тонкий баннер в приложении или мобильном сайте",
    color: "from-foreground/5 to-foreground/10",
  },
  {
    id: "mobile-interstitial",
    name: "Interstitial",
    size: "320×480",
    device: "mobile",
    description: "Полноэкранный формат между экранами приложения",
    color: "from-foreground/5 to-foreground/10",
  },
  {
    id: "ctv-banner",
    name: "CTV / Smart TV",
    size: "1920×1080",
    device: "tv",
    description: "Оверлей или пауза-баннер на стриминговых сервисах",
    color: "from-foreground/5 to-foreground/10",
  },
];

function DesktopMockup({ label, size }: { label: string; size: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Screen */}
      <div className="relative w-full border-2 border-foreground/20 rounded-t-lg bg-background overflow-hidden" style={{ aspectRatio: "16/10" }}>
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/10 bg-foreground/[0.03]">
          <span className="w-2 h-2 rounded-full bg-foreground/20" />
          <span className="w-2 h-2 rounded-full bg-foreground/20" />
          <span className="w-2 h-2 rounded-full bg-foreground/20" />
          <div className="flex-1 h-4 rounded bg-foreground/5 ml-2" />
        </div>
        {/* Page content placeholder */}
        <div className="p-3 space-y-2">
          <div className="h-2 bg-foreground/10 rounded w-3/4" />
          <div className="h-2 bg-foreground/10 rounded w-1/2" />
        </div>
        {/* Banner placeholder */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-br from-foreground/10 to-foreground/20 border-t border-foreground/20" style={{ height: "28%" }}>
          <div className="text-center">
            <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{label}</div>
            <div className="font-mono text-[8px] text-muted-foreground/60">{size}</div>
          </div>
        </div>
      </div>
      {/* Stand */}
      <div className="w-8 h-2 bg-foreground/15 mx-auto" />
      <div className="w-16 h-1 bg-foreground/10 rounded" />
    </div>
  );
}

function MobileMockup({ label, size, full }: { label: string; size: string; full?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative border-2 border-foreground/20 rounded-2xl bg-background overflow-hidden" style={{ width: 90, height: 160 }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-foreground/20 rounded-b-full" />
        {/* Content */}
        <div className="pt-5 px-2 space-y-1.5">
          <div className="h-1.5 bg-foreground/10 rounded w-full" />
          <div className="h-1.5 bg-foreground/10 rounded w-2/3" />
          <div className="h-1.5 bg-foreground/10 rounded w-3/4" />
        </div>
        {/* Banner */}
        {full ? (
          <div className="absolute inset-x-0 bottom-0 top-8 flex items-center justify-center bg-gradient-to-br from-foreground/10 to-foreground/20 border border-foreground/20 m-1 rounded">
            <div className="text-center">
              <div className="font-mono text-[7px] text-muted-foreground uppercase">{label}</div>
              <div className="font-mono text-[6px] text-muted-foreground/60">{size}</div>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-2 left-1 right-1 flex items-center justify-center bg-gradient-to-br from-foreground/10 to-foreground/20 border border-foreground/20 rounded" style={{ height: 22 }}>
            <div className="font-mono text-[6px] text-muted-foreground uppercase tracking-wide">{label} {size}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function TVMockup({ label, size }: { label: string; size: string }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full border-2 border-foreground/20 rounded-lg bg-background overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {/* Video content bg */}
        <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-foreground/20 flex items-center justify-center">
            <span className="text-foreground/30 text-lg">▶</span>
          </div>
        </div>
        {/* Overlay banner */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-t from-foreground/30 to-foreground/10 border-t border-foreground/20" style={{ height: "30%" }}>
          <div className="text-center">
            <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{label}</div>
            <div className="font-mono text-[8px] text-muted-foreground/60">{size}</div>
          </div>
        </div>
      </div>
      {/* TV stand */}
      <div className="w-6 h-3 bg-foreground/15" />
      <div className="w-20 h-1 bg-foreground/10 rounded" />
    </div>
  );
}

export default function FormatsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10 group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Назад
        </Link>

        <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
          <span className="w-6 h-px bg-foreground/30" />
          Рекламные форматы
        </span>
        <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-4">
          Интерактивные
          <br />
          <span className="text-muted-foreground">примеры форматов</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Как выглядит ваша реклама на разных устройствах — десктоп, мобильные, Smart TV.
        </p>
      </div>

      {/* Desktop formats */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 border-t border-foreground/10">
        <h2 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-10">Desktop</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {formatExamples.filter(f => f.device === "desktop").map(format => (
            <div key={format.id} className="group">
              <div className="mb-4">
                <DesktopMockup label={format.name} size={format.size} />
              </div>
              <div className="font-display text-base mb-1">{format.name}</div>
              <div className="font-mono text-xs text-muted-foreground mb-2">{format.size}</div>
              <p className="text-sm text-muted-foreground">{format.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile formats */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 border-t border-foreground/10">
        <h2 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-10">Mobile</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {formatExamples.filter(f => f.device === "mobile").map((format, i) => (
            <div key={format.id} className="group">
              <div className="mb-4 flex justify-center">
                <MobileMockup label={format.name} size={format.size} full={i === 1} />
              </div>
              <div className="font-display text-base mb-1">{format.name}</div>
              <div className="font-mono text-xs text-muted-foreground mb-2">{format.size}</div>
              <p className="text-sm text-muted-foreground">{format.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTV formats */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 border-t border-foreground/10">
        <h2 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-10">Smart TV / CTV</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {formatExamples.filter(f => f.device === "tv").map(format => (
            <div key={format.id} className="group">
              <div className="mb-4">
                <TVMockup label={format.name} size={format.size} />
              </div>
              <div className="font-display text-base mb-1">{format.name}</div>
              <div className="font-mono text-xs text-muted-foreground mb-2">{format.size}</div>
              <p className="text-sm text-muted-foreground">{format.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 border-t border-foreground/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl mb-2">Подберём форматы под вашу задачу</h3>
            <p className="text-sm text-muted-foreground">Расскажите о целях — предложим оптимальный медиамикс</p>
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

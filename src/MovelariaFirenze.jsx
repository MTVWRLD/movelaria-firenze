import { useState, useEffect, useRef, useCallback } from "react";

const PHONE_WHATSAPP = "5551996782579";
const PHONE_DISPLAY = "(51) 99678-2579";
const ADDRESS = "Av. Hugo Sperb, 999 - Industrial, Igrejinha/RS";
const INSTAGRAM = "https://www.instagram.com/movelariafirenze/";

/* ── brand tokens (from logo) ── */
const C = {
  terracotta: "#b65118",
  terracottaLight: "#d4682a",
  brown: "#7d4e2d",
  brownDark: "#5a3820",
  bg: "#161210",        // near-black warm
  bgSoft: "#1f1916",    // section alt
  surface: "#28201b",   // cards
  cream: "#f5efe7",
  creamMuted: "#cfc4b6",
  textDim: "#9c8e7e",
};

/* ── gallery: drop files in public/images/ with these names ── */
const projects = [
  { img: "/images/quarto.jpg", title: "Dormitório Planejado", desc: "Penteadeira com espelho iluminado, painéis em madeira e marcenaria integrada." },
  { img: "/images/gaveta-joias.jpg", title: "Detalhes Sob Medida", desc: "Gaveteiro porta-joias com divisórias planejadas, funcionalidade em cada detalhe." },
  { img: "/images/sala-estar.jpg", title: "Sala de Estar", desc: "Ambientes integrados com acabamento premium e iluminação embutida." },
  { img: "/images/adega.jpg", title: "Adega & Bar", desc: "Espaços de convivência com nichos iluminados e materiais nobres." },
  { img: "/images/cozinha.jpg", title: "Cozinha Planejada", desc: "Cozinhas funcionais com ilha, armários sob medida e design contemporâneo." },
  { img: "/images/banheiro.jpg", title: "Banheiro", desc: "Gabinetes e marcenaria resistente à umidade com acabamento refinado." },
];

/* ── logo mark (geometric blocks from brand) ── */
function LogoMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="6" y="10" width="88" height="11" fill={C.brown} />
      <rect x="6" y="26" width="50" height="64" fill={C.terracotta} />
      <rect x="62" y="26" width="32" height="26" fill={C.terracotta} />
      <rect x="62" y="58" width="32" height="32" fill={C.brown} />
    </svg>
  );
}

/* ── utils ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── image with graceful placeholder fallback ── */
function ProjectImage({ src, title }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: `linear-gradient(145deg, ${C.surface}, ${C.bgSoft})` }}
      >
        <div className="text-center px-6">
          <LogoMark size={48} />
          <p className="mt-4 text-sm font-medium" style={{ color: C.creamMuted }}>{title}</p>
          <p className="mt-1 text-xs" style={{ color: C.textDim }}>
            Adicione a foto em <code style={{ color: C.terracottaLight }}>public{src}</code>
          </p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

/* ── WhatsApp button ── */
function WhatsAppButton({ text = "Solicitar Orçamento", small = false }) {
  return (
    <a
      href={`https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de móveis sob medida.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${small ? "px-5 py-2.5 text-sm" : "px-8 py-4 text-base"} font-bold inline-flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer no-underline`}
      style={{
        background: C.terracotta,
        color: C.cream,
        borderRadius: 4,
        boxShadow: `0 8px 30px ${C.terracotta}40`,
        fontFamily: "'Jost', sans-serif",
        letterSpacing: "0.04em",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = C.terracottaLight}
      onMouseLeave={(e) => e.currentTarget.style.background = C.terracotta}
    >
      <svg width={small ? 17 : 20} height={small ? 17 : 20} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {text}
    </a>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Início", href: "#hero" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled
        ? { background: "rgba(22,18,16,0.92)", backdropFilter: "blur(16px)" }
        : { background: "transparent" }
      }
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="flex items-center gap-3 no-underline">
          <LogoMark size={30} />
          <div className="leading-none">
            <span className="block text-[10px] tracking-[0.35em] uppercase" style={{ color: C.textDim, fontFamily: "'Jost', sans-serif" }}>
              Movelaria
            </span>
            <span className="block text-lg tracking-[0.12em] uppercase font-medium" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif" }}>
              Firenze
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm no-underline transition-colors duration-300 tracking-wide"
              style={{ color: C.creamMuted, fontFamily: "'Jost', sans-serif" }}
              onMouseEnter={(e) => e.target.style.color = C.terracottaLight}
              onMouseLeave={(e) => e.target.style.color = C.creamMuted}
            >
              {l.label}
            </a>
          ))}
          <WhatsAppButton text="Orçamento" small />
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          style={{ background: "none", border: "none", color: C.cream }}
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d={menuOpen ? "M6 6l14 14M6 20L20 6" : "M4 7h18M4 13h18M4 19h18"} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "rgba(22,18,16,0.98)", backdropFilter: "blur(16px)", borderTop: `1px solid ${C.brown}22` }} className="md:hidden">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-3 no-underline text-base"
                style={{ color: C.cream, fontFamily: "'Jost', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 pb-2">
              <WhatsAppButton text="Solicitar Orçamento" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
      style={{ background: C.bg }}
    >
      {/* geometric brand blocks as background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block" style={{ background: `linear-gradient(200deg, ${C.bgSoft} 0%, ${C.bg} 70%)` }} />
        <div className="absolute right-[8%] top-[18%] w-48 h-64 opacity-[0.13]" style={{ background: C.terracotta }} />
        <div className="absolute right-[calc(8%+13rem)] top-[18%] w-20 h-32 opacity-[0.09]" style={{ background: C.brown }} />
        <div className="absolute right-[8%] top-[calc(18%+17.5rem)] w-48 h-24 opacity-[0.07]" style={{ background: C.brown }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-24 md:pt-32 w-full">
        <div className="max-w-2xl">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px" style={{ background: C.terracotta }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.terracottaLight, fontFamily: "'Jost', sans-serif" }}>
                Igrejinha · RS
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-7"
              style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              Móveis sob medida,<br />
              <em style={{ color: C.terracottaLight }}>feitos para a sua vida.</em>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg leading-relaxed mb-10 max-w-lg" style={{ color: C.creamMuted, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Cada ambiente é único. Projetamos e fabricamos móveis planejados que unem funcionalidade, acabamento premium e o seu jeito de viver.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4 items-center">
              <WhatsAppButton text="Solicitar Orçamento" />
              <a
                href="#projetos"
                className="px-8 py-4 text-base inline-flex items-center gap-2 transition-all duration-300 no-underline cursor-pointer"
                style={{
                  color: C.cream,
                  border: `1px solid ${C.brown}88`,
                  borderRadius: 4,
                  fontFamily: "'Jost', sans-serif",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.terracotta; e.currentTarget.style.color = C.terracottaLight; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${C.brown}88`; e.currentTarget.style.color = C.cream; }}
              >
                Ver Projetos →
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex items-center gap-8 mt-14 pt-8" style={{ borderTop: `1px solid ${C.brown}33` }}>
              {[
                { value: "100%", label: "Sob Medida" },
                { value: "Projeto", label: "Personalizado" },
                { value: "Premium", label: "Acabamento" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-xl md:text-2xl" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{s.value}</div>
                  <div className="text-[11px] tracking-[0.18em] uppercase mt-1" style={{ color: C.textDim, fontFamily: "'Jost', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Carousel ── */
function Carousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const total = projects.length;

  const go = useCallback((dir) => {
    setCurrent((c) => (c + dir + total) % total);
  }, [total]);

  /* keyboard navigation */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go]);

  /* swipe support */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  return (
    <section id="projetos" className="py-20 md:py-28" style={{ background: C.bgSoft }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px" style={{ background: C.terracotta }} />
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.terracottaLight, fontFamily: "'Jost', sans-serif" }}>
                  Portfólio
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl leading-tight" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Projetos que transformam ambientes
              </h2>
            </div>
            <div className="flex gap-2">
              {[-1, 1].map((dir) => (
                <button
                  key={dir}
                  onClick={() => go(dir)}
                  aria-label={dir === -1 ? "Projeto anterior" : "Próximo projeto"}
                  className="w-12 h-12 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{ background: "transparent", border: `1px solid ${C.brown}66`, borderRadius: 4, color: C.cream }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = C.terracotta; e.currentTarget.style.borderColor = C.terracotta; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${C.brown}66`; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={dir === -1 ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="relative overflow-hidden select-none"
            style={{ borderRadius: 6 }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {projects.map((p, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="aspect-[4/3] md:aspect-[16/9] relative">
                    <ProjectImage src={p.img} title={p.title} />
                    {/* caption overlay */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                      style={{ background: "linear-gradient(transparent, rgba(15,11,9,0.85))" }}
                    >
                      <h3 className="text-xl md:text-3xl mb-1" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                        {p.title}
                      </h3>
                      <p className="text-sm md:text-base max-w-xl" style={{ color: C.creamMuted, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* dots */}
        <div className="flex justify-center gap-2.5 mt-7">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para projeto ${i + 1}`}
              className="transition-all duration-400 cursor-pointer"
              style={{
                width: current === i ? 32 : 8,
                height: 8,
                borderRadius: 99,
                border: "none",
                background: current === i ? C.terracotta : `${C.brown}66`,
              }}
            />
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="text-center mt-10 text-sm" style={{ color: C.textDim, fontFamily: "'Jost', sans-serif" }}>
            Quer ver mais? Acompanhe nossos projetos no{" "}
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: C.terracottaLight }}>
              Instagram @movelariafirenze
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── About / Process ── */
function About() {
  const steps = [
    { num: "01", title: "Conversa & Medição", desc: "Entendemos sua necessidade, seu estilo e medimos o ambiente com precisão." },
    { num: "02", title: "Projeto Personalizado", desc: "Desenvolvemos o projeto sob medida, pensado para o seu espaço e rotina." },
    { num: "03", title: "Fabricação", desc: "Produzimos cada peça com materiais selecionados e acabamento premium." },
    { num: "04", title: "Montagem & Entrega", desc: "Instalamos tudo no prazo, com cuidado e atenção a cada detalhe." },
  ];

  return (
    <section id="sobre" className="py-20 md:py-28" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20">
          <FadeIn>
            <div className="md:sticky md:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px" style={{ background: C.terracotta }} />
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.terracottaLight, fontFamily: "'Jost', sans-serif" }}>
                  Como trabalhamos
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl leading-tight mb-6" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Da ideia ao ambiente pronto
              </h2>
              <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: C.creamMuted, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                Na Movelaria Firenze, cada projeto nasce de uma conversa. Trabalhamos lado a lado com você, do primeiro rascunho à montagem final, para criar móveis que se encaixam perfeitamente no seu espaço e no seu dia a dia.
              </p>
              <WhatsAppButton text="Começar meu Projeto" />
            </div>
          </FadeIn>

          <div className="flex flex-col gap-5">
            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="p-6 md:p-8 transition-all duration-500"
                  style={{ background: C.surface, borderRadius: 6, borderLeft: `2px solid ${C.brown}55` }}
                  onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = C.terracotta}
                  onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = `${C.brown}55`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-2xl md:text-3xl leading-none" style={{ color: C.terracotta, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl mb-2" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: C.creamMuted, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA banner ── */
function CTABanner() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: C.terracotta }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div className="absolute -left-10 top-0 bottom-0 w-64" style={{ background: C.brownDark }} />
        <div className="absolute right-[15%] top-[-20%] w-80 h-80" style={{ background: C.cream }} />
      </div>
      <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl leading-tight mb-5" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Seu ambiente merece um<br />móvel feito para ele
          </h2>
          <p className="text-base md:text-lg mb-10 max-w-lg mx-auto" style={{ color: "#f5efe7cc", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            Conte sua ideia pra gente. O orçamento é rápido e sem compromisso.
          </p>
          <a
            href={`https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de móveis sob medida.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 text-base font-bold inline-flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] no-underline cursor-pointer"
            style={{
              background: C.bg,
              color: C.cream,
              borderRadius: 4,
              fontFamily: "'Jost', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chamar no WhatsApp
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section id="contato" className="py-20 md:py-28" style={{ background: C.bgSoft }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <FadeIn>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px" style={{ background: C.terracotta }} />
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.terracottaLight, fontFamily: "'Jost', sans-serif" }}>
                  Contato
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl leading-tight mb-10" style={{ color: C.cream, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Vamos conversar sobre o seu projeto?
              </h2>

              <div className="flex flex-col gap-4">
                {[
                  { label: "Endereço", value: ADDRESS },
                  { label: "WhatsApp", value: PHONE_DISPLAY },
                  { label: "Instagram", value: "@movelariafirenze" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-5" style={{ background: C.surface, borderRadius: 6 }}>
                    <div className="w-1 self-stretch" style={{ background: C.terracotta, borderRadius: 2 }} />
                    <div>
                      <div className="text-[10px] tracking-[0.25em] uppercase mb-1.5" style={{ color: C.textDim, fontFamily: "'Jost', sans-serif" }}>
                        {item.label}
                      </div>
                      <div className="text-base" style={{ color: C.cream, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center no-underline transition-all duration-300"
                  style={{ background: C.surface, borderRadius: 4, color: C.creamMuted, border: `1px solid ${C.brown}44` }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.terracottaLight; e.currentTarget.style.borderColor = C.terracotta; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.creamMuted; e.currentTarget.style.borderColor = `${C.brown}44`; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col h-full min-h-[380px] overflow-hidden" style={{ borderRadius: 6, background: C.surface }}>
              {/* mapa interativo (embed sem necessidade de API key) */}
              <iframe
                title="Mapa - Movelaria Firenze"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                className="w-full flex-1"
                style={{ border: 0, minHeight: 340, filter: "grayscale(0.25) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* barra com endereço + link direto pro Maps */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5" style={{ borderTop: `1px solid ${C.brown}33` }}>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: C.textDim, fontFamily: "'Jost', sans-serif" }}>
                    Onde estamos
                  </p>
                  <p className="text-sm" style={{ color: C.cream, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    Av. Hugo Sperb, 999 - Industrial, Igrejinha/RS
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm no-underline whitespace-nowrap px-5 py-2.5 transition-all duration-300 self-start sm:self-auto"
                  style={{ color: C.terracottaLight, border: `1px solid ${C.brown}66`, borderRadius: 4, fontFamily: "'Jost', sans-serif" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.terracotta; e.currentTarget.style.background = `${C.terracotta}15`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${C.brown}66`; e.currentTarget.style.background = "transparent"; }}
                >
                  Abrir no Google Maps →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="py-10" style={{ background: C.bg, borderTop: `1px solid ${C.brown}22` }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark size={26} />
            <span className="text-sm tracking-[0.12em] uppercase" style={{ color: C.creamMuted, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              Movelaria Firenze
            </span>
          </div>
          <p className="text-xs text-center md:text-right" style={{ color: C.textDim, fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
            © 2026 Movelaria Firenze · Igrejinha, RS · Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Floating WhatsApp ── */
function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <a
      href={`https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de móveis sob medida.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 999,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.5)",
        transition: "all 0.4s ease", pointerEvents: show ? "auto" : "none",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ── Main ── */
export default function MovelariaFirenze() {
  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Jost', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <Navbar />
      <Hero />
      <Carousel />
      <About />
      <CTABanner />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePercent,
  BellRing,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { TELEGRAM_URL, WHATSAPP_URL } from "@/lib/community-links";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Achadinhos-AW — Ofertas VIP no WhatsApp e Telegram em Tempo Real" },
      {
        name: "description",
        content: "Seja membro e pegue os melhores cupons e ofertas no WhatsApp e Telegram.",
      },
      { property: "og:title", content: "Achadinhos-AW — Ofertas VIP no WhatsApp e Telegram" },
      {
        property: "og:description",
        content: "Seja membro e pegue os melhores cupons e ofertas no WhatsApp e Telegram.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const BENEFITS = [
  {
    icon: Zap,
    title: "Alertas em tempo real",
    text: "Bugs de preço e promoções relâmpago chegam primeiro no seu celular.",
    color: "text-telegram",
    bg: "bg-telegram/12",
  },
  {
    icon: BadgePercent,
    title: "Cupons exclusivos",
    text: "Códigos negociados diretamente com lojas parceiras, só para membros.",
    color: "text-primary",
    bg: "bg-primary/12",
  },
  {
    icon: ShieldCheck,
    title: "Curadoria confiável",
    text: "Toda oferta é verificada antes de ser publicada. Sem links suspeitos.",
    color: "text-neon-violet",
    bg: "bg-neon-violet/12",
  },
  {
    icon: BellRing,
    title: "Zero spam",
    text: "Você escolhe as categorias que quer receber. Saia quando quiser.",
    color: "text-foreground",
    bg: "bg-secondary",
  },
] as const;

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 -right-40 h-100 w-100 rounded-full bg-telegram/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
            Novas ofertas verificadas todos os dias
          </span>
          <h1 className="font-display mt-6 text-3xl leading-[1.08] font-bold tracking-tight min-[380px]:text-4xl sm:text-6xl sm:leading-[1.05]">
            Economize de verdade com{" "}
            <span className="text-primary text-glow-whatsapp">ofertas VIP</span> direto no seu{" "}
            <span className="text-telegram text-glow-telegram">celular</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Curadoria diária de promoções, cupons exclusivos e bugs de preço — enviados em tempo
            real para o nosso grupo de WhatsApp e canal no Telegram. Entre grátis e nunca mais pague
            o preço cheio.
          </p>
        </div>
      </section>

      {/* BENTO — CANAIS */}
      <section className="px-4 pb-16 sm:px-6" aria-label="Canais de ofertas">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {/* WhatsApp */}
          <article className="glass-panel group relative overflow-hidden rounded-3xl p-5 shadow-[var(--glow-whatsapp)] transition-transform duration-300 hover:-translate-y-1 sm:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-whatsapp/15 blur-3xl"
            />
            <div className="relative">
              <span className="animate-float-slow grid h-14 w-14 place-items-center rounded-2xl bg-whatsapp/15 text-whatsapp">
                <MessageCircle className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="font-display mt-6 text-2xl font-bold sm:text-3xl">
                Grupo VIP no WhatsApp
              </h2>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-whatsapp">
                <Users className="h-4 w-4" aria-hidden />
                Seja membro e pegue os melhores cupons e ofertas
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                As melhores ofertas do dia selecionadas à mão pela nossa curadoria, com cupons
                exclusivos e aviso antes de expirar.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {[
                  "Ofertas verificadas pela equipe",
                  "Cupons exclusivos de lojas parceiras",
                  "Aviso de expiração em tempo real",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-whatsapp" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-pulse-ring mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-3.5 text-center text-sm font-bold text-whatsapp-foreground transition-transform duration-200 group-hover:scale-[1.02] hover:scale-[1.05] active:scale-95 sm:w-auto sm:px-6"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Entrar no Grupo VIP
              </a>
            </div>
          </article>

          {/* Telegram */}
          <article className="glass-panel group relative overflow-hidden rounded-3xl p-5 shadow-[var(--glow-telegram)] transition-transform duration-300 hover:-translate-y-1 sm:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-telegram/15 blur-3xl"
            />
            <div className="relative">
              <span className="animate-float-slow grid h-14 w-14 place-items-center rounded-2xl bg-telegram/15 text-telegram [animation-delay:1.2s]">
                <Send className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="font-display mt-6 text-2xl font-bold sm:text-3xl">
                Canal no Telegram
              </h2>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-telegram">
                <Zap className="h-4 w-4" aria-hidden />
                Seja membro e pegue os melhores cupons e ofertas
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Velocidade é tudo: quando uma loja erra o preço, você recebe o alerta em segundos —
                antes de corrigirem.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {[
                  "Notificações em segundos",
                  "Histórico completo de alertas",
                  "Filtros por categoria favorita",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-telegram" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-telegram px-5 py-3.5 text-center text-sm font-bold text-telegram-foreground transition-transform duration-200 group-hover:scale-[1.02] hover:scale-[1.05] active:scale-95 sm:w-auto sm:px-6"
              >
                <Send className="h-4 w-4" aria-hidden />
                Inscrever-se no Canal
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="px-4 pb-20 sm:px-6" aria-label="Benefícios">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-bold sm:text-3xl">
            Por que entrar para o clube?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
            Um portal híbrido: navegue pelas ofertas no site e receba os alertas mais quentes nos
            seus apps de mensagem.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <article
                key={b.title}
                className="glass-panel rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${b.bg} ${b.color}`}>
                  <b.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display mt-4 text-base font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/ofertas"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/60 px-5 py-3.5 text-sm font-semibold transition-all hover:scale-[1.03] hover:border-primary/50 hover:text-primary sm:w-auto sm:px-7"
            >
              Ver as ofertas de hoje
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  FileText,
  Globe,
  MessageCircle,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Promotional Space Overview & Compliance Registry — OfertaMax" },
      {
        name: "description",
        content:
          "Registro de conformidade do espaço promocional OfertaMax para validação de publisher Awin: Direct Linker & Coupon Portal com tráfego via canais de mensagens segmentados.",
      },
      {
        property: "og:title",
        content: "Promotional Space Overview & Compliance Registry — OfertaMax",
      },
      {
        property: "og:description",
        content:
          "Registro de conformidade do espaço promocional OfertaMax para validação de publisher Awin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CompliancePage,
});

const TRAFFIC_SPLIT = [
  {
    label: "WhatsApp",
    pct: 50,
    icon: MessageCircle,
    bar: "bg-whatsapp",
    text: "text-whatsapp",
    desc: "Grupo VIP segmentado por categorias de interesse",
  },
  {
    label: "Telegram",
    pct: 30,
    icon: Send,
    bar: "bg-telegram",
    text: "text-telegram",
    desc: "Canal de alertas instantâneos de bug de preço",
  },
  {
    label: "Direto Web",
    pct: 20,
    icon: Globe,
    bar: "bg-neon-violet",
    text: "text-neon-violet",
    desc: "Tráfego orgânico e direto no portal de ofertas",
  },
] as const;

function CompliancePage() {
  const [publisherId, setPublisherId] = useState("1234567");
  const sanitizedId = publisherId.replace(/[^0-9a-zA-Z-]/g, "").slice(0, 16) || "0000000";

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Cabeçalho corporativo */}
        <header className="glass-panel rounded-3xl p-7 sm:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-telegram/12 text-telegram">
              <ShieldCheck className="h-6 w-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Awin Publisher Validation
              </p>
              <h1 className="font-display mt-2 text-2xl leading-tight font-bold tracking-tight sm:text-4xl">
                Promotional Space Overview &amp; Compliance Registry
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Documento de referência para validação do espaço promocional junto à rede de
                afiliados Awin. Esta página descreve o modelo de operação, as fontes de tráfego e o
                registro de publisher associado a este domínio.
              </p>
            </div>
          </div>
        </header>

        {/* Publisher ID dinâmico */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="glass-panel rounded-3xl p-7">
            <h2 className="font-display flex items-center gap-2 text-lg font-bold">
              <BadgeCheck className="h-5 w-5 text-primary" aria-hidden />
              Publisher ID (ambiente de teste)
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Informe o ID de publisher de teste para pré-visualizar como o registro será exibido na
              validação.
            </p>
            <label className="mt-4 block">
              <span className="sr-only">ID de publisher de teste</span>
              <input
                type="text"
                value={publisherId}
                onChange={(e) => setPublisherId(e.target.value)}
                placeholder="Ex.: 1234567"
                inputMode="numeric"
                className="glass-panel w-full rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50"
              />
            </label>
            <div className="mt-4 rounded-xl bg-background/50 p-4">
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Registro ativo
              </p>
              <p className="font-display mt-1 font-mono text-lg font-bold text-telegram">
                AW-TEST-{sanitizedId}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Status: <span className="font-semibold text-primary">pendente de validação</span>
              </p>
            </div>
          </div>

          {/* Descrição formal */}
          <div className="glass-panel rounded-3xl p-7">
            <h2 className="font-display flex items-center gap-2 text-lg font-bold">
              <FileText className="h-5 w-5 text-telegram" aria-hidden />
              Modelo de operação
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Tipo de publisher
                </dt>
                <dd className="mt-1 font-medium">Direct Linker &amp; Coupon Portal</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Descrição formal
                </dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">
                  Portal editorial de curadoria de ofertas que opera como Direct Linker &amp; Coupon
                  Portal, distribuindo links rastreáveis e códigos de cupom exclusivamente por meio
                  de canais de mensagens segmentados (grupos de WhatsApp e canais de Telegram
                  organizados por categoria de interesse), além de vitrine web própria. Todo clique
                  é atribuído via deep links rastreáveis da rede, sem uso de adware, iframes
                  ocultos ou cookie dropping.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Métodos promocionais
                </dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {["Coupon / Voucher", "Deep Linking", "Content / Curadoria", "Comunidades segmentadas"].map(
                    (m) => (
                      <span
                        key={m}
                        className="rounded-full bg-secondary px-3 py-1 text-[11px] font-medium"
                      >
                        {m}
                      </span>
                    )
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Divisão de tráfego */}
        <div className="glass-panel mt-6 rounded-3xl p-7 sm:p-8">
          <h2 className="font-display flex items-center gap-2 text-lg font-bold">
            <Globe className="h-5 w-5 text-neon-violet" aria-hidden />
            Divisão de tráfego estimada
          </h2>
          <div
            className="mt-5 flex h-4 w-full overflow-hidden rounded-full"
            role="img"
            aria-label="Divisão de tráfego: WhatsApp 50%, Telegram 30%, Direto Web 20%"
          >
            {TRAFFIC_SPLIT.map((t) => (
              <div key={t.label} className={t.bar} style={{ width: `${t.pct}%` }} />
            ))}
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {TRAFFIC_SPLIT.map((t) => (
              <li key={t.label} className="rounded-2xl bg-background/40 p-4">
                <p className={`flex items-center gap-2 text-sm font-bold ${t.text}`}>
                  <t.icon className="h-4 w-4" aria-hidden />
                  {t.label}
                  <span className="font-display ml-auto text-lg">{t.pct}%</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Caixa legal Awin */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-7 sm:p-8">
          <h2 className="font-display flex items-center gap-2 text-lg font-bold">
            <Scale className="h-5 w-5 text-primary" aria-hidden />
            Awin Affiliate Disclosure
          </h2>
          <div className="mt-4 rounded-2xl bg-background/50 p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              This website is a registered publisher on the Awin affiliate network. Some of the
              links and promotional codes displayed on this portal and distributed through our
              messaging channels are affiliate links. If you click on an affiliate link and make a
              qualifying purchase, we may earn a commission from the advertiser at no additional
              cost to you. All prices, discounts and availability are provided for informational
              purposes only and may change without notice on the advertiser's website. This portal
              does not sell products directly and does not process payments. We are committed to
              full transparency and to complying with the Awin Publisher Terms and Conditions,
              applicable data protection laws (including LGPD and GDPR) and consumer advertising
              regulations.
            </p>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground/70">
            Versão em português disponível mediante solicitação. Última revisão do registro:{" "}
            {new Date().toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            .
          </p>
        </div>
      </div>
    </section>
  );
}

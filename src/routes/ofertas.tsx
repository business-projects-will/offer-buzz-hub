import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock, Search, SearchX, Tag } from "lucide-react";
import {
  CATEGORY_LABELS,
  OFFERS,
  SOURCE_LABELS,
  formatBRL,
  type Offer,
  type OfferCategory,
  type OfferSource,
} from "@/data/offers";
import { OfferModal } from "@/components/offer-modal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas Hoje — Achadinhos-AW | Promoções e Cupons Verificados" },
      {
        name: "description",
        content:
          "Busque e filtre as ofertas de hoje em Tecnologia, Moda, Pets e Cosméticos. Descontos de até 33% com cupons exclusivos para membros.",
      },
      { property: "og:title", content: "Ofertas Hoje — Achadinhos-AW" },
      {
        property: "og:description",
        content:
          "Busque e filtre as ofertas de hoje em Tecnologia, Moda, Pets e Cosméticos com cupons exclusivos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OfertasPage,
});

type CategoryFilter = "todas" | OfferCategory;
type SourceFilter = "todas" | OfferSource;
const ITEMS_PER_PAGE = 6;

const FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "tecnologia", label: CATEGORY_LABELS.tecnologia },
  { value: "moda", label: CATEGORY_LABELS.moda },
  { value: "pets", label: CATEGORY_LABELS.pets },
  { value: "cosmeticos", label: CATEGORY_LABELS.cosmeticos },
];

function OfertasPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("todas");
  const [source, setSource] = useState<SourceFilter>("todas");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Offer | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return OFFERS.filter((o) => {
      const matchCategory = category === "todas" || o.category === category;
      const matchSource = source === "todas" || o.source === source;
      const matchQuery =
        !q ||
        o.title.toLowerCase().includes(q) ||
        o.store.toLowerCase().includes(q) ||
        SOURCE_LABELS[o.source].toLowerCase().includes(q) ||
        CATEGORY_LABELS[o.category].toLowerCase().includes(q);
      return matchCategory && matchSource && matchQuery;
    });
  }, [query, category, source]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visibleOffers = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const resetPage = () => setPage(1);

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-1.5 text-xs font-semibold text-primary">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            Atualizadas hoje
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Ofertas de <span className="text-primary text-glow-whatsapp">hoje</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Curadoria verificada pela equipe. Clique em uma oferta para ver o cupom (quando
            disponível) e o link rastreável.
          </p>
        </header>

        {/* Busca + filtros */}
        <div className="mt-8 flex flex-col gap-4">
          <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3.5">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            <span className="sr-only">Buscar ofertas</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
              }}
              placeholder="Buscar por produto, loja ou categoria…"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
            />
          </label>

          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            role="group"
            aria-label="Filtrar por categoria"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => {
                  setCategory(f.value);
                  resetPage();
                }}
                aria-pressed={category === f.value}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all",
                  category === f.value
                    ? "bg-whatsapp text-whatsapp-foreground shadow-[var(--glow-whatsapp)]"
                    : "glass-panel text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div
            className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            role="group"
            aria-label="Filtrar por fonte"
          >
            <span className="mr-1 text-xs font-semibold text-muted-foreground">Fonte:</span>
            {(["todas", "awin", "mercado-livre"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setSource(value);
                  resetPage();
                }}
                aria-pressed={source === value}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all",
                  source === value
                    ? "bg-telegram text-telegram-foreground shadow-[var(--glow-telegram)]"
                    : "glass-panel text-muted-foreground hover:text-foreground",
                )}
              >
                {value === "todas" ? "Todas" : SOURCE_LABELS[value]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de ofertas */}
        {filtered.length === 0 ? (
          <div className="glass-panel mt-10 flex flex-col items-center gap-3 rounded-3xl px-6 py-16 text-center">
            <SearchX className="h-10 w-10 text-muted-foreground" aria-hidden />
            <p className="font-display text-lg font-semibold">Nenhuma oferta encontrada</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Tente outro termo de busca ou limpe os filtros para ver todas as ofertas de hoje.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleOffers.map((offer) => (
              <article
                key={offer.id}
                className="glass-panel group flex flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--glow-whatsapp)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={offer.image}
                    alt={`Foto do produto: ${offer.title}`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-whatsapp px-3 py-1 text-[11px] font-bold text-whatsapp-foreground shadow-lg">
                    <Tag className="h-3 w-3" aria-hidden />
                    {offer.discount}% OFF
                  </span>
                  {offer.coupon && (
                    <span className="absolute top-3 right-3 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold tracking-wider text-telegram backdrop-blur">
                      CUPOM
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    {SOURCE_LABELS[offer.source]} · {CATEGORY_LABELS[offer.category]} ·{" "}
                    {offer.store}
                  </p>
                  <h2 className="font-display mt-1.5 text-base leading-snug font-bold">
                    {offer.title}
                  </h2>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-primary">
                      {formatBRL(offer.salePrice)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatBRL(offer.originalPrice)}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/80">
                    <Clock className="h-3 w-3" aria-hidden />
                    {offer.expiresIn}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelected(offer)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <Tag className="h-4 w-4" aria-hidden />
                    Pegar oferta
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length > 0 && pageCount > 1 && (
          <nav
            className="mt-8 flex items-center justify-center gap-2"
            aria-label="Paginação de ofertas"
          >
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              className="glass-panel grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full text-xs font-bold transition-colors",
                  currentPage === pageNumber
                    ? "bg-whatsapp text-whatsapp-foreground"
                    : "glass-panel text-muted-foreground hover:text-foreground",
                )}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              disabled={currentPage === pageCount}
              className="glass-panel grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Próxima página"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </nav>
        )}

        <p className="mt-10 text-center text-[11px] text-muted-foreground/70">
          Ofertas com dados simulados para demonstração. Links de afiliado podem gerar comissão sem
          custo adicional para você.
        </p>
      </div>

      <OfferModal offer={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

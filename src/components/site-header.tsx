import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BadgePercent, Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Início" },
  { to: "/ofertas", label: "Ofertas Hoje" },
  { to: "/compliance", label: "Apoio ao Afiliado" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-panel fixed inset-x-0 top-0 z-40 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2"
          aria-label="OfertaMax — Início"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary shadow-[var(--glow-whatsapp)]">
            <BadgePercent className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Oferta<span className="text-primary text-glow-whatsapp">Max</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-foreground" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/5500000000000?text=Quero%20entrar%20no%20grupo%20VIP%20de%20ofertas"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Grupo VIP
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl text-foreground transition-colors hover:bg-secondary md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 md:hidden",
          open ? "max-h-72" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4" aria-label="Navegação móvel">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-foreground" }}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5500000000000?text=Quero%20entrar%20no%20grupo%20VIP%20de%20ofertas"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Entrar no Grupo VIP
          </a>
        </nav>
      </div>
    </header>
  );
}

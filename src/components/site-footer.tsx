import { Link } from "@tanstack/react-router";
import { BadgePercent, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BadgePercent className="h-4 w-4 text-primary" aria-hidden />
          <span className="font-display text-sm font-semibold text-foreground">OfertaMax</span>
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
          Portal de curadoria de ofertas. Como publisher afiliado, podemos receber comissão por
          compras qualificadas realizadas através dos nossos links rastreáveis, sem custo adicional
          para você.
        </p>
        <Link
          to="/compliance"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          Transparência &amp; Compliance (Awin)
        </Link>
        <p className="text-[11px] text-muted-foreground/60">
          © {new Date().getFullYear()} OfertaMax — Dados de ofertas simulados para demonstração.
        </p>
      </div>
    </footer>
  );
}

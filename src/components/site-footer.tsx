import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import logo from "@/assets/achadinhos-v2-circular (2).png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <img
            src={logo}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="font-display text-sm font-semibold text-foreground">Achadinhos-AW</span>
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
          Apoio ao Afiliado
        </Link>
        <p className="text-[11px] text-muted-foreground/60">
          © {new Date().getFullYear()} Achadinhos-AW — Dados de ofertas simulados para demonstração.
        </p>
      </div>
    </footer>
  );
}

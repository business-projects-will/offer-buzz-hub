import { useEffect, useMemo, useState } from "react";
import { Check, Copy, ExternalLink, ListOrdered, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { buildTrackedUrl, formatBRL, CATEGORY_LABELS, type Offer } from "@/data/offers";

interface OfferModalProps {
  offer: Offer | null;
  onClose: () => void;
}

export function OfferModal({ offer, onClose }: OfferModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
    if (!offer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [offer, onClose]);

  const trackedUrl = useMemo(() => (offer ? buildTrackedUrl(offer) : ""), [offer]);

  if (!offer) return null;

  const copyCoupon = async () => {
    if (!offer.coupon) return;
    try {
      await navigator.clipboard.writeText(offer.coupon);
      setCopied(true);
      toast.success("Cupom copiado!", { description: `Use ${offer.coupon} no checkout.` });
    } catch {
      toast.error("Não foi possível copiar", { description: "Copie o código manualmente." });
    }
  };

  const openTracked = () => {
    toast.success("Link rastreável simulado", {
      description: "Em produção, você seria redirecionado à loja parceira com atribuição Awin.",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Oferta: ${offer.title}`}
      onClick={onClose}
    >
      <div
        className="glass-panel max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary">
              <Tag className="h-3 w-3" aria-hidden />
              {offer.discount}% OFF · {CATEGORY_LABELS[offer.category]}
            </span>
            <h3 className="font-display mt-3 text-xl font-bold leading-snug">{offer.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{offer.store}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold text-primary text-glow-whatsapp">
            {formatBRL(offer.salePrice)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatBRL(offer.originalPrice)}
          </span>
        </div>

        {offer.coupon && (
          <div className="mt-5 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Cupom disponível {offer.couponLabel ? `— ${offer.couponLabel}` : ""}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="font-display flex-1 rounded-xl bg-background/60 px-4 py-3 text-center text-lg font-bold tracking-[0.2em] text-primary">
                {offer.coupon}
              </code>
              <button
                type="button"
                onClick={copyCoupon}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground transition-transform hover:scale-[1.03] active:scale-95"
              >
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden />
                )}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-5">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <ListOrdered className="h-4 w-4 text-telegram" aria-hidden />
            Como aproveitar
          </p>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-display font-bold text-telegram">1.</span>
              {offer.coupon
                ? "Copie o cupom acima antes de sair da página."
                : "Clique no botão de oferta abaixo — o desconto já está aplicado."}
            </li>
            <li className="flex gap-2">
              <span className="font-display font-bold text-telegram">2.</span>
              Você será redirecionado à loja parceira através do nosso link rastreável.
            </li>
            <li className="flex gap-2">
              <span className="font-display font-bold text-telegram">3.</span>
              {offer.coupon
                ? "Finalize a compra aplicando o cupom no checkout."
                : "Finalize a compra normalmente — o melhor preço já está ativo."}
            </li>
          </ol>
        </div>

        <div className="mt-5 rounded-xl bg-background/50 p-3">
          <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            Link rastreável (simulação)
          </p>
          <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">{trackedUrl}</p>
        </div>

        <button
          type="button"
          onClick={openTracked}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-6 py-4 text-sm font-bold text-whatsapp-foreground shadow-[var(--glow-whatsapp)] transition-transform hover:scale-[1.02] active:scale-95"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Abrir oferta na loja (simulação)
        </button>
        <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground/70">
          Link de afiliado: podemos receber comissão sem custo extra para você.
        </p>
      </div>
    </div>
  );
}

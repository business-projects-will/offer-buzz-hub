import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "achadinhos-aw-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        timer = window.setTimeout(() => setVisible(true), 1200);
      }
    } catch {
      setVisible(true);
    }
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* storage indisponível */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="glass-panel fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl p-4 shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-telegram/15 text-telegram">
          <Cookie className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Cookies &amp; privacidade</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Usamos cookies para melhorar sua experiência e medir o desempenho dos nossos links de
            afiliado. Ao continuar, você concorda com essa utilização.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={accept}
              className="rounded-full bg-whatsapp px-4 py-2 text-xs font-semibold text-whatsapp-foreground transition-transform hover:scale-[1.03] active:scale-95"
            >
              Aceitar e continuar
            </button>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Agora não
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Fechar aviso de cookies"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

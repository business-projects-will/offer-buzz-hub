const SITE_ORIGIN = "https://www.achadinhos-aw.com.br";
const SOCIAL_IMAGE = `${SITE_ORIGIN}/social-logo.png`;

type PageSeo = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
};

export function pageSeo({ path, title, description, noindex = false }: PageSeo) {
  const canonical = new URL(path, SITE_ORIGIN).href;
  const preventIndexing = noindex || import.meta.env.VITE_NOINDEX === "true";
  return {
    links: [{ rel: "canonical", href: canonical }],
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: preventIndexing ? "noindex, follow" : "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: SOCIAL_IMAGE },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "800" },
      { property: "og:image:alt", content: "Logo do Achadinhos-AW" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: SOCIAL_IMAGE },
      { name: "twitter:image:alt", content: "Logo do Achadinhos-AW" },
    ],
  };
}

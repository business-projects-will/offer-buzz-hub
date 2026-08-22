import sneakerImg from "@/assets/offers/sneaker.jpg";
import dogfoodImg from "@/assets/offers/dogfood.jpg";
import headphonesImg from "@/assets/offers/headphones.jpg";
import smartwatchImg from "@/assets/offers/smartwatch.jpg";
import serumImg from "@/assets/offers/serum.jpg";
import handbagImg from "@/assets/offers/handbag.jpg";
import keyboardImg from "@/assets/offers/keyboard.jpg";
import pettoysImg from "@/assets/offers/pettoys.jpg";

export type OfferCategory = "tecnologia" | "moda" | "pets" | "cosmeticos";

export interface Offer {
  id: string;
  title: string;
  store: string;
  category: OfferCategory;
  image: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  coupon?: string;
  couponLabel?: string;
  expiresIn: string;
  highlight?: boolean;
}

export const CATEGORY_LABELS: Record<OfferCategory, string> = {
  tecnologia: "Tecnologia",
  moda: "Moda",
  pets: "Pets",
  cosmeticos: "Cosméticos",
};

export const OFFERS: Offer[] = [
  {
    id: "air-max-masc",
    title: "Tênis Nike Air Max Masculino",
    store: "Loja Parceira Oficial",
    category: "moda",
    image: sneakerImg,
    originalPrice: 899.9,
    salePrice: 599.9,
    discount: 33,
    expiresIn: "termina em 6h",
    highlight: true,
  },
  {
    id: "rao-zeedog-15kg",
    title: "Ração Zee.Dog 15kg Premium",
    store: "Pet Store Parceira",
    category: "pets",
    image: dogfoodImg,
    originalPrice: 189.9,
    salePrice: 149.9,
    discount: 21,
    expiresIn: "termina hoje",
    highlight: true,
  },
  {
    id: "fone-anc-pro",
    title: "Fone Bluetooth Noise Canceling Pro",
    store: "Tech Deals BR",
    category: "tecnologia",
    image: headphonesImg,
    originalPrice: 499.9,
    salePrice: 349.9,
    discount: 30,
    coupon: "TECH30",
    couponLabel: "Extra 5% no carrinho",
    expiresIn: "termina em 12h",
  },
  {
    id: "smartwatch-fit-x2",
    title: "Smartwatch Fit Pro X2 AMOLED",
    store: "Tech Deals BR",
    category: "tecnologia",
    image: smartwatchImg,
    originalPrice: 399.9,
    salePrice: 279.9,
    discount: 30,
    expiresIn: "termina em 2 dias",
  },
  {
    id: "serum-vitamina-c",
    title: "Sérum Facial Vitamina C 30ml",
    store: "Beauty Club",
    category: "cosmeticos",
    image: serumImg,
    originalPrice: 129.9,
    salePrice: 89.9,
    discount: 31,
    coupon: "GLOW10",
    couponLabel: "10% extra na 1ª compra",
    expiresIn: "termina em 9h",
  },
  {
    id: "bolsa-couro-milano",
    title: "Bolsa de Couro Milano Matelassê",
    store: "Moda & Cia",
    category: "moda",
    image: handbagImg,
    originalPrice: 349.9,
    salePrice: 244.9,
    discount: 30,
    expiresIn: "termina em 1 dia",
  },
  {
    id: "teclado-mecanico-rgb",
    title: "Teclado Mecânico RGB 87 Teclas",
    store: "Setup Gamer Outlet",
    category: "tecnologia",
    image: keyboardImg,
    originalPrice: 449.9,
    salePrice: 314.9,
    discount: 30,
    coupon: "TEC15",
    couponLabel: "15% acima de R$ 299",
    expiresIn: "termina em 4h",
  },
  {
    id: "kit-brinquedos-pet",
    title: "Kit Brinquedos Pet Interativo",
    store: "Pet Store Parceira",
    category: "pets",
    image: pettoysImg,
    originalPrice: 89.9,
    salePrice: 59.9,
    discount: 33,
    expiresIn: "termina amanhã",
  },
];

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function buildTrackedUrl(offer: Offer, source = "web"): string {
  const params = new URLSearchParams({
    oid: offer.id,
    src: source,
    aff: "awin",
    utm_medium: "affiliate",
    utm_source: "ofertamax",
    utm_campaign: offer.category,
  });
  return `https://rastreio.ofertamax.app/click?${params.toString()}`;
}

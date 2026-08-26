# Contexto atual do projeto

Última atualização: 26/08/2026.

## Visão geral

O Achadinhos-AW é um portal de curadoria de ofertas e cupons distribuídos pelo site, WhatsApp e Telegram. O nome representa Achadinhos Anne e Will.

O projeto usa React 19, TanStack Start/Router, TypeScript, Vite 8 e Tailwind CSS 4.

## Páginas

- `/`: apresentação dos canais de WhatsApp e Telegram e seus benefícios.
- `/ofertas`: catálogo simulado com busca, filtros por categoria e fonte, além de paginação local de seis itens por página.
- `/compliance`: apoio ao afiliado, informações de publisher Awin, modelo de operação e acesso à página de afiliado do Mercado Livre.

## Marca e interface

- Nome oficial: Achadinhos-AW.
- Logo: `src/assets/achadinhos-v2-circular (2).png`, exibida circularmente no cabeçalho e rodapé.
- O ano do copyright é calculado dinamicamente com `new Date().getFullYear()`.

## Ofertas

As ofertas ainda são simuladas em `src/data/offers.ts`. Cada oferta possui uma fonte `awin` ou `mercado-livre`. A paginação e os filtros são locais até a integração com uma API.

## Configuração

Variáveis documentadas em `.env.example`:

- `VITE_WHATSAPP_URL`
- `VITE_TELEGRAM_URL`
- `VITE_AWIN_PUBLISHER_ID` — valor inicial `3052029`
- `VITE_AWIN_REGISTRATION` — valor inicial `AW-3052029`
- `VITE_MERCADO_LIVRE_AFFILIATE_URL` — página `https://www.mercadolivre.com.br/social/elwi4875632`

## Estado de validação

- Build de produção aprovado com `npm run build`.
- Lint aprovado sem erros com `npm run lint`.
- Permanecem seis avisos preexistentes de Fast Refresh nos componentes de UI.

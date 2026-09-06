# Contexto atual do projeto

Última atualização: 06/09/2026.

## Visão geral

O Achadinhos-AW é um portal de curadoria de ofertas e cupons distribuídos pelo site e WhatsApp. O nome representa Achadinhos Anne e Will.

O projeto usa React 19, TanStack Start/Router, TypeScript, Vite 8 e Tailwind CSS 4.

## Páginas

- `/`: apresentação do grupo de WhatsApp e seus benefícios, com cartão centralizado e responsivo.
- `/ofertas`: exibe aviso de “Em desenvolvimento” e identifica os produtos como demonstrativos; catálogo simulado com busca, filtros por categoria e fonte, além de paginação local de seis itens por página.
- `/compliance`: apoio ao afiliado, informações de publisher Awin, modelo de operação e acesso à página de afiliado do Mercado Livre.

## Marca e interface

- Nome oficial: Achadinhos-AW.
- Logo: `src/assets/achadinhos-v2-circular (2).png`, exibida circularmente no cabeçalho e rodapé.
- O ano do copyright é calculado dinamicamente com `new Date().getFullYear()`.
- O layout é responsivo para mobile, com navegação recolhível, CTAs fluidos, filtros com rolagem horizontal e modais adaptados a telas estreitas.

## Ofertas

As ofertas ainda são simuladas em `src/data/offers.ts`. Cada oferta possui uma fonte `awin` ou `mercado-livre`. A paginação e os filtros são locais até a integração com uma API.

## Configuração

Variáveis documentadas em `.env.example`:

- `VITE_WHATSAPP_URL`
- `VITE_AWIN_PUBLISHER_ID` — valor inicial `3052029`
- `VITE_AWIN_REGISTRATION` — valor inicial `AW-3052029`
- `VITE_MERCADO_LIVRE_AFFILIATE_URL` — página `https://www.mercadolivre.com.br/social/elwi4875632`

As fontes de tráfego exibidas são WhatsApp e site, sem percentuais não validados.

## Estado de validação

- Build de produção aprovado com `npm run build`.
- Lint aprovado sem erros com `npm run lint`.
- Permanecem seis avisos preexistentes de Fast Refresh nos componentes de UI.

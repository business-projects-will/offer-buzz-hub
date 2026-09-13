# Contexto atual do projeto

Última atualização: 12/09/2026.

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

## SEO técnico

- Metadados por página centralizados em `src/lib/seo.ts`, usando o `head` do TanStack Router e HTML renderizado no servidor.
- Títulos e descrições consistentes para busca, Open Graph e Twitter; idioma `pt-BR` e marca compartilhados no layout raiz.
- `/ofertas` usa `noindex, follow` e metadados de catálogo demonstrativo enquanto não houver ofertas reais. Ao lançar o catálogo, revisar essa diretiva.
- Origem oficial confirmada: `https://www.achadinhos-aw.com.br`, com `/` na homepage e sem barra final nas páginas internas. Canonical e `og:url` específicos por página.
- `public/sitemap.xml` lista somente `/` e `/compliance`; atualizar ao adicionar páginas indexáveis ou lançar o catálogo. `public/robots.txt` preserva os grupos existentes e informa o sitemap.
- `public/social-logo.png` reutiliza a logo de 800 × 800 para Open Graph e Twitter, com URL absoluta.
- `public/llms.txt` descreve o portal e aponta para páginas reais; segue a proposta https://llmstxt.org/ e não garante indexação ou citações por IA.
- Em builds de preview/homologação, configurar `VITE_NOINDEX=true`; em produção, manter `false`. Essa variável afeta os metadados das páginas, não bloqueia acesso nem altera os arquivos públicos de descoberta.
- Canonical segue a orientação do head nativo do TanStack Router: https://tanstack.com/router/latest/docs/guide/document-head-management. Sitemap segue https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap.
- Validação: build e lint aprovados (seis avisos preexistentes); HTTP local com canonical e metadados SSR únicos nas três páginas, sitemap XML válido, robots/llms como texto, imagem PNG e rota inexistente com status 404. Arquivos servidos conferidos com os emitidos no build. Após deploy, conferir respostas e redirects de HTTPS/domínio/barra final na hospedagem; produção e navegação no navegador não foram verificadas.

## Headers de segurança

- `src/lib/security-headers.ts` define `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy` desabilitando câmera, microfone, geolocalização, pagamentos e USB, recursos não utilizados pelo portal.
- `vite.config.ts` aplica os headers via `routeRules` do Nitro, incluindo arquivos públicos. `src/server.ts` também cobre respostas SSR e erros.
- CSP aplicada nos builds de produção: scripts da própria origem e scripts SSR autorizados por nonce criptográfico de 128 bits, gerado por resposta em `src/router.tsx`. Eventos inline, objetos, frames e incorporação por terceiros são bloqueados; `base-uri 'none'` e formulários restritos à própria origem. Não há `unsafe-eval` nem `unsafe-inline` para scripts.
- Fontes externas permitidas somente em `fonts.googleapis.com` (CSS) e `fonts.gstatic.com` (fontes). Estilos inline permanecem permitidos por necessidade do React/Radix. Imagens são locais ou `data:`; conexões são da própria origem. Links externos de WhatsApp e afiliados continuam como navegação normal. Novos scripts, APIs, fontes ou embeds exigem revisão da CSP.
- HTML SSR usa `Cache-Control: private, no-store` para não reutilizar nonces em cache compartilhado; assets com hash preservam cache imutável. A CSP fica desativada no servidor de desenvolvimento para compatibilidade com HMR.
- A página de erro usa link de recarga, substituindo o evento `onclick` incompatível com a CSP. Falhas fora do renderizador recebem CSP sem permissão de scripts.
- HTTPS público confirmado; a Vercel já enviava `Strict-Transport-Security: max-age=63072000`, preservado sem adicionar `includeSubDomains` ou `preload`.
- Referências: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy e https://nitro.build/config. A proteção do HTML usa as APIs `createStartHandler`/`defaultStreamHandler` e `router.options.ssr.nonce` verificadas nos pacotes instalados.
- Validação: build e lint aprovados (seis avisos existentes). `node scripts/check-security.mjs http://127.0.0.1:4177` passou contra o servidor Nitro de produção (`PORT=4177 HOST=127.0.0.1 node .output/server/index.mjs`), verificando headers, nonces únicos e correspondentes aos scripts, HTML, 404, arquivos de descoberta, PNG e cache de JavaScript.
- Chrome headless: três páginas, hidratação, busca e modal passaram sem violações; script inline de teste sem nonce foi bloqueado. Vite preview não aplica os headers Nitro aos arquivos públicos, portanto não substitui esse teste. Validar novamente após deploy na Vercel; nenhum deploy ou pentest completo foi realizado.
- `npx tsc --noEmit` ainda aponta cinco erros TS4111 já presentes antes dos headers, no acesso a variáveis de ambiente em `community-links.ts`, `seo.ts` e `compliance.tsx`; não há erros novos nos arquivos desta implementação.

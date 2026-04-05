---
title: "Começando com React e Next.js"
description: "Um guia rápido para iniciar projetos com React e Next.js."
tags: [react, typescript, nextjs]
date: "2026-04-04"
---

# Começando com React e Next.js

Este post ensina o básico para criar aplicativos com Next.js.

## Por que Next.js?

Next.js é um framework React que oferece:

1. **Server-side rendering** - melhor SEO e performance
2. **File-based routing** - rotas automáticas
3. **API routes** - backend em Node.js

## Instalação

```bash
npx create-next-app my-app
cd my-app
npm run dev
```

## Estrutura de arquivos

```
src/app/
  layout.tsx    - layout global
  page.tsx      - página principal
  about/page.tsx - página /about
```

Com isso você já tem um projeto funcionando!

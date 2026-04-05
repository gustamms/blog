# Blog Pessoal — Gustavo Mendes

Um blog pessoal para compartilhar conteúdos sobre desenvolvimento, construído com **Next.js 15**, **Tailwind CSS** e **TypeScript**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4?logo=tailwind-css)

## Funcionalidades

- Posts em **Markdown** com frontmatter (título, descrição, tags, data)
- Busca por texto nos posts
- Filtro por tags com um clique
- Renderização de Markdown para HTML no post individual
- Página **Sobre mim** com link para currículo em PDF
- Deploy automático via **GitHub Actions + Vercel** a cada push na `main`

## Estrutura

```posts/                ← Seus posts em Markdown (.md)
├── meu-primeiro-post.md
└── ...

src/
├── app/
│   ├── page.tsx                ← Página principal com lista de posts
│   ├── posts/[slug]/page.tsx   ← Página individual do post
│   ├── sobre/page.tsx          ← Página sobre mim
│   ├── layout.tsx              ← Layout global
│   └── globals.css             ← Estilos globais + Tailwind
├── components/
│   ├── PostCard.tsx            ← Card do post
│   ├── SearchBar.tsx           ← Busca por texto
│   ├── TagFilter.tsx           ← Filtro por tags
│   ├── Header.tsx              ← Cabeçalho + navegação
│   └── Footer.tsx              ← Rodapé
└── lib/
    └── posts.ts                ← Leitura e parse dos .md

public/
└── curriculo.pdf               ← Currículo para download
```

## Como escrever um post

Crie um arquivo `.md` na pasta `posts/`:

```md
---
title: "Título do Post"
description: "Breve descrição do que o post aborda"
tags: [typescript, react, javascript]
date: "2026-04-05"
---

# Título

Seu conteúdo em Markdown vai aqui.

## Subtítulo

Você pode usar **negrito**, `código`, listas, e muito mais.

\`\`\`typescript
const nome = "Gustavo";
console.log(`Olá, ${nome}!`);
\`\`\`
```

**Campos do frontmatter:**

| Campo | Descrição | Exemplo |
|---|---|---|
| `title` | Título do post | `"Meu Post"` |
| `description` | Breve descrição (aparece no card) | `"Aprendendo Go"` |
| `tags` | Tags para busca e filtro | `[react, typescript]` |
| `date` | Data de publicação | `"2026-04-05"` |

## Instalação e execução local

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (http://localhost:3000)
npm run dev

# Build de produção
npm run build

# Iniciar em produção
npm run start
```

## Deploy

O deploy é automático. Cada push para a branch `main` dispara o GitHub Actions que faz deploy na Vercel.

Para configurar o deploy:

1. Crie um projeto na Vercel conectado ao repositório
2. Configure os secrets no GitHub:
   - `VERCEL_TOKEN` — [Token de acesso](https://vercel.com/account/tokens) na Vercel
   - `VERCEL_ORG_ID` — ID da sua organização na Vercel
   - `VERCEL_PROJECT_ID` — ID do projeto (pegue nas configurações)

## Stack

- [Next.js 15](https://nextjs.org/) — Framework React com App Router
- [Tailwind CSS](https://tailwindcss.com/) — Estilização com classes utilitárias
- [gray-matter](https://github.com/jonschlinkert/gray-matter) — Parse de frontmatter
- [remark](https://github.com/remarkjs/remark) — Markdown para HTML
- [GitHub Actions](https://github.com/features/actions) — CI/CD automático

---

Feito por Gustavo Mendes

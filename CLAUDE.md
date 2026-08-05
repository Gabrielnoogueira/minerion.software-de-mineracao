@AGENTS.md

# Minerion ERP — Landing Page de Vendas

Landing page (single page) para gerar agendamentos de demonstração do produto Minerion ERP, voltada a donos/diretores de mineradoras.

## Stack
- **Next.js 16** (App Router, Turbopack) — não trocar sem pedido explícito.
- **TypeScript** + **Tailwind CSS v4**.
- **GitHub** para versionamento. **Vercel** para deploy.
- **Supabase** para armazenar os leads do formulário de agendamento.
- Sempre usar a versão mais recente de cada ferramenta/lib. Antes de integrar uma API nova, checar a documentação oficial atual. Se a API tiver versão na URL, deixar numa constante única.
- Este projeto roda em Next.js 16, que pode ter mudanças de API não presentes nos dados de treinamento do modelo. Antes de mexer em convenções do App Router, consultar `node_modules/next/dist/docs/` (ver `AGENTS.md`).

## Comandos
```bash
npm run dev      # ambiente de desenvolvimento (Turbopack)
npm run build    # build de produção
npm run start    # roda o build de produção localmente
npm run lint      # ESLint
```

## Identidade visual (fiel à marca Minerion — minerion.com.br)
- **Cores** (tokens em `tailwind.config`):
  - `lime` `#DCFF0A` — destaque principal (títulos, CTAs, realces).
  - `grey` `#373737` — cinza-chumbo escuro (fundos de seções escuras/header/form).
  - `sand` `#ede8d5` — tom areia (uso pontual, seções alternadas).
  - `teal` `#1c6f65` — acento secundário.
  - `white` `#fff` / `black` `#000`.
- **Fontes** (via `next/font/google`):
  - `IBM Plex Mono` — títulos e destaques (estilo terminal/tech).
  - `IBM Plex Sans` — corpo de texto.
- **Logo**: arquivo oficial em `public/minerion-logo.png` (header) e `public/minerion-logo-footer.png` (rodapé) — não recriar como texto.
- **Fundo do hero**: padrão técnico em CSS/SVG (gradiente escuro + grid + ícones sutis) até recebermos uma foto real de maquinário para `public/hero-bg.jpg`.

## Convenções de código
- Componentes de seção da landing em `components/`, um arquivo por seção (`Hero.tsx`, `BigNumbers.tsx`, etc.), montados em `app/page.tsx` na ordem definida no plano.
- Dados de conteúdo (depoimentos, módulos) como arrays tipados em `data/`.
- Formulário (`DemoForm.tsx`) é Client Component; o envio passa por Server Action (`app/actions/submitLead.ts`), que valida o captcha e grava no Supabase — nunca inserir direto do client.
- Mobile-first em todo componente novo: layout de 1 coluna por padrão, breakpoints `sm/md/lg` do Tailwind para expandir.

## Segurança
- Segredos apenas em variáveis de ambiente (`.env.local` local, Environment Variables na Vercel). Nunca no código, nunca commitados.
- `.env*` já está no `.gitignore`.
- Nenhuma variável sensível com prefixo `NEXT_PUBLIC_`. A `SUPABASE_SERVICE_ROLE_KEY` só é usada em código server-side (Server Actions).
- `NEXT_PUBLIC_SUPABASE_URL` pode ser pública — é protegida por RLS no Supabase.

## Como trabalhar neste projeto
- Sempre apresentar o plano antes de construir e esperar aprovação.
- Git desde o início: cada mudança relevante aprovada vira um commit com mensagem clara (`feat/fix/refactor/chore`). Nunca dar push sem revisão.
- Explicações em português simples. Ao ocorrer erro, explicar antes de corrigir.
- Design caprichado, mobile-first, responsivo desde o começo.
- Uma mudança por vez — não alterar o que não foi pedido.

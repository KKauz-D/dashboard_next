# Crypto Analytics Dashboard

Um painel de controle interativo e responsivo focado no monitoramento de criptomoedas. Desenvolvido para demonstrar conceitos avançados de arquitetura Front-end utilizando o ecossistema moderno do Next.js (App Router).

## Tecnologias Utilizadas

* **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Gráficos:** Recharts
* **Ícones:** React Icons & Lucide React
* **Tematização:** Next-themes (Dark/Light Mode)
* **Consumo de Dados:** CoinGecko API

## Funcionalidades e Diferenciais Arquiteturais

Este projeto não é apenas uma interface visual, ele implementa padrões de mercado para aplicações robustas:

* **Padrão BFF (Backend for Frontend):** O frontend não chama a API da CoinGecko diretamente. Criei uma *Route Handler* (`app/api/dashboard-data/route.ts`) no Next.js que busca, limpa e formata os dados brutos antes de entregá-los aos componentes visuais.
* **Autenticação Simulada & Proteção de Rotas:** Utilização de *Server Actions* para processar o login com segurança no servidor e injeção de Cookies (`httpOnly`). Um *Proxy* nativo do Next.js protege a rota `/dashboard` contra acessos não autorizados.
* **Gerenciamento de Estado via URL:** Em vez de usar `useState` excessivamente no cliente, o estado da moeda selecionada (Bitcoin, Ethereum, Solana) e a conversão fiduciária (USD, BRL, EUR) são controlados via *Search Params* na URL, permitindo SSR e compartilhamento de links com o estado exato da página.
* **Acessibilidade Visual:** Implementação nativa de Dark/Light mode com persistência de preferência do usuário, estendendo as cores dinâmicas até os elementos SVG do Recharts.
* **Tratamento de Erros e Carregamento:** Uso nativo do React Suspense com `loading.tsx` (Skeleton Screens) e `error.tsx` (Error Boundaries) para garantir que falhas de rede não quebrem a experiência do usuário.

## Como rodar o projeto localmente

1. Clone o repositório:
```bash
git clone https://github.com/KKauz-D/dashboard_next.git
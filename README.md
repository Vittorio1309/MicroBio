# MicroBio

Este repositório está focado no **Front-end (Node.js + Vite + React)**.

Como o Back-end em Spring Boot ficará em outro repositório, a melhor estratégia é manter uma separação clara entre:

- responsabilidades (UI no front, regras de negócio no back),
- contratos (API versionada via OpenAPI),
- ambientes (dev/hml/prod),
- e fluxo de trabalho (branches, CI, releases).

## Organização recomendada (fase atual: apenas front)

```text
microbio-frontend/
├─ src/
│  ├─ app/                 # bootstrap da aplicação, providers globais
│  ├─ pages/               # páginas de rota (Home, Login, Dashboard...)
│  ├─ features/            # módulos por domínio (auth, soil-analysis, etc.)
│  │  └─ <feature>/
│  │     ├─ components/
│  │     ├─ hooks/
│  │     ├─ services/
│  │     ├─ types/
│  │     └─ index.ts
│  ├─ shared/              # componentes e utilitários reutilizáveis
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ utils/
│  │  ├─ constants/
│  │  └─ types/
│  ├─ assets/              # imagens, fontes e ícones
│  ├─ styles/              # estilos globais/tokens CSS
│  ├─ routes/              # configuração central de rotas
│  └─ main.tsx
├─ public/
├─ tests/
├─ .env.example
├─ package.json
└─ README.md
```

## Convenções úteis para o front

- **Padrão de pastas por feature**: facilita manutenção e escala.
- **Nomenclatura**:
  - Componentes: `PascalCase` (ex.: `SoilCard.tsx`)
  - Hooks: `useCamelCase` (ex.: `useSoilData.ts`)
  - Utilitários: `camelCase` (ex.: `formatDate.ts`)
- **Serviços de API centralizados** em `src/shared/services/http.ts` + clients por feature.
- **Variáveis de ambiente** sempre via `.env` e documentadas em `.env.example`.

## Integração com o back-end (quando iniciar o Spring Boot)

Mesmo em repositórios separados, já vale preparar:

1. **Contrato de API primeiro**
   - Definir endpoints no OpenAPI/Swagger.
   - Versionar como `/api/v1`.
2. **Cliente HTTP no front**
   - Base URL via `VITE_API_URL`.
   - Interceptors para token e tratamento de erro.
3. **Ambientes**
   - `dev`, `homolog`, `prod` com variáveis separadas.
4. **Estratégia de autenticação**
   - JWT com refresh token (ou sessão, dependendo da decisão de segurança).

## Roadmap de organização sugerido

1. Padronizar estrutura do `src/` por feature.
2. Configurar ESLint + Prettier + lint-staged + Husky.
3. Criar camada de serviços HTTP e tipagem de respostas.
4. Adicionar testes (unitários + alguns de integração).
5. Definir CI do front (build + lint + test).
6. Publicar contrato inicial da API para alinhamento com o repositório Spring Boot.

## Recomendação para o repositório do back-end (futuro)

Quando criar o repositório Java/Spring Boot, a estrutura inicial pode ser:

```text
microbio-backend/
├─ src/main/java/com/microbio/
│  ├─ config/
│  ├─ controller/
│  ├─ service/
│  ├─ repository/
│  ├─ domain/
│  └─ dto/
├─ src/main/resources/
├─ src/test/
├─ docker-compose.yml
└─ README.md
```

> Enquanto o foco for só o front, mantenha tudo de UI/UX, componentes, rotas e estado apenas neste repositório e evite misturar arquivos Java aqui.
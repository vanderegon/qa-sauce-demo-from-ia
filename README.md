# qa-sauce-demo-from-ia

Suite de testes E2E para [SauceDemo](https://www.saucedemo.com), gerada e mantida por um **Agente de IA de QA** rodando no n8n com o **MCP Playwright**.

## Arquitetura

```
n8n (DigitalOcean droplet)
 └── Workflow "Agente para QA"
      ├── Chat Trigger (público)
      ├── AI Agent (gpt-4o)
      ├── Memory: Buffer Window
      └── Tool: MCP Playwright (http://165.22.1.197:8931/sse)
                 └── executa o navegador headless de verdade
```

O agente:
1. Recebe a descrição do cenário pelo chat.
2. Navega no site real via MCP Playwright (`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, ...).
3. Inspeciona DOM/acessibilidade para escolher locators estáveis.
4. Gera um arquivo `.spec.ts` neste repositório.
5. (Opcional) Faz commit e push.

## Stack

- [Playwright Test](https://playwright.dev/) + TypeScript
- Node.js 20+
- CI: GitHub Actions (Chromium + Firefox + WebKit)

## Como rodar localmente

```bash
npm install
npx playwright install --with-deps
npm test
```

Relatório HTML:

```bash
npm run report
```

## Estrutura

```
tests/
  pages/        # Page Objects
  fixtures.ts   # fixtures customizadas (loginAsStandardUser, etc.)
  *.spec.ts     # specs gerados/auditados pelo agente
```

## Convenções dos testes gerados pelo agente

- Locators por **role**, **label** ou `data-test` (saucedemo expõe vários `data-test`).
- Asserções com `expect(locator).toBeVisible()` / `toHaveURL()` em vez de waits arbitrários.
- Cada teste é independente (usa fixture de login quando precisa de sessão).
- Cobertura: caminho feliz **e** caminho de erro.

## Credenciais do SauceDemo (públicas, fornecidas pelo próprio site)

| Usuário              | Comportamento                          |
|----------------------|----------------------------------------|
| `standard_user`      | normal                                 |
| `locked_out_user`    | bloqueado                              |
| `problem_user`       | imagens/elementos com bug              |
| `performance_glitch_user` | navegação lenta                  |
| `error_user`         | erros aleatórios                       |
| `visual_user`        | mudanças visuais                       |

Senha (todos): `secret_sauce`

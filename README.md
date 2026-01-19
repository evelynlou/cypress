## Automação com Cypress

Conteúdo

- [Introdução ao Cypress](#introducao-cypress)
- [Pre-requisitos](#pre-requisitos)
- [Instalação do Cypress](#Instalação-do-Cypress)
- [Estrutura e regras da escrita de testes](#Estrutura-e-regras-da-escrita-de-testes)
- [Automação de APIs com Cypress](#automação-de-apis-com-cypress)
- [Principais Comandos Utilizados](#Principais-Comandos-Utilizados)
- [Hooks do Cypress](#Hooks-do-Cypress)
- [Modo de Execução do Cypress](#Modo-de-Execução-do-Cypress)
- [Estrutura de Arquivos e Configurações](#Estrutura-de-Arquivos-e-Configurações)


---

## Introdução ao Cypress

O **Cypress** é uma ferramenta moderna de automação de testes para aplicações web, desenvolvida como uma biblioteca JavaScript.
Ele permite a criação de testes **end-to-end (E2E)** e **testes de componentes**, facilitando a escrita, execução e depuração de cenários reais de uso em aplicações front-end.
Além disso, o Cypress vai além de testes puramente visuais: também é possível validar comportamentos de **APIs**, efetuar **mocks de requisições**, interagir com o **sistema de arquivos** e controlar o **ambiente de execução**, permitindo uma cobertura de testes mais completa e eficiente.

---

## Pré-requisitos

Para utilizar o Cypress, é necessário ter os seguintes recursos instalados:

- **Git**  
  https://git-scm.com

- **Node.js** (inclui o npm)  
  https://nodejs.org

- **IDE de sua preferência**  
  Recomendado: **Visual Studio Code**  
  https://code.visualstudio.com
  
---

## Instalação do Cypress

Após atender aos pré-requisitos, é necessário instalar o Cypress no projeto.

No diretório do projeto, execute:

```bash
npm install cypress --save-dev
```

Ou, para instalar uma versão específica:

```bash
npm install cypress@<versao> --save-dev
```

Após a instalação, execute o Cypress pela primeira vez para criar a estrutura padrão:

```bash
npx cypress open
```

---

## Estrutura e regras da escrita de testes

No Cypress, os testes seguem uma estrutura baseada em blocos, utilizada para organizar cenários de validação.

 `describe()` — Suíte de testes

Agrupa casos de teste relacionados, representando uma funcionalidade ou fluxo da aplicação.

```js
describe('Validação da busca no site da Intelbras', () => {
  // casos de teste aqui
})
```
 `it()` — Caso de Teste

Define o teste individual, contendo ações e validações (assertions).
```js
it('Deve exibir um modal ao clicar no botão', () => {
  cy.get('button[data-action="open-modal"]').click()
  cy.get('.modal-content').should('be.visible')
})

```
### Encadeamentos de Comandos
Os comandos do Cypress retornam o próprio elemento, permitindo continuidade do encadeamento:
```js
cy.get('.search-input')
.should('be.visible')
.click()
.type('telefone')
```
#### Boas Práticas:

| ❌ Evitar | ✔️ Recomendado |
|----------|---------------|
| Ações → Validações | Validações → Ações |
| `.type().should()` | `.should().type()` |

#### Uso de Alias

Outra estratégia para deixar o código mais limpo é usar alias, evitando repetir seletores:
```js
cy.get('input[type="text"]')
.as('textField')
.should('be.visible')
.type('Olá mundo!')

cy.get('@textField')
.should('have.value', 'Olá mundo!')
```
Documentação sobre a Regra de encadeamento:
[Regra de Encadeamento](https://docs.cypress.io/guides/core-concepts/retry-ability)

---

## Automação de APIs com Cypress
O Cypress oferece suporte à automação de testes de API, possibilitando a validação de endpoints e regras de negócio de forma isolada, sem dependência da interface gráfica.

Esse tipo de teste é especialmente útil para:

- Validar endpoints REST (GET, POST, PUT, DELETE)
- Verificar códigos de status HTTP
- Validar corpo da resposta (response body)
- Garantir regras de negócio no backend
- Executar testes mais rápidos e estáveis
- Complementar testes E2E com cobertura de API

```js
describe('Testes de API - Usuários', () => {
  it('Deve retornar a lista de usuários', () => {
    cy.request('GET', '/users').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })
})
```

### Boas práticas em testes de API com Cypress

- Utilizar cy.request() para comunicação HTTP

- Validar sempre o status code

- Validar o conteúdo da resposta

- Evitar dependência entre testes

- Usar dados dinâmicos para evitar conflitos

- Utilizar failOnStatusCode: false quando o erro é esperado

---

## Principais Comandos Utilizados
O Cypress possui diversos comandos de ação e verificação, abaixo estão listados os principais comandos utilizados., toda vez que chamar um comando, começamos com o prefixo `cy.`:


| Comando | Função | Exemplo |
|-------|--------|--------|
| `cy.visit()` | Acessa uma URL | `cy.visit('/login')` |
| `cy.get()` | Seleciona elementos do DOM por seletor | `cy.get('#email')` |
| `cy.contains()` | Seleciona elemento pelo texto | `cy.contains('Enviar')` |
| `cy.click()` | Realiza clique | `cy.get('.btn').click()` |
| `cy.type()` | Digita em inputs | `cy.get('#email').type('teste@site.com')` |
| `cy.should()` | Valida estado ou resultado esperado | `cy.get('.msg').should('be.visible')` |
| `.and()` | Encadeia novas validações | `.should('exist').and('contain', 'Sucesso')` |
| `cy.request()` | Realiza requisição HTTP | `cy.request('GET', '/api/produtos')` |
| `cy.intercept()` | Observa ou simula requisições | `cy.intercept('GET', '/api/produtos').as('produtos')` |

Documentação completa de comandos:
[Cypress API: Table of Contents | Cypress Documentation ](https://docs.cypress.io/api/table-of-contents)

### Outros recursos do Cypress

Além dos comandos, o Cypress disponibiliza utilitários e funções auxiliares, como `Cypress._`, que permite trabalhar com bibliotecas como **Lodash**.  
Esses recursos podem ser utilizados para repetir ações, manipular dados ou controlar execuções, como repetir uma ação um determinado número de vezes.

---

## Hooks do Cypress
Os hooks são utilizados para executar ações antes e depois do conjunto de testes (describe) ou de cada caso de teste (it).


| Hook | Quando executa | Uso comum |
|-----|---------------|-----------|
| `before()` | Executa **uma vez** antes de todos os testes | Login, setup inicial, criação de massa de dados |
| `beforeEach()` | Executa **antes de cada** `it` | Visitar páginas, limpar estado, preparar cenário |
| `afterEach()` | Executa **após cada** `it` | Limpeza de mocks, logs, reset de dados |
| `after()` | Executa **uma vez** após todos os testes | Finalização, logout, teardown geral |

Exemplo:

```js
      beforeEach(() => {
        cy.visit(produto.url)
```
Dessa forma, a cada caso de teste (it) a página é visitada novamente, garantindo fluxo limpo e sem cache.

---

## Modo de Execução do Cypress
O Cypress pode ser executado de duas formas:


| Modo | Comando | Uso comum |
|------|--------|-----------|
| Interativo (Test Runner UI) | `npx cypress open` | Desenvolvimento e depuração com visualização dos testes em tempo real |
| Headless | `npx cypress run` | Execução em pipelines CI/CD, geração de relatórios e testes de performance |

> 💡 **Observação:**  
> Em projetos que utilizam scripts configurados no `package.json`, a execução pode ser feita utilizando  
> `npm run <nome-do-script>` (por exemplo: `npm run cy:open` ou `npm run cy:run`).


No modo interativo, é possível observar:

- Execução do teste passo a passo
- Logs de comandos na lateral
- Pré-visualização do DOM e dos elementos
- Captura de requests (útil para debugging)

O modo headless é ideal quando não é necessário abrir o navegador para ver a execução, por exemplo, em automações no CI.

---

## Estrutura de Arquivos e Configurações
O Cypress possui diversas pastas, e cada uma delas é direcionada para uma característica específica do projeto.


| Caminho | Descrição |
|--------|-----------|
| `package.json` | Arquivo principal do projeto. Armazena dependências e scripts de execução (ex.: `cy:open`, `cy:run`) |
| `cypress.config.js` | Configuração global do Cypress (`baseUrl`, `viewport`, `timeouts`, `retries`, etc.) |
| `cypress/e2e/` | Diretório onde ficam os testes automatizados (`.cy.js` ou `.cy.ts`) |
| `cypress/fixtures/` | Massa de dados, mocks e arquivos estáticos usados nos testes |
| `cypress/support/commands.js` | Definição de comandos customizados reutilizáveis |
| `cypress/support/e2e.js` | Arquivo carregado antes dos testes; importa comandos e configurações globais |

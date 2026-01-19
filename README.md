## Automação com Cypress

## Introdução

O **Cypress** é uma ferramenta moderna de automação de testes para aplicações web, desenvolvida como uma biblioteca JavaScript.
Ele permite a criação de testes **end-to-end (E2E)** e **testes de componentes**, facilitando a escrita, execução e depuração de cenários reais de uso em aplicações front-end.
Além disso, o Cypress vai além de testes puramente visuais: também é possível validar comportamentos de **APIs**, efetuar **mocks de requisições**, interagir com o **sistema de arquivos** e controlar o **ambiente de execução**, permitindo uma cobertura de testes mais completa e eficiente.


## Pré-requisitos

Para utilizar o Cypress, é necessário ter os seguintes recursos instalados:

- **Git**  
  https://git-scm.com

- **Node.js** (inclui o npm)  
  https://nodejs.org

- **IDE de sua preferência**  
  Recomendado: **Visual Studio Code**  
  https://code.visualstudio.com
  

## Estrutura e regras da escrita de testes

No Cypress, os testes seguem uma estrutura baseada em blocos, utilizada para organizar cenários de validação.

### `describe()` — Suíte de testes

Agrupa casos de teste relacionados, representando uma funcionalidade ou fluxo da aplicação.

```js
describe('Validação da busca no site da Intelbras', () => {
  // casos de teste aqui
})
```
### `it()` — Caso de Teste

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
Documentação sobre a regrra de encadeamento:
[Regra de Encadeamento](https://docs.cypress.io/guides/core-concepts/retry-ability)

## Automação de APIs com Cypress

O Cypress vai muito além de validações realizadas no front-end.  
Ele também permite a automação de **testes de API**, possibilitando validar regras de negócio, contratos de resposta e fluxos de integração sem depender da interface gráfica.

Esse tipo de teste é especialmente útil para:

- Validar endpoints REST (GET, POST, PUT, DELETE)
- Verificar códigos de status HTTP
- Validar corpo da resposta (response body)
- Garantir regras de negócio no backend
- Executar testes mais rápidos e estáveis
- Complementar testes E2E com cobertura de API

### Boas práticas em testes de API com Cypress

- Utilizar cy.request() para comunicação HTTP

- Validar sempre o status code

- Validar o conteúdo da resposta

- Evitar dependência entre testes

- Usar dados dinâmicos para evitar conflitos

- Utilizar failOnStatusCode: false quando o erro é esperado

## Principais Comandos Utilizados
O cypress possui diversos comandos de ação e verificação, segue abaixo os principais utilizados, toda vez que chamar um comando, começamos com “cy.”:
### Principais comandos do Cypress

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
        cy.visitPage(produto.url)
```
Dessa forma, a cada caso de teste (it) a página é visitada novamente, garantindo fluxo limpo e sem cache.

## Modo de Execução do Cypress
O Cypress pode ser executado de duas formas:
### Modos de Execução do Cypress

| Modo | Comando | Uso comum |
|------|--------|-----------|
| Interativo (Test Runner UI) | `npx cypress open` | Desenvolvimento e depuração com visualização dos testes em tempo real |
| Headless | `npx cypress run` | Execução em pipelines CI/CD, geração de relatórios e testes de performance |

No modo interativo, é possível observar:

- Execução do teste passo a passo
- Logs de comandos na lateral
- Pré-visualização do DOM e dos elementos
- Captura de requests (útil para debugging)

O modo headless é ideal quando não é necessário abrir o navegador para ver a execução, por exemplo, em automações no CI.

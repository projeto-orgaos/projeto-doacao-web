# LifeLoom Frontend

Bem-vindo ao **LifeLoom**, uma aplicação para gerenciar doações e recepções de órgãos. Este projeto utiliza **React 18**, **TypeScript** e **Chakra UI** para criar uma interface de usuário moderna, responsiva e acessível.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuições](#contribuições)
- [Licença](#licença)

---

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas no seu ambiente:

- [Node.js](https://nodejs.org/) (versão recomendada: 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

Certifique-se também de ter o backend do projeto configurado e rodando. O frontend se conecta ao backend via API.

---

## Instalação

Clone este repositório em sua máquina:

```bash
git clone git@github.com:projeto-orgaos/projeto-doacao-web.git
```

Acesse o diretório do projeto:

```bash
cd lifeloom-frontend
```

Instale as dependências do projeto:

```bash
npm install
```

Se preferir o **yarn**:

```bash
yarn install
```

---

## Rodando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Ou, se estiver utilizando o **yarn**:

```bash
yarn run dev
```

O projeto estará disponível em:

```
http://localhost:5173
```

---

## Scripts Disponíveis

### `npm run dev` ou `yarn run dev`

Inicia o servidor de desenvolvimento no ambiente local.

### `npm run build` ou `yarn build`

Cria a versão de produção da aplicação na pasta `build`.

### `npm run lint` ou `yarn lint`

Executa o linter (ESLint) para verificar a qualidade do código.


## Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
lifeloom-frontend/
├── src/
│   ├── assets/           # Imagens e outros arquivos estáticos
│   ├── components/       # Componentes reutilizáveis
│   ├── constants/        # Constantes globais
│   ├── context/          # Gerenciamento de contexto com React Context API
│   ├── layout/           # Layouts reutilizáveis (ex.: MainLayout)
│   ├── pages/            # Páginas da aplicação
│   ├── api/              # Configuração de chamadas à API
│   ├── styles/           # Estilizações globais
│   ├── utils/            # Funções utilitárias
│   ├── App.tsx           # Ponto de entrada principal
│   ├── index.tsx         # Arquivo principal para renderização
├── public/               # Arquivos públicos
├── package.json          # Configuração de dependências
```

---

## Tecnologias Utilizadas

- **[React](https://reactjs.org/):** Biblioteca para construção de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/):** Superset de JavaScript com tipagem estática.
- **[Chakra UI](https://chakra-ui.com/):** Biblioteca de componentes para estilização e acessibilidade.
- **[Axios](https://axios-http.com/):** Cliente HTTP para comunicação com a API.
- **[React Router](https://reactrouter.com/):** Gerenciamento de rotas.




## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT). Sinta-se à vontade para utilizá-lo, modificá-lo e distribuí-lo.

---

**Desenvolvido com ❤️ por Joao Santos, Joao Vitor Luiz, Felipe Brian**
```
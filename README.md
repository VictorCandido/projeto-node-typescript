# Projeto Node.Js com Typescript - PAI 3 trimestre - Biblioteca

## Setup

- `npm init -y` para iniciar um projeto em node
- `npm i typescript @types/node -D` para instalar typescript
- `npx tsc --init` para iniciar configuração do typescript
- Editar `"target": "ES2020"` dentro do arquivo `tsconfig.json`
- `npm i tsx -D` para instalar o tsx que irá iniciar e rodar o servidor
- Adicionar `"start": "tsx watch src/index.ts"` dentro do `package.json` para iniciar o serviço sem precisar de nodemon
- `npm i vitest -D` para instalar o vitest como serviço de testes
- Adicionar `"test": "vitest"` dentro do `package.json` para rodar os testes do projeto

Setup typescript + testes finalizado
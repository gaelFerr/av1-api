# AV1 API - Node.js + TypeScript

API REST desenvolvida para a atividade AV1, com 3 CRUDs completos (Categoria, Produto e Cliente), validação de dados com Zod e persistência com Prisma + SQLite.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Zod (validação de schemas)

## Como rodar o projeto

### Pré-requisitos
- Node.js instalado (versão 18 ou superior)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/gaelFerr/av1-api.git
cd av1-api
```

2. Instale as dependências:
```bash
npm install
```

3. Gere o Prisma Client:
```bash
npx prisma generate
```

4. Rode o servidor:
```bash
npm run dev
```

O servidor vai rodar em `http://localhost:3000`.

> O banco de dados SQLite (`dev.db`) já está incluído no repositório com as tabelas criadas, não sendo necessário rodar migrations novamente.

## Endpoints disponíveis

### Categoria
| Método | Rota | Descrição |
|---|---|---|
| GET | /categorias | Lista todas as categorias |
| GET | /categorias/:id | Busca uma categoria pelo ID |
| POST | /categorias | Cria uma nova categoria |
| PUT | /categorias/:id | Atualiza uma categoria existente |
| DELETE | /categorias/:id | Remove uma categoria |

### Produto
| Método | Rota | Descrição |
|---|---|---|
| GET | /produtos | Lista todos os produtos (com dados da categoria) |
| GET | /produtos/:id | Busca um produto pelo ID |
| POST | /produtos | Cria um novo produto |
| PUT | /produtos/:id | Atualiza um produto existente |
| DELETE | /produtos/:id | Remove um produto |

### Cliente
| Método | Rota | Descrição |
|---|---|---|
| GET | /clientes | Lista todos os clientes |
| GET | /clientes/:id | Busca um cliente pelo ID |
| POST | /clientes | Cria um novo cliente |
| PUT | /clientes/:id | Atualiza um cliente existente |
| DELETE | /clientes/:id | Remove um cliente |

## Exemplo de corpo de requisição (POST/PUT)

**Categoria:**
```json
{
  "nome": "Eletrônicos"
}
```

**Produto:**
```json
{
  "nome": "Notebook Dell",
  "preco": 3500.00,
  "estoque": 10,
  "categoriaId": 1
}
```

**Cliente:**
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "24999998888"
}
```

## Autores
- [Gabriel Ferreira Matheus Antunes \ AMANDA MORAES SPINOZZI KOPP JANTSCH \ Ian Baptista Correa]
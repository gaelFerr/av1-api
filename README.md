# AV2 - API REST (Node.js + TypeScript)

API da loja usada pelo aplicativo React Native (repositório do app: https://github.com/gaelFerr/av2-app).

## Tecnologias
Node.js, TypeScript, Express, Prisma ORM, SQLite, Zod (validação), JWT (autenticação), bcryptjs (senha criptografada).

## Como rodar
```
git clone https://github.com/gaelFerr/av1-api.git
cd av1-api
npm install
npx prisma generate
npm run dev
```
O servidor inicia em http://localhost:3000. O banco SQLite (`prisma/dev.db`) e o arquivo `.env` (com `JWT_SECRET`) já estão no repositório, então não é preciso configurar nada.

## Autenticação (JWT)
1. Criar usuário: `POST /auth/cadastro` com `{ "nome": "...", "email": "...", "senha": "123456" }`
2. Login: `POST /auth/login` com `{ "email": "...", "senha": "..." }` → retorna `{ "token": "..." }`
3. Nas demais rotas, enviar o header `Authorization: Bearer <token>` (no Postman: aba Authorization → Bearer Token).

O token vale 1 dia. Sem token, a API responde 401.

## Rotas (todas protegidas, exceto /auth)
Cada recurso tem: `GET /recurso`, `GET /recurso/:id`, `POST /recurso`, `PUT /recurso/:id`, `DELETE /recurso/:id`.

| Recurso | Campos | Relação |
|---|---|---|
| /categorias | nome | - |
| /produtos | nome, preco, categoriaId | pertence a uma Categoria |
| /clientes | nome, email, telefone | - |
| /pedidos | quantidade, clienteId, produtoId | liga Cliente e Produto |

## Validação
Todos os corpos de requisição são validados com Zod. Dados inválidos retornam 400 com a lista de erros.

## Observação sobre exclusão
Para apagar uma categoria, apague antes os produtos dela; para apagar um produto, apague antes os pedidos dele (ordem: pedido → produto → categoria).

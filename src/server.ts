import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes';
import categoriaRoutes from './routes/categoria.routes';
import produtoRoutes from './routes/produto.routes';
import clienteRoutes from './routes/cliente.routes';
import pedidoRoutes from './routes/pedido.routes';
import { autenticar } from './middlewares/auth.middleware';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API está rodando!' });
});

// Rotas abertas (cadastro e login)
app.use('/auth', authRoutes);

// Rotas protegidas: só passam com token válido
app.use('/categorias', autenticar, categoriaRoutes);
app.use('/produtos', autenticar, produtoRoutes);
app.use('/clientes', autenticar, clienteRoutes);
app.use('/pedidos', autenticar, pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
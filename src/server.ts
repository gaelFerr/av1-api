import express from 'express';
import categoriaRoutes from './routes/categoria.routes';
import produtoRoutes from './routes/produto.routes';
import clienteRoutes from './routes/cliente.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API está rodando!' });
});

app.use('/categorias', categoriaRoutes);
app.use('/produtos', produtoRoutes);
app.use('/clientes', clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
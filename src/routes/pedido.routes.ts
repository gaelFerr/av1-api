import { Router } from 'express';
import prisma from '../prisma';
import { criarPedidoSchema, atualizarPedidoSchema } from '../schemas/pedido.schema';

const router = Router();

// GET /pedidos - listar todos (com cliente e produto)
router.get('/', async (req, res) => {
  const pedidos = await prisma.pedido.findMany({
    include: { cliente: true, produto: true },
  });
  res.json(pedidos);
});

// GET /pedidos/:id - buscar um pelo ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const pedido = await prisma.pedido.findUnique({
    where: { id },
    include: { cliente: true, produto: true },
  });

  if (!pedido) {
    return res.status(404).json({ erro: 'Pedido não encontrado' });
  }

  res.json(pedido);
});

// POST /pedidos - criar um novo
router.post('/', async (req, res) => {
  const resultado = criarPedidoSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  try {
    const novoPedido = await prisma.pedido.create({
      data: resultado.data,
    });
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(400).json({ erro: 'clienteId ou produtoId inválido — não existe no banco' });
  }
});

// PUT /pedidos/:id - atualizar um existente
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const resultado = atualizarPedidoSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  try {
    const pedidoAtualizado = await prisma.pedido.update({
      where: { id },
      data: resultado.data,
    });
    res.json(pedidoAtualizado);
  } catch (error) {
    res.status(404).json({ erro: 'Pedido não encontrado' });
  }
});

// DELETE /pedidos/:id - remover um
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.pedido.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ erro: 'Pedido não encontrado' });
  }
});

export default router;
import { Router } from 'express';
import prisma from '../prisma';
import { criarClienteSchema, atualizarClienteSchema } from '../schemas/cliente.schema';

const router = Router();

// GET /clientes - listar todos
router.get('/', async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

// GET /clientes/:id - buscar um pelo ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const cliente = await prisma.cliente.findUnique({
    where: { id },
  });

  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  res.json(cliente);
});

// POST /clientes - criar um novo
router.post('/', async (req, res) => {
  const resultado = criarClienteSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  try {
    const novoCliente = await prisma.cliente.create({
      data: resultado.data,
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ erro: 'Já existe um cliente cadastrado com esse e-mail' });
  }
});

// PUT /clientes/:id - atualizar um existente
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const resultado = atualizarClienteSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  try {
    const clienteAtualizado = await prisma.cliente.update({
      where: { id },
      data: resultado.data,
    });
    res.json(clienteAtualizado);
  } catch (error) {
    res.status(404).json({ erro: 'Cliente não encontrado' });
  }
});

// DELETE /clientes/:id - remover um
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.cliente.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ erro: 'Cliente não encontrado' });
  }
});

export default router;
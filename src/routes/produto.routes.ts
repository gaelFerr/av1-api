import { Router } from 'express';
import prisma from '../prisma';
import { criarProdutoSchema, atualizarProdutoSchema } from '../schemas/produto.schema';

const router = Router();

// GET /produtos - listar todos
router.get('/', async (req, res) => {
  const produtos = await prisma.produto.findMany({
    include: { categoria: true },
  });
  res.json(produtos);
});

// GET /produtos/:id - buscar um pelo ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const produto = await prisma.produto.findUnique({
    where: { id },
    include: { categoria: true },
  });

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.json(produto);
});

// POST /produtos - criar um novo
router.post('/', async (req, res) => {
  const resultado = criarProdutoSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  try {
    const novoProduto = await prisma.produto.create({
      data: resultado.data,
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ erro: 'categoriaId inválido — a categoria não existe' });
  }
});

// PUT /produtos/:id - atualizar um existente
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const resultado = atualizarProdutoSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  try {
    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: resultado.data,
    });
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(404).json({ erro: 'Produto não encontrado' });
  }
});

// DELETE /produtos/:id - remover um
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.produto.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ erro: 'Produto não encontrado' });
  }
});

export default router;
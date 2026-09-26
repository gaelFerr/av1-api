import { Router } from 'express';
import prisma from '../prisma';
import { criarCategoriaSchema, atualizarCategoriaSchema } from '../schemas/categoria.schema';

const router = Router();

// GET /categorias - listar todas
router.get('/', async (req, res) => {
  const categorias = await prisma.categoria.findMany();
  res.json(categorias);
});

// GET /categorias/:id - buscar uma pelo ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const categoria = await prisma.categoria.findUnique({
    where: { id },
  });

  if (!categoria) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }

  res.json(categoria);
});

// POST /categorias - criar uma nova
router.post('/', async (req, res) => {
  const resultado = criarCategoriaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  const novaCategoria = await prisma.categoria.create({
    data: resultado.data,
  });

  res.status(201).json(novaCategoria);
});

// PUT /categorias/:id - atualizar uma existente
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const resultado = atualizarCategoriaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  try {
    const categoriaAtualizada = await prisma.categoria.update({
      where: { id },
      data: resultado.data,
    });
    res.json(categoriaAtualizada);
  } catch (error) {
    res.status(404).json({ erro: 'Categoria não encontrada' });
  }
});

// DELETE /categorias/:id - remover uma
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.categoria.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ erro: 'Categoria não encontrada' });
  }
});

export default router;
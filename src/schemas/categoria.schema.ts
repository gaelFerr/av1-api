import { z } from 'zod';

// Schema usado para CRIAR uma categoria (POST)
export const criarCategoriaSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
});

// Schema usado para ATUALIZAR uma categoria (PUT)
export const atualizarCategoriaSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
});
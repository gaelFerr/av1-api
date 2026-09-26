import { z } from 'zod';

export const criarProdutoSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  preco: z.number().positive('O preço deve ser maior que zero'),
  estoque: z.number().int().nonnegative('O estoque não pode ser negativo'),
  categoriaId: z.number().int('O categoriaId deve ser um número inteiro'),
});

export const atualizarProdutoSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  preco: z.number().positive('O preço deve ser maior que zero'),
  estoque: z.number().int().nonnegative('O estoque não pode ser negativo'),
  categoriaId: z.number().int('O categoriaId deve ser um número inteiro'),
});
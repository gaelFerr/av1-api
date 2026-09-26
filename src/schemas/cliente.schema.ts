import { z } from 'zod';

export const criarClienteSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
});

export const atualizarClienteSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
});
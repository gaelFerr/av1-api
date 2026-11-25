import { z } from 'zod';

export const criarPedidoSchema = z.object({
  quantidade: z.number().int().positive('A quantidade deve ser maior que zero'),
  clienteId: z.number().int('O clienteId deve ser um número inteiro'),
  produtoId: z.number().int('O produtoId deve ser um número inteiro'),
});

export const atualizarPedidoSchema = z.object({
  quantidade: z.number().int().positive('A quantidade deve ser maior que zero'),
  clienteId: z.number().int('O clienteId deve ser um número inteiro'),
  produtoId: z.number().int('O produtoId deve ser um número inteiro'),
});
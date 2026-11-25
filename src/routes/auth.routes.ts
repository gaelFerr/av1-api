import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { cadastroSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

// POST /auth/cadastro - cria um usuário
router.post('/cadastro', async (req, res) => {
  const resultado = cadastroSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  const { nome, email, senha } = resultado.data;
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada },
    });
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (error) {
    res.status(400).json({ erro: 'Já existe um usuário com esse e-mail' });
  }
});

// POST /auth/login - confere a senha e devolve o token
router.post('/login', async (req, res) => {
  const resultado = loginSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }

  const { email, senha } = resultado.data;

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  res.json({ token });
});

export default router;
import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com o corpo das requisições em formato JSON
app.use(express.json());

// Rota básica de exemplo
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany(); // Buscar todos os usuários
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Inicia o servidor
app.listen(3000)
console.log('Server running on port 3000')

import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app: Express = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware para lidar com o corpo das requisições em formato JSON
app.use(express.json());

// Rota básica de exemplo (GET /)
app.get('/', (req: Request, res: Response) => {
    res.send('Olá do seu backend boilerplate com TypeScript e Prisma!');
});

// Outras rotas da sua API (adicione aqui)

// Middleware para tratamento de erros (adicione aqui)

// Inicia o servidor e conecta ao banco de dados
const server = app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log(`Servidor rodando na porta ${PORT}`);
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        server.close(); // Fecha o servidor em caso de erro na conexão
    }
});

// Desconectar do banco de dados ao encerrar o servidor
process.on('SIGINT', async () => {
    try {
        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Erro ao desconectar do banco de dados:', error);
        process.exit(1);
    }
});
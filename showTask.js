import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tasks = await prisma.Tasks.findMany(); // Obtener todas las tareas
console.table(tasks); // Mostrar en formato de tabla en la terminal


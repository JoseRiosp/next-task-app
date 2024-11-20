import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users= await prisma.users.findMany();
console.log('Users in database:')
console.table(users); 

const tasks = await prisma.Tasks.findMany(); // Obtener todas las tareas
console.log('Tasks in database:')
console.table(tasks); // Mostrar en formato de tabla en la terminal


'use server'
import { PrismaClient } from '@prisma/client'
import { auth } from '../../../../auth';

const prisma = new PrismaClient();

export async function POST(request){
    const session = await auth();
    const { task, index, option } = await request.json();
        if( !task || !index || !option){
            Response.json({message: 'Missing required fields'})
            return;
        }
    try{
    const postResponse={
            message: `Task "${task.name}" - ${option} sucessfully`
        }
    switch (option) {
        case 'complete':
            console.log(`POST: ${option} this task...`)
            await prisma.Tasks.update({ //Update back-end
                where: { 
                    user: session?.user.name },
                data:{
                    status:!task.completed
                }
                });
            return Response.json({postResponse});
            break;
        case 'remove':
            console.log(`POST: ${option} this task...`)
            await prisma.Tasks.delete({
                where:{
                    user: session?.user.name,
                    index: index+1
                }
                });
            return Response.json({postResponse}); //"TODO:"Return deleted task(?)
            break;
        case 'add':
            console.log(`POST: ${option} this task...`)
            const newTask= await prisma.Tasks.create({
                data: {
                    user: session?.user.name,
                    title: task.name,
                    description: task.description,
                    levels: task.level
                }});
            return Response.json({newTask});
            break;
    return Response.json({postResponse});
    }
}catch(error){
    return Response.json({message: 'Internal POST error in task-API', error})
}
    }

export async function GET(){
    const session = await auth();
    console.log('GET: requesting tasks...')
    try{
    const postgresTasks = await prisma.Tasks.findMany({
        where: {
        user: session?.user.name,
        }
    });;
    console.log(`GET: -${postgresTasks.length}- task(s) found in database`);
    return Response.json({postgresTasks})
}
    catch(error){
        return Response.json({message: 'Internal GET error in task-API', error})
    }
}

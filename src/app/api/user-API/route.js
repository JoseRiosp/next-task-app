import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req){
    const {searchParams} =new URL(req.url);
    const id= searchParams.get('id');
    console.log(id)

    if(id){
        try{
            const user = await prisma.users.findUnique({
                where: { id: parseInt(id) },
                select:{
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            if(user){
                return Response.json({user});} 
            else{
                return Response.json({message: 'GET: User not found'})
            }
        } catch(error){
            return Response.json({message: 'GET: Internal GET error in user-API'})
        }
    }

    else{

    console.log('GET: requesting users table...')
    //if(session?.user.role === 'ADMIN') Add this when I put mmyself as Admin
    try{
    const postgresUsers = await prisma.users.findMany({
        select:{
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        },
    });
    console.log(`GET: -${postgresUsers.length}- user(s) found in database`);
    return Response.json({postgresUsers})
}
    catch(error){
        return Response.json({message: 'Internal GET error in user-API', error})
    }
}}
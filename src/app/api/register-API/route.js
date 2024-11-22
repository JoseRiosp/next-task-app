import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request){
        const { name, email, password } =await request.json();
        if(!name || !password || !email ){
        return Response.json({error: 'Missing required fields from formik'});
    }
    console.log(name, email, password)
    try{    
    const hashPassword = await bcrypt.hash(password, 10); 
    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
        });
    
    return Response.json({user});
    } catch(error){
        console.error('Error creating new user', error)
        return Response.json({message: 'Internal error creating new user'})
    }
}

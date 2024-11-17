import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res){
    if(req.method==='POST'){
        const { name, email, password } = req.body;

    if(!name || !password || !email ){
        res.status(400).json({error: 'Missing required fields from formik'});
        return;
    }
    try{    
    const hashPassword = await bcrypt.hash(password, 10); 
    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
        });
    res.status(200).json({message: 'user created sucessfully', user})
    } catch(error){
        console.error('Error creating new user', error)
        res.status(500).json({message: 'Internal error creating new user'})
    }} else {
        res.status(405).json({message: 'Method not allowed'})
    }
}

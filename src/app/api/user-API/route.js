import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { auth } from "../../../../auth";

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
                    fullname: true,
                    phone: true,
                    email: true,
                    birth_day: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
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
            fullname: true,
            email: true,
            phone: true,
            birth_day: true,
            role: true,
            createdAt: true,
            updatedAt: true
        },
    });
    console.log(`GET: -${postgresUsers.length}- user(s) found in database`);
    return Response.json({postgresUsers})
}
    catch(error){
        return Response.json({message: 'Internal GET error in user-API', error})
    }
}}

export async function POST(request){
    const session = await auth()
    console.log('POST: updating user...')
    const{ values } = await request.json();
    if(!values){
        return Response.json({message: 'Invalid/missing values data'})
    }
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    let hashedPassword;
    if(values.password){
        hashedPassword= await bcrypt.hash(values.password, 10);
    }
    const purgData= {}
    const data= {
        name: values.name,
        password: hashedPassword,
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        birth_day: values.birth_day,
        role: values.role
    }
    Object.keys(values).forEach((key)=>{
        if(values[key] === data[key]){
            purgData[key] = data[key]
        }
    })
    console.log(id)
    console.log(purgData)

    try{
       const updateUser= await prisma.users.update(
            {
                where: {id: parseInt(id)},
                data: purgData
            }
        );
        return Response.json({message: `user ${updateUser.name} sucessfully updated`, updateUser})
    } catch (error){
        return Response.json({message: 'Internal error at updating user', error})
    }
}
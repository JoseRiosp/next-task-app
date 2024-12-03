import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { auth } from "../../../../auth";

const prisma = new PrismaClient();

export async function GET(req){
    const {searchParams} =new URL(req.url);
    const id= searchParams.get('id');
    if(id){
        console.log('GET: requesting user by id=', id)
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
            return Response.json({message: 'GET: Internal GET error in user-API', error})
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

export async function PUT(request){
    const{ values } = await request.json();
    const session = await auth();
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    if(!values){
        return Response.json({message: 'Invalid/missing action method'})
    }
    console.log('PUT: updating user...')
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
    console.log('user Id:',id)
    console.log('Payload:', purgData)
    const dataLength = Object.keys(purgData).length;

    try{
       const updateUser= await prisma.users.update(
            {
                where: {id: parseInt(id)},
                data: purgData
            }
        );
        return Response.json({message: `✔︎ user ${updateUser.name} sucessfully updated (${dataLength} field(s))`, updateUser})
    } catch (error){
        return Response.json({message: '✗ internal error at updating user, try again later', error})
    } }

export async function POST(request){
        const {password} = request.json()
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');
        console.log(id)
        const adminPassword = await prisma.users.findUnique({
            where: {
                id: parseInt(id)
            },
            select:{
                password: true
            }
        });
        const isMatch = await bcrypt.compare(password, adminPassword.password);
        console.log('isMatch?', isMatch)
        if(isMatch){
            console.log('POST: deleting user...');
        try {
            const deleteUser = await prisma.users.delete({
                where: { id: parseInt(id) } 
            });
            return Response.json({message: `user ${deleteUser.name} sucessfully deleted`, deleteUser})
        } catch (error){
            return Response.json({message: 'Internal error at deleting user', error})
        }} 
            else {
            return Response.json({message: 'Invalid Admin Password'})
        }
    }

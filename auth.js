import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
export const { auth, signIn, signOut } = NextAuth({
    //...authConfig,
    providers: [Credentials({ 
    name:"credentials",
    credentials:{
        username: {label: 'username', type: 'text'},
        password:{label: 'password', type: 'password'},},
    async authorize(credentials) {
        console.log(credentials)
        const user = await prisma.users.findUnique({ //users is the name of the table
            where: { name: credentials.username },
            select: { 
                token: true, 
                name: true, 
                password: true,
                email: true } //select data from vercel database
            });
        console.log(user);
    if (!user) return null;
    const isMatch = await bcrypt.compare(credentials.password, user.password); //compare encryptated password
    console.log(isMatch)
    return isMatch? user : null;
    },  
}),
], session:{jwt: true},
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.token = user.token;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.token = token.token;
                session.name = token.name;
                session.email = token.email;
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
});
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
export const { auth, signIn, signOut, handlers } = NextAuth({
    //...authConfig,
    providers: [Credentials({ 
    name:"credentials",
    credentials:{
        username: {label: 'username', type: 'text'},
        password:{label: 'password', type: 'password'},},
    async authorize(credentials) {
        const user = await prisma.users.findUnique({ //users is the name of the table
            where: { name: credentials.username },
            select: { 
                id: true, 
                name: true, 
                password: true,
                email: true,
                role: true } //select data from vercel database
            });
    if (!user) return null;
    const isMatch = await bcrypt.compare(credentials.password, user.password); //compare encryptated password
    console.log('Auth:', user.name);
    console.log('Auth:', isMatch)
    return isMatch? user : null;
    },  
}),
], 
pages:{
    signIn: '/',
    signOut: '/'
},
session:{jwt: true},
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
});
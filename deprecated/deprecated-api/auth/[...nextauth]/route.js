import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma= new PrismaClient();

/* export default NextAuth({
    providers: [
        CredentialsProvider( name, credentials{name, password}, authorize(){})],
    session:{ strategy },
    callbacks:{jwt, token },
    pages:{ signIn pages},
}); */

const handler= NextAuth({
    providers: [
        Credentials({ 
            name:"Credentials",
            credentials:{
                username: {label: 'username', type: 'text'},
                password:{label: 'password', type: 'password'},},
            async authorize(credentials) {
                const user = await prisma.users.findUnique({ //users is the name of the table
                    where: { name: credentials.username },
                    select: { 
                        token: true, 
                        name: true, 
                        password: true, 
                        email: true } //select data from vercel database
                    });
            if(user){
                const isMatch = await bcrypt.compare(credentials.password, user.password); //compare encryptated password
                if (isMatch){ //user.name is from the database, credentials.username is from the client
                    return user;
                    }}
                    return null;
            },  
        }), //end of providers
    ], 
    session:{ strategy:"jwt"}, //using jwt for token encryptation 
    callbacks: {
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
    }, pages: {
        signIn:'/log',
    },
});
export {handler as GET, handler as POST} 


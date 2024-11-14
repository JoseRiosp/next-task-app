import { sql } from "@vercel/postgres";
import bcrypt from 'bcryptjs';

 async function fetchUserTables(name, email, password){

  if (!name || !email || !password) {
    throw new Error("Missing required data");
  } else{console.log("Received:", { name, email, password });}

    const connectionString = process.env.POSTGRES_URL;
     if(!connectionString){
        res.status(500).json({error: 'Missing connection string'});
        return;
     }

    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; //Extension to create random id numbers 

    await sql`CREATE TABLE IF NOT EXISTS
        users(
        token UUID DEFAULT uuid_generate_v4(),
        name VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        role TEXT NOT NULL DEFAULT 'USER');
        `;
        //To find existing users:
        const existingUser = await sql`SELECT name FROM users WHERE email = ${email}`;
    if (existingUser.rowCount === 0){
    
        const hashPassword = await bcrypt.hash(password, 10); //Encrypt password
    await sql`
            INSERT INTO users(token, name, email, password, role)
            VALUES(uuid_generate_v4(), ${name}, ${email}, ${hashPassword}, 'USER' )
            ON CONFLICT (name) DO NOTHING;`;
            console.log('User created sucessfully'); //to backend
            return {message: 'User created sucessfully'}
        } else {
                console.log('Email already registered'); //to backend
                return {message: 'Email already registered'}
            }
        

}

export default async function SEEDusers({name, email, password}){
    if((!name || !email || !password)){
        return Response.json({error: 'Missing user data in SEEDusers function'})
    }
    try {
        await sql`BEGIN`;
        const result = await fetchUserTables(name, email, password);
        await sql`COMMIT`;
        return result;
    } catch(error){
        await sql`ROLLBACK`;
        console.error('Error in seed users', error)
        return Response.json({error}, {status: 500});
    }
}

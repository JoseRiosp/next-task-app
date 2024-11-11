import { sql } from "@vercel/postgres";

 async function fetchUserTables({name, email, password}){
   
    const connectionString = process.env.POSTGRES_URL;
     if(!connectionString){
        res.status(500).json({error: 'Missing connection string'});
        return;
     }

    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; //Extension to create random id numbers 
    
    await sql`CREATE TABLE IF NOT EXISTS
        users(
        token UUID DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'USER'
        `;
    
    const insertedUsers = await Promise.all (
        users.map(async () => {
            await sql`
            INSERT INTO users(token, name, email, password, role)
            VALUES(token, ${name}, ${email}, ${password}, role )
            ON CONFLICT (token) DO NOTHING`;})
        );

        return insertedUsers;
}

export async function SEEDusers({name, email, password}){
    try {
        await sql`BEGIN`;
        await fetchUserTables(name, email, password);
        await sql`COMMIT`;
        return Response.json({message: 'User seeded sucessfully'})
    } catch(error){
        await sql`ROLLBACK`;
        console.error('Error in seed users', error)
        return Response.json({error}, {status: 500});
    }
}

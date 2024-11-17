
//import { SEEDusers } from '../src/services/seedUsers';
import { db } from "@vercel/postgres";

/*const connectionString = process.env.POSTGRES_URL;
if(!connectionString){
   res.status(500).json({error: 'Missing connection string'});
   return;
}*/

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = await db.connect();
    try {
        const { name, email, password } = req.body;
        await client.sql`BEGIN`;
        
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; //Extension to create random id numbers 
            
        await client.sql`CREATE TABLE IF NOT EXISTS
                users(
                token UUID DEFAULT uuid_generate_v4(),
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'USER',
                PRIMARY KEY (token)
                );,
                `;
        await client.sql`
                    INSERT INTO users(token, name, email, password, role)
                    VALUES(uuid_generate_v4(), ${name}, ${email}, ${password}, 'USER' )
                    ON CONFLICT (email) DO NOTHING;`
                ;
        await client.sql`COMMIT`;
    
        res.status(200).json({message: 'User created succesfully'});
    } catch (error) {
        await client.sql`ROLLBACK`;
        console.error('Error in seed users', error)
        res.status(500).json({error: 'Error creating user'})
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  const token = await client.sql`SELECT token FROM users;`;
  return res.status(200).json({token});
}

import { sql } from "@vercel/postgres"

export async function fetchUser(){

    
   try{
    const metaData= await sql`SELECT * FROM users`;
    return metaData.rows;
   } catch(error){
    console.error('Database "users" error', error);
   }
}

export async function fetchTask(){
    try{
        const taskData= await sql`SELECT * FROM tasks`;
        return taskData.rows;
    } catch(error){console.error('Database "tasks" error', error);

    }
}

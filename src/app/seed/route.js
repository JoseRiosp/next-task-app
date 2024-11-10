import { db } from "@vercel/postgres";
    
    const user =await db.connect(); //connect to Vercel Database


    export async function seedUsers(){
        await user.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp`; //Extension to create random id numbers 
        
        await user.sql`CREATE TABLE IF NOT EXISTS
        users(
        token UUID DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        password TEXT NOT NULL
        )`;

        //"TODO:" Crear el insert para los users:

        //const userPromise= Promise(
        //await user.sql`BEGIN`;
        //users.map(async (user) => {
        //INSERT INTO users(token, name, password)
        //VALUES()
        //ON CONFLICT (token) DO NOTHING;
        //await user.sql`COMMIT`});)
        //.then(console.log('commit to database sucessfully))
        //.catch()
    }

    export async function seedTasks(){


    await user.sql`CREATE TABLE IF NOT EXISTS 
    tasks (
        task_name VARCHAR(100) NOT NULL,
        task_description VARCHAR(255) NOT NULL,
        priority VARCHAR NOT NULL,
        is_completed BOOLEAN NOT NULL DEFAULT FALSE
    )`;

    //"TODO: Crear el insert para las tasks:
        //INSERT INTO tasks(task_name, task_description, priority, is_completed)
        //VALUES()
        //ON CONFLICT (priority) DO NOTHING;

    }





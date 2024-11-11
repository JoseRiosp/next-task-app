
import { sql } from "@vercel/postgres";

    export async function seedUsers({name, email, password}){
        
        //Insert new users
    const userPromise= new Promise(async(resolve, reject) =>{

        try {
            await sql`BEGIN`;
            
            await Promise.all (
                users.map(async () => {
                    await sql`
                    INSERT INTO users(token, name, email, password, role)
                    VALUES(token, ${name}, ${email}, ${password}, role )
                    ON CONFLICT (token) DO NOTHING`;})
                );
            await sql`COMMIT`;
            resolve('Commit new user successfully!');}
        catch(error){
            await sql`ROLLBACK`;
            reject(error);
        }});

        userPromise.then((message)=>{console.log(message)})
        .catch((error)=>{console.error('Rollback error (SeedUsers):', error)});
    }
/*
    export async function seedTasks(){


    await user.sql`CREATE TABLE IF NOT EXISTS 
    tasks (
        task_name VARCHAR(100) NOT NULL,
        task_description VARCHAR(255) NOT NULL,
        priority VARCHAR NOT NULL DEFAULT NORMAL,
        is_completed BOOLEAN NOT NULL DEFAULT FALSE
    )`;

    //"TODO: Crear el insert para las tasks:
        //INSERT INTO tasks(task_name, task_description, priority, is_completed)
        //VALUES()
        //ON CONFLICT (priority) DO NOTHING;

    }
*/




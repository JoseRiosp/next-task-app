import { sql } from "@vercel/postgres";

 async function fetchTasksTables(task_name, description, is_completed, task_level){

  if (!task_name || !description) {
    throw new Error("Missing required data");
  } else{console.log("Received:", { task_name, description });}

    const connectionString = process.env.POSTGRES_URL;
     if(!connectionString){
        res.status(500).json({error: 'Missing connection string'});
        return;
     }

    await sql`CREATE TABLE IF NOT EXISTS
        tasks(
        task_name VARCHAR(100) NOT NULL,
        description VARCHAR(300) NOT NULL,
        is_completed BOOLEAN NOT NULL DEFAULT FALSE
        task_level VARCHAR NOT NULL 'NORMAL');
        `;

    await sql`
            INSERT INTO tasks(task_name, description, is_completed, task_level)
            VALUES(${task_name}, ${description}, ${is_completed}, ${task_level})
            ;`;
            console.log('Task created sucessfully'); //to backend
            return {message: 'Task created sucessfully'}
        
        

}

export default async function SEEDtasks({task_name, description, is_completed, task_level}){
    if((!task_name || !description)){
        return Response.json({error: 'Missing user data in SEEDtasks function'})
    }
    try {
        await sql`BEGIN`;
        const result = await fetchUserTables(task_name, description, is_completed, task_level);
        await sql`COMMIT`;
        return result;
    } catch(error){
        await sql`ROLLBACK`;
        console.error('Error in seed tasks', error)
        return Response.json({error}, {status: 500});
    }
}

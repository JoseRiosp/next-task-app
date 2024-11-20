'use client'
import TaskComponent from '../pures/TaskComponent'
import { useState } from 'react'
import { useEffect } from 'react'
import TaskForm from '../../ui/forms/TaskForm'
import { Skeleton } from '@mui/material'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const TaskListComponent=()=> {
    //get User session data 
    const {data: session} = useSession();
     // Get task data from user in the Vercel Database
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState({postgresTasks:[]});
    const taskArray = tasks.postgresTasks;

      useEffect(() => {
        async function fetchTasks(){
            try{
              const response= await axios.get('/api/task-API/');
              setTasks(response.data);
              console.log('API task object',tasks)
            }catch(error){
              console.error('Error requesting tasks',error)
            } finally {
              setLoading(false)
            }
          }    
        if(session){
              fetchTasks(); 
            }
      }, [session])

    async function fetchTaskApi(task, option){
        const tempTask = [...taskArray]
        const index = tempTask.indexOf(task);
        console.log(`${option} this task: ${task}`);
        try{
        const response =await axios.post('/api/task-API/',{
          username: session?.user.name,
          task: task,
          index: index,
          option: option
        });
        setTasks([...tempTask, response.data]);
        console.log(tasks)
      }
        catch(error){
          console.error('Error managing task', error)
        }
      }

      
      function showAddTask(){
        const greenBtn = document.getElementById("add-task-form");
        greenBtn.toggleAttribute("hidden");
      }
        //Task Table
    const taskTable= ()=>{
      console.log('task array:',taskArray);
      if(taskArray.length > 0){
        return (<table className='rounded-lg flex flex-col items-center justify-start'>
        <thead className='container'>
        <tr className='flex flex-grow mt-2 mb-2 pt-2 items-center text-gray-500'>
            <th className='flex-grow' scope='col'>Title</th>
            <th className='flex-grow' scope='col'>Description</th>
            <th className='flex-grow' scope='col'>Priority</th>
            <th className='flex-grow' scope='col'>Actions</th>
        </tr>
        </thead>
        <tbody className='m-2 container flex flex-col gap-3'>
            {taskArray.map((currentTask, index)=>{
                return (
                    <TaskComponent 
                        key={index} 
                        task={currentTask}
                        manageTask={fetchTaskApi}>
                    </TaskComponent>
                )
            })}
        </tbody>
    </table>)}
          else { 
            return (<div className='flex flex-col items-center justify-center text-gray-500'>
              <h3>You have no tasks to show</h3>
              <h6>Click <i className='bi bi-file-plus' style={{color: 'green'}}></i> to create a new one: </h6>
            </div>
)}
      }
      const loadingStyle={
        //Lets put some animaition (spinner) for the loading page
        color: 'grey',
        fontSize: '20px',
        fontWeight: 'bold'
      }
    return (
    <div>
      <div className="col-12">
      <TaskForm manageTask={fetchTaskApi} nTasks={taskArray.length}/>
        <div className='card'>
            <div className='card-header p-3' style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"8rem"}}>
            <i className='bi bi-archive-fill'></i>
            <h5>Your tasks</h5>
            <button className='btn btn-success bi-file-plus' onClick={showAddTask} style={{borderRadius:"3rem"}}></button>
            </div>
        <div className='card-body' data-mdb-perfect-scrollbar="true" style={ {position: "relative", height: "400px"}}>
          {loading ? ( <div className='flex flex-col items-center gap-2 justify-center'> 
          <p style={loadingStyle}>Loading tasks...</p>
          <Skeleton animation="wave" width={300}/>
          <Skeleton animation="wave" width={200} />
          <Skeleton animation="wave" width={300} />
          </div>) 
          : taskTable()}
        </div>
        </div>
      </div>
    </div>
  )
}

export default TaskListComponent
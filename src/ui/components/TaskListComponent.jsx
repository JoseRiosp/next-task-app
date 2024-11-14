'use client'
import TaskComponent from '../pures/TaskComponent'
import { useState } from 'react'
import { useEffect } from 'react'
import TaskForm from '../../ui/forms/TaskForm'

const TaskListComponent = () => {
    //const taskListData=[null]; //"TODO:" Get task data from Vercel Database
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log("Task state is been modified");
        let time;
        if(tasks.length<5){
          time=1000;
        } else {
          time=2000;
        }
      
      setTimeout(() => {
        setLoading(false)
      }, time);
      return () => {
        console.log("TaskListComponent is going to unmount...")
      }
    }, [tasks])


    function managingTask(task, option){
    
        console.log(`${option} this task: ${task}`);
        const index= tasks.indexOf(task);
        const tempTask=[...tasks];
    
    switch (option) {
        case "complete" :
          tempTask[index].completed=!tempTask[index].completed;
          setTasks(tempTask);
          break;
        case "remove": 
          alert(`Task "${tempTask[index].name}" deleted!`)
          tempTask.splice(index,1);
          setTasks(tempTask);
          break;
        case "add":
          tempTask.push(task);
          setTasks(tempTask);
          break;
      }
      
      //"TODO: Await send tasks to task table in Vercel database
    }

      
      function showAddTask(){
        const greenBtn = document.getElementById("add-task-form");
        greenBtn.toggleAttribute("hidden");
      }
        //Task Table
      const taskTable= ()=>{
        const table = <table className='rounded-lg flex flex-col items-center justify-start'>
        <thead className='container'>
        <tr className='flex flex-grow mt-2 mb-2 pt-2 items-center text-gray-500'>
            <th className='flex-grow' scope='col'>Title</th>
            <th className='flex-grow' scope='col'>Description</th>
            <th className='flex-grow' scope='col'>Priority</th>
            <th className='flex-grow' scope='col'>Actions</th>
        </tr>
        </thead>
        <tbody className='m-2 container flex flex-col gap-3'>
            {tasks.map((currentTask, index)=>{
                return (
                    <TaskComponent 
                        key={index} 
                        task={currentTask}
                        manageTask={managingTask}>
                    </TaskComponent>
                        
                )
            })}
        </tbody>
    </table>

    if(tasks.length > 0){
      return table;
          } else {
            return <div className='flex flex-col items-center justify-center'>
              <h3 className='text-red-700' >You have no tasks to show</h3>
              <h6>Click <i className='bi bi-file-plus' style={{color: 'green'}}></i> to create a new one: </h6>
            </div>
}
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
      <TaskForm manageTask={managingTask} nTasks={tasks.length}/>
        <div className='card'>
            <div className='card-header p-3' style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"8rem"}}>
            <i className='bi bi-archive-fill'></i>
            <h5>Your tasks</h5>
            <button className='btn btn-success bi-file-plus' onClick={showAddTask} style={{borderRadius:"3rem"}}></button>
            </div>
        <div className='card-body' data-mdb-perfect-scrollbar="true" style={ {position: "relative", height: "400px"}}>
          {loading ? (<p className='flex items-center justify-center' style={loadingStyle}>Loading tasks...</p>) 
          : taskTable()}
        </div>
        </div>
      </div>
    </div>
  )
}

export default TaskListComponent
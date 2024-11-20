'use client'
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { levels } from "../../scripts/levels.enum";
import '../../styles/custom-bootstrap.scss'

//Importamos la hoja de estilos
//import '../../styles/task.scss'

const TaskComponent = ({ task, manageTask }) => {
  useEffect(() => {
    console.log("Created Task");
    return () => {
      console.log(`Task: ${task.name} is going to unmount`);
    };
  }, [task]);

  function taskLevelBadge() {
    switch (task.levels) {
      case levels.NORMAL:
        return ( //"FIXME:" fix bootstrap badges"
          <h6 className="mb-0">
            <span className="badge text-bg-primary">{task.levels}</span>
          </h6>
        );
      case levels.URGENTE:
        return (
          <h6 className="mb-0">
            <span className="badge text-bg-danger">{task.levels}</span>
          </h6>
        );
      case levels.BLOCKING:
        return (
          <h6 className="mb-0">
            <span className="badge text-bg-warning">{task.levels}</span>
          </h6>
        );
      default:
        break;
    }
  }

  function taskIconCompleted() {
    if (task.is_completed) {
      return (
        <i onClick={()=>manageTask(task, "complete")}
          className="bi-toggle-on icon-badge"
          style={{ color: "green", fontWeight: "bold" }}
        ></i>
      );
    } else {
      return (
        <i onClick={()=>manageTask(task, "complete")}
          className="bi-toggle-off icon-badge"
          style={{ color: "grey", fontWeight: "bold" }}
        ></i>
      );
    }
  }

  const taskCompleted =['text-gray-500 line-through opacity-50']

  const taskPending =['text-sky-500']

  return (
    <tr className={`border border-2 m-0 bg-white shadow-lg rounded-lg pt-2 pb-2 flex flex-grow ${task.completed ? taskCompleted : taskPending}`}>
      <th className="flex-grow justify-center items-center flex hover:cursor-default" >
        <span style={{fontSize: "12pt", lineHeight:"1.2"}}>{task.title}</span>
      </th>
      <td className="flex w-3 leading-2 flex-grow hover:cursor-default">
        <span style={{fontSize: "10pt"}}>{task.description}</span>
      </td>
      <td className="align-middle flex-grow text-center" style={{padding: "12px"}}>{taskLevelBadge()}</td>
      <td className="align-middle flex flex-grow items-center justify-center text-center hover:cursor-pointer gap-3 ">
        <span>{taskIconCompleted()}</span>
        <i className="bi-trash flex-grow hover:cursor-pointer icon-badge" style={{ color: "tomato" }} 
        onClick={()=>{manageTask(task, "remove")}}></i>
      </td>
    </tr>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.object.isRequired, // If i change the provider of the data, this (object) also needs to be changed
  manageTask: PropTypes.func.isRequired
};

export default TaskComponent;
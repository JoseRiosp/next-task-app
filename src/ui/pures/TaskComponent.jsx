import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { levels } from "../../scripts/levels.enum";

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
    switch (task.level) {
      case levels.NORMAL:
        return (
          <h6 className="mb-0">
            <span className="badge bg-primary">{task.level}</span>
          </h6>
        );
      case levels.URGENTE:
        return (
          <h6 className="mb-0">
            <span className="badge bg-warning">{task.level}</span>
          </h6>
        );
      case levels.BLOCKING:
        return (
          <h6 className="mb-0">
            <span className="badge bg-danger">{task.level}</span>
          </h6>
        );
      default:
        break;
    }
  }

  function taskIconCompleted() {
    if (task.completed) {
      return (
        <i onClick={()=>manageTask(task, "complete")}
          className="bi-toggle-on task-action"
          style={{ color: "green", fontWeight: "bold" }}
        ></i>
      );
    } else {
      return (
        <i onClick={()=>manageTask(task, "complete")}
          className="bi-toggle-off task-action"
          style={{ color: "grey", fontWeight: "bold" }}
        ></i>
      );
    }
  }

  const taskCompleted ={
    color: "grey",
    textDecoration: "line-through",
    fontWeight: "bold"
  }

  const taskPending ={
    color: "tomato",
    fontWeight: "bold"
  }

  return (
    <tr className="fw-normal" style={task.completed ? taskCompleted : taskPending}>
      <th>
        <span style={{fontSize: "12pt", lineHeight:"1.2"}}>{task.name}</span>
      </th>
      <td className="align-middle" style={{textAlign: "left", padding: "5px", margin:"0px", lineHeight:"1.2" }}>
        <span style={{fontSize: "11pt"}}>{task.description}</span>
      </td>
      <td className="align-middle" style={{padding: "12px"}}>{taskLevelBadge()}</td>
      <td className="align-middle">{taskIconCompleted()}
        <i className="bi-trash task-action" style={{ color: "tomato" }} onClick={()=>{manageTask(task, "remove")}}></i>
        </td>
    </tr>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.object.isRequired, // If i change the provider of the data, this (object) also needs to be changed
  manageTask: PropTypes.func.isRequired
};

export default TaskComponent;
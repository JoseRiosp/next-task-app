import React, { useRef } from "react";
import PropTypes from "prop-types";
import { levels } from "../../scripts/levels.enum";
import { Task } from "../../scripts/task.class";
import { Snackbar, Button } from "@mui/material";

const TaskForm = ({ manageTask, nTasks }) => {
  const refName = useRef("");
  const refDescription = useRef("");
  const refLevel = useRef(levels.NORMAL);

  function addTask(e) {
    e.preventDefault();
    const newTask = new Task(
      refName.current.value,
      refDescription.current.value,
      false,
      refLevel.current.value
    );
    manageTask(newTask, "add");
  }

  return (
    <div id='add-task-form' hidden>
      <form id="task-form" onSubmit={addTask}>
        <div id="inputs-div">
          <input
            ref={refName}
            id="input-name"
            type="text"
            className="form-control"
            required
            autoFocus
            placeholder="Name of your task"
          ></input>
          <input
        ref={refDescription}
        id="input-description"
        type="text"
        className="form-control form-control-lg"
        required
        placeholder="Description"
      ></input>
          <label htmlFor="select-level" className="sr-only">
            Priority
          </label>
          <select ref={refLevel} defaultValue={levels.NORMAL} id="select-level">
            <option value={levels.NORMAL}>Normal</option>
            <option value={levels.URGENTE}>Urgent</option>
            <option value={levels.BLOCKING}>Blocking</option>
          </select>
        </div>
        <Button type="submit" className="btn btn-outline-success">
          {nTasks > 0 ? "Add New Task" : "Create Your First Task"}
        </Button>
        <Snackbar autoHideDuration={2000} message='New task created!' anchorOrigin={{vertical: 'bottom', horizontal:'center'}}/>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  manageTask: PropTypes.func.isRequired,
  nTasks: PropTypes.number.isRequired,
};

export default TaskForm;
import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Dialog from "./Dialog";

interface SubTaskSqProps {
  subtask: Todo;
}
const SubTaskSq: React.FC<SubTaskSqProps> = (props) => {
  const { subtask } = props;
  const { addSubtask, toggleTodo, removeSubtask } = useTodoContext();
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const showInputHandler = () => {
    setShowInput((prev) => !prev);
    setNewTaskName("");
  };
  const addSubTaskHandler = (id: number) => {
    console.log("sq", id, newTaskName);
    addSubtask(id, newTaskName);
    setShowInput((prev) => !prev);
    setNewTaskName("");
  };
  //   lowest level
  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };
  const removeSubTaskHandler = (parentId: number, id: number) => {
    console.log("comp", parentId, id);
    removeSubtask(parentId, id);
  };

  return (
    <div>
      <div className="sb_ts_sq">
        {showInput && (
          <InputText
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter Task Name"
          />
        )}
        <Button onClick={() => showInputHandler()}>
          {showInput ? "Cancel" : "+ task"}
        </Button>
        {showInput && (
          <Button label="add" onClick={() => addSubTaskHandler(subtask.id)} />
        )}
      </div>
      {subtask.subtasks.length > 0 && (
        <span>
          {subtask.subtasks.map((task) => (
            <div key={task.id} className="lowest">
              <div
                key={task.id}
                className={task.completed ? "text-completed" : "text"}
              >
                {task.text}
              </div>
              <Button onClick={() => addToggleHandler(task.id)}>
                {task.completed ? "untoggle" : "toggle"}
              </Button>
              <Button onClick={() => removeSubTaskHandler(subtask.id, task.id)}>
                remove
              </Button>
            </div>
          ))}
        </span>
      )}
    </div>
  );
};
export default SubTaskSq;

import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Dialog from "./Dialog";
import { Message } from "primereact/message";

interface SubTaskSqProps {
  subtask: Todo;
}
const SubTaskSq: React.FC<SubTaskSqProps> = (props) => {
  const { subtask } = props;
  const { addSubtask, toggleTodo, removeSubtask } = useTodoContext();
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [emptiness, setEmptiness] = useState(false);

  const showInputHandler = () => {
    setShowInput((prev) => !prev);
    setNewTaskName("");
  };
  const addSubTaskHandler = (id: number) => {
    console.log("sq", id, newTaskName);
    if (newTaskName.length < 1) {
      setEmptiness(true);
    } else {
      addSubtask(id, newTaskName);
      setShowInput((prev) => !prev);
      setNewTaskName("");
      setEmptiness(false);
    }
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
        {showInput && (
          <Button
            icon="pi pi-plus-circle"
            onClick={() => addSubTaskHandler(subtask.id)}
          />
        )}
        <Button
          onClick={() => showInputHandler()}
          icon={showInput ? "pi pi-times" : "pi pi-plus-circle"}
        />
        {emptiness && <Message severity="error" text={"can not be empty"} />}
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
              <Button
                onClick={() => addToggleHandler(task.id)}
                icon={task.completed ? "pi pi-times" : "pi pi-check"}
              />
              <Button
                onClick={() => removeSubTaskHandler(subtask.id, task.id)}
                icon="pi pi-trash"
              />
            </div>
          ))}
        </span>
      )}
    </div>
  );
};
export default SubTaskSq;

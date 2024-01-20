import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface SubTaskProps {
  todo: Todo;
}

const SubTask: React.FC<SubTaskProps> = (props) => {
  const { todo } = props;
  const [newTaskNames, setNewTaskNames] = useState(
    Array(todo.subtasks.length).fill("")
  );
  const [showInputs, setShowInputs] = useState(
    Array(todo.subtasks.length).fill(false)
  );
  const { removeSubtask, toggleTodo, addSubtask } = useTodoContext();
  console.log(todo.subtasks);

  const removeSubTaskHandler = (parentId: number, id: number) => {
    removeSubtask(parentId, id);
  };

  const addToggleHandler = (id: number) => {
    console.log("subtask", id);
    toggleTodo(id);
  };

  const addSubTaskHandler = (id: number, index: number) => {
    // addSubtask(id, newTaskName);
    //   setShowInputs((prev) => !prev);
    //   setNewTaskNames("");
    console.log(id, newTaskNames[index]);
    // let value = newTaskNames[index]
    const updatedTaskNames = [...newTaskNames];
    updatedTaskNames[index] = "";
    setNewTaskNames(updatedTaskNames);
  };

  const handleInputChange = (index: any, value: any) => {
    const updatedTaskNames = [...newTaskNames];
    updatedTaskNames[index] = value;
    setNewTaskNames(updatedTaskNames);
  };

  const handleToggleInput = (index: number) => {
    const updatedShowInputs = [...showInputs];
    updatedShowInputs[index] = !updatedShowInputs[index];
    setShowInputs(updatedShowInputs);
  };

  return (
    <ul>
      {todo.subtasks.map((subtask, index) => (
        <li key={subtask.id}>
          <div className="title_and_tags">
            <div className={subtask.completed ? "text-completed" : "text"}>
              {subtask.text}
            </div>
            <span>depth: {subtask.depth}</span>
            <Button onClick={() => addToggleHandler(subtask.id)}>
              {subtask.completed ? "untoggle" : "toggle"}
            </Button>
            <Button onClick={() => removeSubTaskHandler(todo.id, subtask.id)}>
              - sub
            </Button>
          </div>
          <div className="input_task">
            {subtask.subtasks.length < 1 && (
              <div>
                {showInputs[index] && (
                  <InputText
                    type="text"
                    value={newTaskNames[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder="Enter Task Name"
                  />
                )}
                <Button onClick={() => handleToggleInput(index)}>
                  {showInputs[index] ? "Cancel" : "+ Task"}
                </Button>
                {showInputs[index] && (
                  <Button onClick={() => addSubTaskHandler(subtask.id, index)}>
                    add
                  </Button>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
export default SubTask;

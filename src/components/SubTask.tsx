import React from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { Button } from "primereact/button";

interface SubTaskProps {
  todo: Todo;
}

const SubTask: React.FC<SubTaskProps> = (props) => {
  const { todo } = props;
  const { removeSubtask, toggleTodo } = useTodoContext();
  console.log(todo.subtasks);

  const removeSubTaskHandler = (parentId: number, id: number) => {
    removeSubtask(parentId, id);
  };

  const addToggleHandler = (id: number) => {
    console.log("subtask", id);
    toggleTodo(id);
  };

  return (
    <ul>
      {todo.subtasks.map((subtask) => (
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
        </li>
      ))}
    </ul>
  );
};
export default SubTask;

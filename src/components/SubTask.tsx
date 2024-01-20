import React from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { Button } from "primereact/button";

interface SubTaskProps {
  todo: Todo;
}

const SubTask: React.FC<SubTaskProps> = (props) => {
  const { todo } = props;
  const { removeSubtask } = useTodoContext();

  const removeSubTaskHandler = (parentId: number, id: number) => {
    removeSubtask(parentId, id);
  };

  return (
    <ul>
      {todo.subtasks.map((subtask) => (
        <li key={subtask.id}>
          <div>
            <span>{subtask.text}</span>
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

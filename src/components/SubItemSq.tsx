import React from "react";
import { Todo } from "../context/TodoContext";

interface SubTaskSqProps {
  subtask: Todo;
}
const SubItemSq: React.FC<SubTaskSqProps> = (props) => {
  const { subtask } = props;

  return (
    <div>
      <span>
        {subtask.subtasks.map((task) => (
          <div key={task.id}>{task.text}</div>
        ))}
      </span>
    </div>
  );
};
export default SubItemSq;

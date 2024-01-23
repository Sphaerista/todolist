import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { Button } from "primereact/button";
import SubTaskSq from "./SubTaskSq";
import SubTaskInput from "./SubTaskInput";

interface SubTaskProps {
  todo: Todo;
}

const SubTask: React.FC<SubTaskProps> = (props) => {
  const { todo } = props;
  const { removeSubtask, toggleTodo, deleteTag } = useTodoContext();
  const [inputEditTask, setInputEditTask] = useState(false);
  const [inputEditTaskId, setInputEditTaskId] = useState<number>(0);

  const removeSubTaskHandler = (parentId: number, id: number) => {
    removeSubtask(parentId, id);
  };

  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };

  const removeTagHandler = (id: number, tag: string) => {
    console.log("task", id, tag);
    // deleteTag(id, tag);
  };

  const onEditTask = (task: number) => {
    setInputEditTaskId(task);
    setInputEditTask((prev) => !prev);
  };

  return (
    <ul>
      {todo.subtasks.map((subtask) => (
        <>
          <li className="main_li" key={subtask.id}>
            <div className="title_and_tags">
              <div className="toggle-and-text">
                <Button
                  onClick={() => addToggleHandler(subtask.id)}
                  icon={subtask.completed ? "pi pi-times" : "pi pi-check"}
                />
                <div className={subtask.completed ? "text-completed" : "text"}>
                  {subtask.text}
                </div>
              </div>
            </div>
            <div className="input_task">
              <SubTaskInput
                key={subtask.id + 2}
                subtask={subtask}
                todo={todo}
                onRemoveSubtask={removeSubTaskHandler}
                onEditTask={onEditTask}
              />
            </div>
          </li>
          <SubTaskSq
            key={subtask.id + 3}
            subtask={subtask}
            todo={todo}
            onRemoveSubtask={removeSubTaskHandler}
          />
        </>
      ))}
    </ul>
  );
};
export default SubTask;

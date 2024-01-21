import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { Button } from "primereact/button";
import SubTaskSq from "./SubTaskSq";
import { Badge } from "primereact/badge";
import SubTaskInput from "./SubTaskInput";

interface SubTaskProps {
  todo: Todo;
}

const SubTask: React.FC<SubTaskProps> = (props) => {
  const { todo } = props;
  const { removeSubtask, toggleTodo, deleteTag } = useTodoContext();

  const removeSubTaskHandler = (parentId: number, id: number) => {
    removeSubtask(parentId, id);
  };

  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };

  //   tags
  const removeTagHandler = (id: number, tag: string) => {
    console.log("task", id, tag);
    // deleteTag(id, tag);
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
            {subtask.tags &&
              subtask.tags.map((tag) => (
                <div>
                  <Badge size="large" severity="warning" value={tag} />
                  <Button
                    size="small"
                    label="x"
                    severity="danger"
                    onClick={() => removeTagHandler}
                  />
                </div>
              ))}
            <div className="input_task">
              <SubTaskInput
                subtask={subtask}
                todo={todo}
                onRemoveSubtask={removeSubTaskHandler}
              />
            </div>
          </li>
          <SubTaskSq
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

import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import SubTaskSq from "./SubTaskSq";
import { Badge } from "primereact/badge";
import Dialog from "./Dialog";
import SubItemSq from "./SubItemSq";

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
        <li className="main_li" key={subtask.id}>
          <div className="title_and_tags">
            <div className={subtask.completed ? "text-completed" : "text"}>
              {subtask.text}
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
            <SubTaskSq subtask={subtask} />
          </div>
          <div className="subtsksq_fl">
            <span>depth: {subtask.depth}</span>
            <Button
              onClick={() => addToggleHandler(subtask.id)}
              icon={subtask.completed ? "pi pi-times" : "pi pi-check"}
            />
            <Button
              onClick={() => removeSubTaskHandler(todo.id, subtask.id)}
              icon="pi pi-trash"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default SubTask;

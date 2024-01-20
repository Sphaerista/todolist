import React, { useState } from "react";
import "./TodoItem.css";
import { Todo, useTodoContext } from "../context/TodoContext";
import SubTask from "./SubTask";
import { Button } from "primereact/button";
import { Dialog as Dial } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import Dialog from "./Dialog";
import { Tag } from "primereact/tag";
import { Badge } from "primereact/badge";

export interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo } = props;
  const { addTag, toggleTodo, deleteTag, addSubtask, removeTodo } =
    useTodoContext();

  const [visibleTag, setVisibleTag] = useState<boolean>(false);
  const [visibleSubtask, setVisibleSubtask] = useState<boolean>(false);
  const [newTagName, setNewTagName] = useState<string>("");
  const [newSubTaskName, setNewSubTaskName] = useState<string>("");
  const [sameName, setSameName] = useState<string>("");
  const [sameSubTaskName, setSameSubTaskName] = useState<string>("");

  // handlers
  const removeTodoHandler = (id: number) => {
    removeTodo(id);
  };

  const addTagHandler = (id: number, tag: string) => {
    // Check if the new tag name already exists in the list of existing tags
    if (tag.length > 0) {
      const isTagExists = todo.tags?.some(
        (tag) => tag.toLowerCase() === newTagName.toLowerCase()
      );

      if (!isTagExists) {
        addTag(id, tag);
        setVisibleTag(false);
        setNewTagName("");
        setSameName("");
      } else {
        setSameName("This tag is alreday exists");
      }
    } else {
      setSameName("Tag should have at least one character");
    }
  };
  const removeTagHandler = (id: number, tag: string) => {
    deleteTag(id, tag);
  };

  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };

  const addSubtaskHandler = (id: number, subtaskText: string) => {
    if (newSubTaskName.length > 0) {
      addSubtask(id, subtaskText);
      setVisibleSubtask(false);
      setSameSubTaskName("");
    } else {
      setSameSubTaskName("Subtask can not be empty");
    }
  };

  return (
    <li className="todo-item">
      <div>
        <div className="title_and_tags">
          <div className={todo.completed ? "text-completed" : "text"}>
            {todo.text}
          </div>
          {todo.tags &&
            todo.tags.map((tag) => (
              <div key={tag}>
                <Badge size="large" severity="warning" value={tag} />
                <Button
                  size="small"
                  label="x"
                  severity="danger"
                  onClick={() => removeTagHandler(todo.id, tag)}
                />
              </div>
            ))}
          <Dialog
            addHandler={addTagHandler}
            newName={newTagName}
            removeHandler={removeTagHandler}
            sameName={sameName}
            setNewName={setNewTagName}
            setVisible={setVisibleTag}
            todo={todo}
            visible={visibleTag}
            label_button={"+ tag"}
            header={"Add tag"}
            placeholder={"Enter Tag..."}
          />
        </div>
        <p>depth:{todo.depth}</p>
        {todo.subtasks.length > 0 && <SubTask todo={todo} />}

        <Button onClick={() => addToggleHandler(todo.id)}>
          {todo.completed ? "untoggle" : "toggle"}
        </Button>

        <Dialog
          addSubtaskHandler={addSubtaskHandler}
          addHandler={addTagHandler}
          newName={newSubTaskName}
          sameName={sameSubTaskName}
          removeHandler={removeTagHandler}
          setNewName={setNewSubTaskName}
          setVisible={setVisibleSubtask}
          todo={todo}
          visible={visibleSubtask}
          label_button={"+ subtask"}
          header={"Add subtask"}
          placeholder={"Enter Subtask..."}
        />

        <Button
          icon="pi pi-trash"
          label="REMOVE"
          severity="danger"
          onClick={() => removeTodoHandler(todo.id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;

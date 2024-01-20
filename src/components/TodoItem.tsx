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

  // add tag
  const [visibleTag, setVisibleTag] = useState<boolean>(false);
  const [visibleSubtask, setVisibleSubtask] = useState<boolean>(false);
  const [newTagName, setNewTagName] = useState<string>("");
  const [newSubTaskName, setNewSubTaskName] = useState<string>("");
  const [sameName, setSameName] = useState<string>("");

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
    // console.log(id, tag);
    deleteTag(id, tag);
  };

  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };

  const addSubtaskHandler = (id: number, subtaskText: string) => {
    addSubtask(id, subtaskText);
    setVisibleSubtask(false);
    setNewSubTaskName("");
  };

  // const renderz = todoArray.map((item) => (
  //   <div className="todoItem" key={item.id}>
  //     <input
  //       type="checkbox"
  //       className="rounded-checkbox"
  //       id="checkbox"
  //       checked={item.completed}
  //       onChange={() => checkHandler(item.id)}
  //     />
  //     <label htmlFor="checkbox"></label>
  //     <div
  //       className={
  //         item.completed ? "todoItem-completed" : "todoItem-incomplete"
  //       }
  //     >
  //       {item.text}
  //     </div>
  //   </div>
  // ));

  return (
    <li className="todo-item" key={todo.id}>
      <div>
        <div className="title_and_tags">
          <div className={todo.completed ? "text-completed" : "text"}>
            {todo.text}
          </div>
          {todo.tags &&
            todo.tags.map((tag) => (
              <div>
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

        {/* task dialog */}
        {/* <Button
        label="+ subtask"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      ></Button>
      <Dialog
        header="Add subtask"
        visible={visible}
        draggable={false}
        resizable={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <InputText
          type="text"
          value={newSubTaskName}
          onChange={(e) => setNewSubTaskName(e.target.value)}
          placeholder="Enter Subtask..."
        />
        <Button onClick={() => addSubtaskHandler(todo.id, newSubTaskName)}>
          Add
        </Button>
      </Dialog> */}
        <Dialog
          addSubtaskHandler={addSubtaskHandler}
          addHandler={addTagHandler}
          newName={newSubTaskName}
          removeHandler={removeTagHandler}
          setNewName={setNewSubTaskName}
          setVisible={setVisibleSubtask}
          todo={todo}
          visible={visibleSubtask}
          label_button={"+ subtask"}
          header={"Add subtask"}
          placeholder={"Enter Subtask..."}
        />
        {/* task dialog */}
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

import React, { useState } from "react";
import { Todo, useTodoContext } from "../context/TodoContext";
import SubTask from "./SubTask";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo } = props;
  const { addTag, toggleTodo, deleteTag, addSubtask, removeTodo } =
    useTodoContext();

  // add tag
  const [visible, setVisible] = useState<boolean>(false);
  const [newTagName, setNewTagName] = useState<string>("");
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
        setVisible(false);
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
    <div>
      <div>{todo.text}</div>
      {todo.completed && <div>completed</div>}
      <p>depth:{todo.depth}</p>
      {todo.tags &&
        todo.tags.map((tag) => (
          <div>
            <div>{tag}</div>
            <Button onClick={() => removeTagHandler(todo.id, tag)}>
              - sub
            </Button>
          </div>
        ))}
      {todo.subtasks.length > 0 && <SubTask todo={todo} />}

      {/* dialog */}
      <Button
        label="+ tag"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Header"
        visible={visible}
        draggable={false}
        resizable={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <InputText
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Enter Tag Name"
        />
        {sameName && <Message severity="error" text={sameName} />}
        <Button onClick={() => addTagHandler(todo.id, newTagName)}>
          Add Tag
        </Button>
      </Dialog>
      {/* dialog */}

      {todo.tags.length > 0 && (
        <Button onClick={() => removeTagHandler(todo.id, "new tag")}>
          - tag
        </Button>
      )}

      <Button onClick={() => addToggleHandler(todo.id)}>
        {todo.completed ? "untoggle" : "toggle"}
      </Button>
      <Button onClick={() => addSubtaskHandler(todo.id, "newsubtask")}>
        + subtask
      </Button>
      <Button onClick={() => removeTodoHandler(todo.id)}>REMOVE</Button>
    </div>
  );
};

export default TodoItem;

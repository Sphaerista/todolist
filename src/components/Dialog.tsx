import React from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import { Button } from "primereact/button";
import { Dialog as Dial } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export interface DialogProps {
  todo: Todo;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newTagName: string;
  setNewTagName: React.Dispatch<React.SetStateAction<string>>;
  sameName: string;
  removeTagHandler: (deleteId: number, deleteTag: string) => void;
  addTagHandler: (id: number, tag: string) => void;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    todo,
    visible,
    setVisible,
    newTagName,
    setNewTagName,
    sameName,
    removeTagHandler,
    addTagHandler,
  } = props;

  const { todos } = useTodoContext();

  return (
    <>
      <Button
        label="+ tag"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dial
        header="Add tag"
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
          placeholder="Enter Tag..."
        />
        {sameName && <Message severity="error" text={sameName} />}
        <Button
          icon="pi pi-tags"
          label="Add"
          onClick={() => addTagHandler(todo.id, newTagName)}
        />
      </Dial>
      {/* tag dialog */}
    </>
  );
};
export default Dialog;

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
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  sameName?: string;
  removeHandler?: (deleteId: number, deleteTag: string) => void;
  addHandler: (id: number, tag: string) => void;
  label_button: string;
  header: string;
  placeholder: string;
  addSubtaskHandler?: (id: number, subtaskText: string) => void;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    todo,
    visible,
    setVisible,
    newName,
    setNewName,
    sameName,
    removeHandler,
    addHandler,
    label_button,
    header,
    placeholder,
    addSubtaskHandler,
  } = props;

  const { todos } = useTodoContext();

  return (
    <>
      <Button
        label={label_button}
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dial
        header={header}
        visible={visible}
        draggable={false}
        resizable={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <InputText
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={placeholder}
        />
        {sameName && <Message severity="error" text={sameName} />}
        {addSubtaskHandler ? (
          <Button
            icon="pi pi-tags"
            label="Add sb"
            onClick={() => addSubtaskHandler(todo.id, newName)}
          />
        ) : (
          <Button
            icon="pi pi-tags"
            label="Add tg"
            onClick={() => addHandler(todo.id, newName)}
          />
        )}
      </Dial>
      {/* tag dialog */}
    </>
  );
};
export default Dialog;

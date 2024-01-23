import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import Dialog from "./Dialog";

interface SubTaskInputProps {
  subtask: Todo;
  onRemoveSubtask: (parentId: number, id: number) => void;
  todo: Todo;
  onEditTask: (task: number) => void;
}
const SubTaskInput: React.FC<SubTaskInputProps> = (props) => {
  const { subtask, onRemoveSubtask, todo, onEditTask } = props;
  const { addSubtask, editTodoText } = useTodoContext();
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [emptiness, setEmptiness] = useState(false);
  const [showBtns, setShowBtns] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);

  const [newTextName, setNewTestkName] = useState<string>(subtask.text);
  const [visibleEditTask, setVisibleEditTask] = useState<boolean>(true);

  const showInputHandler = (e: any) => {
    e.preventDefault();
    setShowInput((prev) => !prev);
    setNewTaskName("");
    setEmptiness(false);
  };
  const addSubTaskHandler = (e: any) => {
    e.preventDefault();
    if (newTaskName.length < 1) {
      setEmptiness(true);
    } else {
      addSubtask(subtask.id, newTaskName);
      setShowInput((prev) => !prev);
      setNewTaskName("");
      setEmptiness(false);
      setShowBtns(false);
    }
  };

  const editTask = () => {
    setEditDialog(true);
    setVisibleEditTask(true);
  };

  const visibleOffFunc = () => {
    setVisibleEditTask(false);
    setNewTestkName(subtask.text);
  };

  const editTextHanlder = (e: any) => {
    e.preventDefault();
    console.log(subtask.id, newTextName);
    editTodoText(subtask.id, newTextName);
    setVisibleEditTask(false);
    setNewTestkName(newTextName);
  };

  const popupHandler = () => {
    setShowBtns((prev) => !prev);
  };

  return (
    <div className="popup_btn">
      <div className="btns_3_level">
        {showBtns && (
          <>
            {showInput && (
              <>
                <form>
                  <InputText
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Enter Task Name"
                    autoFocus
                  />
                  <Button
                    icon="pi pi-plus-circle"
                    disabled={subtask.completed}
                    onClick={addSubTaskHandler}
                  />
                </form>
              </>
            )}
            {!showInput && <Button icon="pi pi-pencil" onClick={editTask} />}
            <Button
              onClick={showInputHandler}
              disabled={subtask.completed}
              icon={showInput ? "pi pi-times" : "pi pi-plus-circle"}
            />
            {showInput && <Button icon="pi pi-pencil" onClick={editTask} />}
            {emptiness && (
              <Message severity="error" text={"can not be empty"} />
            )}
            <Button
              onClick={() => onRemoveSubtask(todo.id, subtask.id)}
              severity="danger"
              icon="pi pi-trash"
            />
          </>
        )}
      </div>
      <Button
        icon={showBtns ? "pi pi-angle-right" : "pi pi-align-justify"}
        onClick={popupHandler}
      />
      {editDialog && (
        <Dialog
          header="Edit subtask name"
          onSubmition={editTextHanlder}
          setNewName={setNewTestkName}
          newName={newTextName}
          submitButtonLabel="Submit"
          visible={visibleEditTask}
          visibleOffFunc={visibleOffFunc}
        />
      )}
    </div>
  );
};
export default SubTaskInput;

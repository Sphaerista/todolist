import React, { useRef, useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Dialog from "./Dialog";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";

interface SubTaskInputProps {
  subtask: Todo;
  onRemoveSubtask: (parentId: number, id: number) => void;
  todo: Todo;
}
const SubTaskInput: React.FC<SubTaskInputProps> = /* istanbul ignore next */ (
  props
) => {
  const { subtask, onRemoveSubtask, todo } = props;
  const { addSubtask, editTodoText } = useTodoContext();
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [emptiness, setEmptiness] = useState(false);
  const [showBtns, setShowBtns] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);

  const [newTextName, setNewTestkName] = useState<string>(subtask.text);
  const [visibleEditTask, setVisibleEditTask] = useState<boolean>(true);

  const showInputHandler = () => {
    // e.preventDefault();
    setShowInput((prev) => !prev);
    setNewTaskName("");
    setEmptiness(false);
  };
  const addSubTaskHandler = (e: any) => {
    e.preventDefault();
    if (newTaskName.length < 0.5) {
      show();
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

  const items = [
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => onRemoveSubtask(todo.id, subtask.id),
    },
    {
      label: "AddSubtask",
      icon: "pi pi-plus-circle",
      command: () => showInputHandler(),
    },
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => editTask(),
    },
  ];

  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Can not be empty",
    });
  };

  return (
    <div className="subtask_popup_btn">
      {/* special buttons for testing. delete from production. */}
      {/* <button data-testid="editTextHanlder" onClick={editTextHanlder}></button> */}
      {/* special buttons for testing. delete from production. END */}
      {/* <div className="btns_3_level"> */}
      {showInput && (
        <div className="input_subtask_form">
          <form className="form_subtas_input">
            <InputText
              data-testid="input"
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter Task Name"
              autoFocus
            />
            <div className="btns_for_input">
              <Button
                data-testid="add-subtask-button"
                className="add-subtask-button"
                // rounded
                icon="pi pi-plus-circle"
                disabled={subtask.completed}
                onClick={addSubTaskHandler}
              />
              <Button
                data-testid="show-input-button"
                className="show-input-button"
                // rounded
                onClick={showInputHandler}
                disabled={subtask.completed}
                icon={showInput ? "pi pi-times" : "pi pi-plus-circle"}
              />
            </div>
          </form>
          <Toast ref={toast} />
          {/* {emptiness && (
            <>
              <Message severity="error" text={"can not be empty"} />
            </>
          )} */}
        </div>
      )}
      <SpeedDial model={items} direction="left" disabled={showInput} />
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
import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

interface SubTaskInputProps {
  subtask: Todo;
  onRemoveSubtask: (parentId: number, id: number) => void;
  todo: Todo;
}
const SubTaskInput: React.FC<SubTaskInputProps> = (props) => {
  const { subtask, onRemoveSubtask, todo } = props;
  const { addSubtask } = useTodoContext();
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [emptiness, setEmptiness] = useState(false);

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
    }
  };

  return (
    <div>
      <div className="sb_ts_sq">
        <form>
          {showInput && (
            <InputText
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter Task Name"
              autoFocus
            />
          )}
          {showInput && (
            <Button icon="pi pi-plus-circle" onClick={addSubTaskHandler} />
          )}
          <Button icon="pi pi-pencil" onClick={() => {}} />
          <Button
            onClick={showInputHandler}
            icon={showInput ? "pi pi-times" : "pi pi-plus-circle"}
          />
          {emptiness && <Message severity="error" text={"can not be empty"} />}
        </form>
        <Button
          onClick={() => onRemoveSubtask(todo.id, subtask.id)}
          severity="danger"
          icon="pi pi-trash"
        />
      </div>
    </div>
  );
};
export default SubTaskInput;

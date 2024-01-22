import React, { useState } from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import SubTaskLowest from "./SubTaskLowest";

interface SubTaskSqProps {
  subtask: Todo;
  onRemoveSubtask: (parentId: number, id: number) => void;
  todo: Todo;
}
const SubTaskSq: React.FC<SubTaskSqProps> = (props) => {
  const { subtask } = props;
  const { addSubtask, toggleTodo, removeSubtask } = useTodoContext();
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
  //   lowest level
  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };
  const removeSubTaskHandler = (parentId: number, id: number) => {
    console.log("comp", parentId, id);
    removeSubtask(parentId, id);
  };

  return (
    <div>
      {/* <div className="sb_ts_sq">
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
          <Button
            onClick={showInputHandler}
            icon={showInput ? "pi pi-times" : "pi pi-plus-circle"}
          />
          {emptiness && <Message severity="error" text={"can not be empty"} />}
        </form>
        <Button
          onClick={() => onRemoveSubtask(todo.id, subtask.id)}
          severity="danger"
          label="subtask"
          icon="pi pi-trash"
        />
      </div> */}
      {subtask.subtasks.length > 0 && (
        <ul>
          {subtask.subtasks.map((task) => (
            <SubTaskLowest
              addToggleHandler={addToggleHandler}
              removeSubTaskHandler={removeSubTaskHandler}
              subtask={subtask}
              task={task}
              key={task.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default SubTaskSq;

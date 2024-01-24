import React, { useState } from "react";
import "./TodoItem.css";
import { Priority, Todo, useTodoContext } from "../context/TodoContext";
import SubTask from "./SubTask";
import { Button } from "primereact/button";
import Dialog from "./Dialog";
import { Badge } from "primereact/badge";

export interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo } = props;
  const {
    addTag,
    toggleTodo,
    deleteTag,
    addSubtask,
    removeTodo,
    editTodoText,
  } = useTodoContext();

  const [visibleTag, setVisibleTag] = useState<boolean>(false);
  const [visibleSubtask, setVisibleSubtask] = useState<boolean>(false);
  const [visibleTrash, setVisibleTrash] = useState<boolean>(false);
  const [visibleEditTask, setVisibleEditTask] = useState<boolean>(false);
  const [showBtns, setShowBtns] = useState<boolean>(false);
  const [showSubtasks, setShowSubtasks] = useState<boolean>(false);

  const [newTagName, setNewTagName] = useState<string>("");
  const [newSubTaskName, setNewSubTaskName] = useState<string>("");
  const [newTextName, setNewTextName] = useState<string>(todo.text);

  const [sameName, setSameName] = useState<string>("");
  const [sameSubTaskName, setSameSubTaskName] = useState<string>("");

  // tag radiobtn data
  const tagPriority = [
    { name: "low", key: "info" },
    { name: "moderate", key: "warning" },
    { name: "high", key: "danger" },
  ];
  const [selectedPriority, setSelectedPriority] = useState(tagPriority[1]);

  // handlers
  const removeTodoHandler = () => {
    console.log("here");
    removeTodo(todo.id);
  };

  const addTagHandler = (e: any) => {
    e.preventDefault();
    // Check if the new tag name already exists in the list of existing tags
    if (newTagName.length > 0) {
      addTag(todo.id, newTagName, selectedPriority.key as Priority);
      setVisibleTag(false);
      setNewTagName("");
      setSameName("");
    } else {
      setSameName("Tag should have at least one character");
    }
  };
  let tagRenderValues = todo.tag && Object.values(todo.tag);

  const removeTagHandler = (id: number) => {
    if (todo.tag) deleteTag(id, todo.tag);
  };

  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };

  const addSubtaskHandler = (e: any) => {
    e.preventDefault();
    if (newSubTaskName.length > 0) {
      addSubtask(todo.id, newSubTaskName);
      setVisibleSubtask(false);
      setSameSubTaskName("");
      setNewSubTaskName("");
    } else {
      setSameSubTaskName("Subtask can not be empty");
    }
  };

  const visibleOffHandler = () => {
    setNewTagName("");
    setNewSubTaskName("");
    setNewTextName(todo.text);
    setVisibleTag(false);
    setVisibleSubtask(false);
    setVisibleTrash(false);
    setVisibleEditTask(false);
    setSameName("");
    setSameSubTaskName("");
  };

  const editTask = () => {
    setVisibleEditTask(true);
  };
  const editTaskName = (e: any) => {
    e.preventDefault();
    console.log(todo.id, newTextName);
    editTodoText(todo.id, newTextName);
    setVisibleEditTask(false);
    setNewTextName(newTextName);
  };

  const popupHandler = () => {
    setShowBtns((prev) => !prev);
  };
  return (
    <li className="todo-item">
      <div>
        <div className="title_and_tags">
          <div className="toggle-and-text">
            <Button
              onClick={() => addToggleHandler(todo.id)}
              icon={todo.completed ? "pi pi-times" : "pi pi-check"}
            />
            <div className={todo.completed ? "text-completed" : "text"}>
              {todo.text}
            </div>
          </div>
          {tagRenderValues && (
            <div className="badge_and_btn" key={tagRenderValues[0]}>
              <Badge
                size="large"
                severity={tagRenderValues[1]}
                value={tagRenderValues[0]}
              />
              <button
                className="tagRemoveBtn"
                onClick={() => removeTagHandler(todo.id)}
              >
                x
              </button>
            </div>
          )}
          <div className="popup_btn">
            {showBtns && (
              <div className="btns_1_level">
                <Button icon="pi pi-pencil" onClick={editTask} />
                <Button
                  icon="pi pi-plus-circle"
                  disabled={todo.completed}
                  onClick={() => setVisibleSubtask(true)}
                />
                <Button icon="pi pi-tag" onClick={() => setVisibleTag(true)} />
                <Button
                  icon={showSubtasks ? "pi pi-angle-up" : "pi pi-angle-down"}
                  onClick={() => setShowSubtasks((prev) => !prev)}
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  onClick={() => setVisibleTrash(true)}
                />
              </div>
            )}
            <Button
              icon={showBtns ? "pi pi-angle-right" : "pi pi-align-justify"}
              onClick={popupHandler}
            />
          </div>
        </div>
        {todo.subtasks.length > 0 && showSubtasks && <SubTask todo={todo} />}
        <Dialog
          newName={newTagName}
          sameName={sameName}
          setNewName={setNewTagName}
          setSelectedPriority={setSelectedPriority}
          selectedPriority={selectedPriority}
          visibleOffFunc={visibleOffHandler}
          visible={visibleTag}
          header={tagRenderValues ? "Edit tag" : "Add tag"}
          placeholder={tagRenderValues ? tagRenderValues[0] : "Enter Tag..."}
          submitButtonLabel={tagRenderValues ? "Edit" : "Add"}
          tagPriorityList={tagPriority}
          onSubmition={addTagHandler}
        />
        <Dialog
          newName={newSubTaskName}
          sameName={sameSubTaskName}
          setNewName={setNewSubTaskName}
          // setVisible={setVisibleSubtask}
          visibleOffFunc={visibleOffHandler}
          visible={visibleSubtask}
          header={"Add subtask"}
          placeholder={"Enter Subtask..."}
          submitButtonLabel="Add"
          onSubmition={addSubtaskHandler}
        />
        <Dialog
          setNewName={setNewSubTaskName}
          // setVisible={setVisibleTrash}
          visibleOffFunc={visibleOffHandler}
          visible={visibleTrash}
          header={"Are you sure to delete todo?"}
          submitButtonLabel="Add"
          onSubmition={removeTodoHandler}
          trashDial={true}
        />
        <Dialog
          header="Edit task name"
          visibleOffFunc={visibleOffHandler}
          setNewName={setNewTextName}
          newName={newTextName}
          submitButtonLabel="Submit"
          visible={visibleEditTask}
          onSubmition={editTaskName}
        />
      </div>
    </li>
  );
};

export default TodoItem;

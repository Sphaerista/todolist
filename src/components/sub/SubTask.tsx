import React, { useState } from "react";
import { useTodoContext, Todo } from "../../context/TodoContext";
import { Button } from "primereact/button";
import SubTaskSq from "./SubTaskSq";
import SubTaskInput from "../../shared/SubTaskInput";

interface SubTaskProps {
  todo: Todo;
}

const SubTask: React.FC<SubTaskProps> = (props) => {
  const { todo } = props;
  const { removeSubtask, toggleTodo } = useTodoContext();

  const removeSubTaskHandler = /* istanbul ignore next */ (
    parentId: number,
    id: number
  ) => {
    removeSubtask(parentId, id);
  };

  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };

  return (
    <ul>
      {todo.subtasks.map((subtask) => (
        <>
          <li className="main_li" key={subtask.id}>
            <div className="title_of_subtask">
              <div className="subtask_toggle-and-text">
                <Button
                  data-testid="toggle-todo-button"
                  className="outline_none"
                  rounded
                  outlined={!subtask.completed}
                  icon={subtask.completed ? "pi pi-check" : "pi pi"}
                  onClick={() => addToggleHandler(subtask.id)}
                />
                <div className={subtask.completed ? "text-completed" : "text"}>
                  {subtask.text} here!
                </div>
              </div>
            </div>
            {/* <div className="input_task"> */}
            <SubTaskInput
              key={subtask.id + 2}
              subtask={subtask}
              todo={todo}
              onRemoveSubtask={removeSubTaskHandler}
              // showSubtasks={showSubtasks}
              // setShowSubtasks={setShowSubtasks}
            />
            {/* </div> */}
          </li>
        </>
      ))}
    </ul>
  );
};
export default SubTask;

// const [inputEditTask, setInputEditTask] = useState(false);
// const [inputEditTaskId, setInputEditTaskId] = useState<number>(0);
// const removeTagHandler = (id: number, tag: string) => {
// console.log("task", id, tag);
// deleteTag(id, tag);
// };
// const onEditTask = (task: number) => {
//   setInputEditTaskId(task);
//   setInputEditTask((prev) => !prev);
// };

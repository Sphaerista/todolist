import { Button } from "primereact/button";
import React from "react";
import { Todo } from "../../context/TodoContext";

interface SubTaskLowestProps {
  task: Todo;
  subtask: Todo;
  addToggleHandler: (id: number) => void;
  removeSubTaskHandler: (parentId: number, id: number) => void;
}

const SubTaskLowest: React.FC<SubTaskLowestProps> = (props) => {
  const { task, subtask, addToggleHandler, removeSubTaskHandler } = props;

  return (
    <div key={task.id} className="lowest">
      <div className="toggle-and-text">
        <Button
          data-testid="toggle-task-button"
          className="outline_none"
          rounded
          outlined={!task.completed}
          icon={task.completed ? "pi pi-check" : "pi pi-check"}
          onClick={() => addToggleHandler(task.id)}
        />
        <div
          key={task.id}
          className={task.completed ? "text-completed" : "text"}
        >
          {task.text}
        </div>
      </div>
      <Button
        data-testid="remove-subtask-button"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => removeSubTaskHandler(subtask.id, task.id)}
      />
    </div>
  );
};
export default SubTaskLowest;

// const [showBtns, setShowBtns] = useState<boolean>(false);

// const popupHandler = () => {
//   setShowBtns((prev) => !prev);
// };

/* <div className="popup_btn">
        {showBtns && (
          <div className="btns_2_level">
          </div>
        )}
        <Button
          icon={showBtns ? "pi pi-angle-right" : "pi pi-align-justify"}
          onClick={popupHandler}
        />
      </div> */

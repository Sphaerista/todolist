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
          data-testid="toggle-button"
          onClick={() => addToggleHandler(task.id)}
          icon={task.completed ? "pi pi-times" : "pi pi-check"}
        />
        <div
          key={task.id}
          className={task.completed ? "text-completed" : "text"}
        >
          {task.text}
        </div>
      </div>
      <Button
        data-testid="remove-button"
        onClick={() => removeSubTaskHandler(subtask.id, task.id)}
        severity="danger"
        icon="pi pi-trash"
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

import React, { useRef, useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const Input = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useTodoContext();

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    if (!input || /^\s*$/.test(input)) {
      show();
      setInput("");
      return;
    }
    addTodo(input, 1);
    setInput("");
  };
  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Can not be empty",
      life: 5000,
    });
  };

  return (
    <div className="input">
      <form>
        <InputText
          data-testid="input_in_input"
          type="text"
          value={input}
          placeholder="Add todo..."
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          data-testid="add-todo-button"
          onClick={handleAddTodo}
          icon="pi pi-plus-circle"
        />
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default Input;

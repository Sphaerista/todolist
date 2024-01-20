import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Input = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useTodoContext();

  const handleAddTodo = () => {
    if (!input || /^\s*$/.test(input)) {
      return;
    }
    addTodo(input, 1);
    setInput("");
  };
  return (
    <div className="input">
      <InputText
        type="text"
        value={input}
        placeholder="Add todo..."
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleAddTodo}>+</Button>
    </div>
  );
};

export default Input;

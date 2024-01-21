import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

const Input = () => {
  const [input, setInput] = useState("");
  const [emptiness, setEmptiness] = useState(false);
  const { addTodo } = useTodoContext();

  const handleAddTodo = () => {
    if (!input || /^\s*$/.test(input)) {
      setEmptiness(true);
      return;
    }
    addTodo(input, 1);
    setInput("");
    setEmptiness(false);
  };
  return (
    <div className="input">
      <InputText
        type="text"
        value={input}
        placeholder="Add todo..."
        onChange={(e) => setInput(e.target.value)}
      />
      {emptiness && <Message severity="error" text={"can not be empty"} />}
      <Button onClick={handleAddTodo}>+</Button>
    </div>
  );
};

export default Input;

import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

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
      <input
        type="text"
        value={input}
        placeholder="Add todo..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add todo</button>
    </div>
  );
};

export default Input;

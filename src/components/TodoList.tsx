import React from "react";
import { useTodoContext } from "../context/TodoContext";

const TodoList: React.FC = () => {
  const { todos } = useTodoContext();

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  // Implement toggleTodo function here
                }}
              />
              <span style={{ marginLeft: `${todo.depth * 20}px` }}>
                {todo.text}
              </span>
            </div>
            {/* Render subtasks recursively if available */}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;

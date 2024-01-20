import React from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { todos } = useTodoContext();
  const renderTodo = (todo: Todo) => {
    return <TodoItem key={todo.id} todo={todo} />;
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>{todos.map(renderTodo)}</ul>
    </div>
  );
};
export default TodoList;

// {todos.map((todo) => (
//     <li key={todo.id}>
//       <div>
//         <input
//           type="checkbox"
//           checked={todo.completed}
//           onChange={() => {
//             // Implement toggleTodo function here
//           }}
//         />
//         <span style={{ marginLeft: `${todo.depth * 20}px` }}>
//           {todo.text}
//         </span>
//       </div>
//       {/* Render subtasks recursively if available */}
//     </li>
//   ))}

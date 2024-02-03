import React from "react";
import { useTodoContext, Todo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList: React.FC = /* istanbul ignore next */ () => {
  const { todos } = useTodoContext();
  const renderTodo = (todo: Todo) => {
    return <TodoItem key={todo.id} todo={todo} />;
  };

  return (
    <div>
      {/* <h2>Todo List</h2> */}
      <ul>{todos.map(renderTodo)}</ul>
    </div>
  );
};
export default TodoList;

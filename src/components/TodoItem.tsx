import React from "react";
import { Todo, useTodoContext } from "../context/TodoContext";
import { Button } from "primereact/button";

export interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo } = props;
  const { addTag, toggleTodo, deleteTag } = useTodoContext();
  console.log(todo.tags.length);

  const addTagHandler = (id: number, tag: string) => {
    addTag(id, tag);
  };
  const removeTagHandler = (id: number, tag: string) => {
    deleteTag(id, tag);
  };

  const addToggleHandler = (id: number) => {
    toggleTodo(id);
  };

  return (
    <div>
      <div>{todo.text}</div>
      {todo.completed && <div>completed</div>}
      <div>{todo.depth}</div>
      {todo.tags && <div>{todo.tags}</div>}
      {todo.tags.length < 1 && (
        <Button onClick={() => addTagHandler(todo.id, "new tag")}>+ tag</Button>
      )}
      {todo.tags.length > 0 && (
        <Button onClick={() => removeTagHandler(todo.id, "new tag")}>
          - tag
        </Button>
      )}

      <Button onClick={() => addToggleHandler(todo.id)}>
        {todo.completed ? "untoggle" : "toggle"}
      </Button>
      <Button>+ subtask</Button>
    </div>
  );
};

export default TodoItem;

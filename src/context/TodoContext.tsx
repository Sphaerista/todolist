import React, { createContext, useContext, ReactNode, useReducer } from "react";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  depth: number;
  tags?: string[];
  subtasks?: TodoItem[];
}

interface TodoContextProps {
  todos: TodoItem[];
  addTodo: (text: string, depth: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const todoReducer = (
  state: TodoItem[],
  action: { type: string; payload?: any }
): TodoItem[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
          depth: action.payload.depth,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text: string, depth: number) => {
    dispatch({ type: "ADD_TODO", payload: { text, depth } });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

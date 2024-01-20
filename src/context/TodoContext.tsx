import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
} from "react";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  depth: number;
  tags: string[];
  subtasks: Todo[];
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string, depth: number) => void;
  toggleTodo: (id: number) => void;
  addTag: (id: number, tag: string) => void;
  deleteTag: (deleteId: number, deleteTag: string) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const todoReducer = (
  state: Todo[],
  action: { type: string; payload?: any }
): Todo[] => {
  switch (action.type) {
    // global
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
          depth: action.payload.depth,
          tags: [],
          subtasks: [],
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "LOAD_TODOS":
      return action.payload;

    //   tags
    case "ADD_TAG":
      const { id, tag } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, tags: [...(todo.tags || []), tag] } : todo
      );
    case "DELETE_TAG":
      const { deleteId, deleteTag } = action.payload;
      return state.map((todo) =>
        todo.id === deleteId
          ? { ...todo, tags: (todo.tags || []).filter((t) => t !== deleteTag) }
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
  const [notFirstRun, setNotFirstRun] = useState(false);

  useEffect(() => {
    // Load todos from localStorage on component mount
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    dispatch({ type: "LOAD_TODOS", payload: storedTodos });
    setNotFirstRun(true);
  }, []);

  useEffect(() => {
    if (todos && notFirstRun === true) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text: string, depth: number) => {
    // Add the new todo to the existing todos
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      depth,
      tags: [],
      subtasks: [],
    };
    const updatedTodos = [...todos, newTodo];
    // Save the updated todos to localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // Dispatch the ADD_TODO action
    dispatch({ type: "ADD_TODO", payload: { text, depth } });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  //   tags
  const addTag = (id: number, tag: string) => {
    dispatch({ type: "ADD_TAG", payload: { id, tag } });
  };
  const deleteTag = (deleteId: number, deleteTag: string) => {
    dispatch({ type: "DELETE_TAG", payload: { deleteId, deleteTag } });
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, addTag, deleteTag }}
    >
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

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
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  addTag: (id: number, tag: string) => void;
  deleteTag: (deleteId: number, deleteTag: string) => void;
  addSubtask: (id: number, text: string) => void;
  removeSubtask: (parentId: number, id: number) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const MAX_DEPTH = 3; // Set maximum depth limit

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
    case "REMOVE_TODO":
      const { removeId } = action.payload;
      return state.filter((todo) => todo.id !== removeId);
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
      const { idTag, tag } = action.payload;
      return state.map((todo) =>
        todo.id === idTag
          ? { ...todo, tags: [...(todo.tags || []), tag] }
          : todo
      );
    case "DELETE_TAG":
      const { deleteId, deleteTag } = action.payload;
      return state.map((todo) =>
        todo.id === deleteId
          ? { ...todo, tags: (todo.tags || []).filter((t) => t !== deleteTag) }
          : todo
      );

    //   subtasks
    case "ADD_SUBTASK":
      const { idSub, subtaskText } = action.payload;
      return state.map((todo) =>
        todo.id === idSub
          ? {
              ...todo,
              subtasks:
                todo.depth < MAX_DEPTH
                  ? [
                      ...(todo.subtasks || []),
                      {
                        id: Date.now(),
                        text: subtaskText,
                        completed: false,
                        depth: todo.depth + 1,
                        tags: [],
                        subtasks: [],
                      },
                    ]
                  : todo.subtasks, // Don't exceed the depth limit
            }
          : todo
      );
    case "REMOVE_SUBTASK":
      const { parentId, removeSubtaskId } = action.payload;
      return state.map((todo) =>
        todo.id === parentId
          ? {
              ...todo,
              subtasks: (todo.subtasks || []).filter(
                (subtask) => subtask.id !== removeSubtaskId
              ),
            }
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
  const removeTodo = (removeId: number) => {
    dispatch({ type: "REMOVE_TODO", payload: { removeId } });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  //   tags
  const addTag = (idTag: number, tag: string) => {
    dispatch({ type: "ADD_TAG", payload: { idTag, tag } });
  };
  const deleteTag = (deleteId: number, deleteTag: string) => {
    dispatch({ type: "DELETE_TAG", payload: { deleteId, deleteTag } });
  };

  //   subtasks
  const addSubtask = (idSub: number, subtaskText: string) => {
    dispatch({ type: "ADD_SUBTASK", payload: { idSub, subtaskText } });
  };
  const removeSubtask = (parentId: number, removeSubtaskId: number) => {
    dispatch({
      type: "REMOVE_SUBTASK",
      payload: { parentId, removeSubtaskId },
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        addTag,
        deleteTag,
        addSubtask,
        removeSubtask,
      }}
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

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

const MAX_DEPTH = 4; // Set maximum depth limit

// Helper function to recursively update a todo item
const updateTodoItem = (
  todos: Todo[],
  id: number,
  updateFunction: (todo: Todo) => Todo
): Todo[] => {
  return todos.map((todo) => {
    if (todo.id === id) {
      // If the current todo matches the ID, apply the update function
      return updateFunction(todo);
    } else if (todo.subtasks) {
      // If the current todo has subtasks, recursively update them
      return {
        ...todo,
        subtasks: updateTodoItem(todo.subtasks, id, updateFunction),
      };
    } else {
      // Otherwise, return the todo unchanged
      return todo;
    }
  });
};

// Helper function to check if all subtasks are completed and update the main todo accordingly
const checkAllSubtasks = (todos: Todo[]): Todo[] => {
  return todos.map((todo) => {
    if (todo.subtasks.length > 0 && todo.depth > 1) {
      // If the current todo has subtasks, check if all of them are completed
      const allSubtasksCompleted = todo.subtasks.every(
        (subtask) => subtask.completed
      );
      console.log("in func", allSubtasksCompleted);
      return { ...todo, completed: allSubtasksCompleted };
    } else {
      // Otherwise, return the todo unchanged
      return todo;
    }
  });
};

// Recursive helper function to find a todo item by ID
const findTodoById = (todos: Todo[], targetId: number): Todo | null => {
  for (const todo of todos) {
    if (todo.id === targetId) {
      return todo;
    }

    const foundInSubtasks = findTodoById(todo.subtasks || [], targetId);
    if (foundInSubtasks) {
      return foundInSubtasks;
    }
  }

  return null;
};

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
      const toggleId = action.payload;

      const toggleTodo = (todos: Todo[]): Todo[] =>
        todos.map((todo) => {
          if (todo.id === toggleId) {
            if (todo.subtasks && todo.subtasks.length > 0) {
              todo.subtasks.map((sub) => (sub.completed = !todo.completed));
              todo.subtasks.map((sub) => {
                if (sub.subtasks && sub.subtasks.length > 0) {
                  sub.subtasks.map((subs) => (subs.completed = sub.completed));
                }
              });
            }
            // Toggle the completed status of the current todo
            return { ...todo, completed: !todo.completed };
          } else if (todo.subtasks && todo.subtasks.length > 0) {
            // If the current todo has subtasks, recursively toggle them
            return { ...todo, subtasks: toggleTodo(todo.subtasks) };
          } else {
            // Otherwise, return the todo unchanged
            return todo;
          }
        });

      // Toggle the todos
      const updatedTodos = toggleTodo(state);
      //   return updatedTodos;
      // Check all subtasks (including nested ones)
      const updatedTodosWithSubtasks = checkAllSubtasks(updatedTodos);

      return updatedTodosWithSubtasks;

    case "LOAD_TODOS":
      return action.payload;

    //   tags
    case "ADD_TAG":
      const { idTag, tag } = action.payload;
      return updateTodoItem(state, idTag, (todo) => ({
        ...todo,
        tags: [...(todo.tags || []), tag],
      }));
    case "DELETE_TAG":
      const { deleteId, deleteTag } = action.payload;
      return updateTodoItem(state, deleteId, (todo) => ({
        ...todo,
        tags: (todo.tags || []).filter((t) => t !== deleteTag),
      }));

    //   subtasks
    case "ADD_SUBTASK":
      // const { idSub, subtaskText } = action.payload;
      // return state.map((todo) =>
      //   todo.id === idSub
      //     ? {
      //         ...todo,
      //         subtasks:
      //           todo.depth < MAX_DEPTH
      //             ? [
      //                 ...(todo.subtasks || []),
      //                 {
      //                   id: Date.now(),
      //                   text: subtaskText,
      //                   completed: false,
      //                   depth: todo.depth + 1,
      //                   tags: [],
      //                   subtasks: [],
      //                 },
      //               ]
      //             : todo.subtasks, // Don't exceed the depth limit
      //       }
      //     : todo
      // );
      const { idSub, subtaskText } = action.payload;

      const addSubtaskToTodo = (todos: Todo[]): Todo[] =>
        todos.map((todo) =>
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
            : { ...todo, subtasks: addSubtaskToTodo(todo.subtasks || []) }
        );

      return addSubtaskToTodo(state);

    case "REMOVE_SUBTASK":
      const { parentId, removeSubtaskId } = action.payload;
      const removeSubtaskRecursive = (todos: Todo[]): Todo[] =>
        todos.map((todo) => {
          if (todo.id === parentId) {
            // If the current todo is the parent, filter out the subtask to be removed
            return {
              ...todo,
              subtasks: (todo.subtasks || []).filter(
                (subtask) => subtask.id !== removeSubtaskId
              ),
            };
          } else if (todo.subtasks && todo.subtasks.length > 0) {
            // If the current todo has subtasks, recursively remove the subtask
            return { ...todo, subtasks: removeSubtaskRecursive(todo.subtasks) };
          } else {
            // Otherwise, return the todo unchanged
            return todo;
          }
        });

      // Remove the subtask recursively
      const updatedTodoss = removeSubtaskRecursive(state);

      return updatedTodoss;

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

  const toggleTodo = (toggleId: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: toggleId });
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
    console.log("ctx remove", parentId, removeSubtaskId);
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

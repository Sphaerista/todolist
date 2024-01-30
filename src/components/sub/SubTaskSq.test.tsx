import { fireEvent, render } from "@testing-library/react";
import SubTaskSq from "./SubTaskSq";
import { Todo, TodoProvider } from "../../context/TodoContext";
import { PrimeReactProvider } from "primereact/api";

const mockTodo: Todo = {
  id: 1705867809635,
  text: "todolist",
  completed: false,
  depth: 1,
  tag: undefined,
  subtasks: [
    {
      id: 1705867819971,
      text: "codecove",
      completed: false,
      depth: 2,
      tag: undefined,
      subtasks: [],
    },
  ],
};

const subTask: Todo = {
  id: 1705867819971,
  text: "codecove todo",
  completed: false,
  depth: 1,
  tag: undefined,
  subtasks: [
    {
      id: 1705867819972,
      text: "codecove subtask",
      completed: false,
      depth: 2,
      tag: undefined,
      subtasks: [],
    },
  ],
};
const onRemoveSubtask = jest.fn();

test("renders Input", () => {
  const { getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <SubTaskSq
          // onRemoveSubtask={onRemoveSubtask}
          subtask={subTask}
          todo={mockTodo}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );

  const toggleTaskButton = getByTestId("toggle-task-button");
  expect(toggleTaskButton).toBeInTheDocument();
  fireEvent.click(toggleTaskButton, 1705867819971);
  fireEvent.click(toggleTaskButton, 1705867819971);

  const removeSubtaskButton = getByTestId("remove-subtask-button");
  expect(removeSubtaskButton).toBeInTheDocument();
  fireEvent.click(removeSubtaskButton, 1705867819971);
  fireEvent.click(removeSubtaskButton, 1705867819971);
  //   const input = getByTestId("input_in_input");
  //   fireEvent.change(input, { target: { value: "New Input" } });

  //   const addTodoBtn = getByTestId("add-todo-button");
  //   fireEvent.click(addTodoBtn);
});

// npm test -- --testPathPattern=src/components/TodoItem.test.tsx

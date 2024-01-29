import { fireEvent, render } from "@testing-library/react";
import SubTask from "./SubTask";
import { Todo, TodoProvider } from "../../context/TodoContext";
import { PrimeReactProvider } from "primereact/api";

const mockSubtask: Todo = {
  id: 1,
  text: "Subtask 1",
  completed: false,
  depth: 1,
  tag: undefined,
  subtasks: [
    {
      id: 11,
      text: "Nested Subtask 1",
      completed: false,
      depth: 1,
      tag: undefined,
      subtasks: [],
    },
  ],
};

// describe("SubTask Component", () => {
//   it("renders subtasks with SubTaskInput and SubTaskSq components", () => {});
// });

test("renders TodoItem, check handler and remove todo", () => {
  const { getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <SubTask todo={mockSubtask} />
      </TodoProvider>
    </PrimeReactProvider>
  );

  const toggleTodoButton = getByTestId("toggle-todo-button");
  expect(toggleTodoButton).toBeInTheDocument();
  fireEvent.click(toggleTodoButton, 11);
  fireEvent.click(toggleTodoButton, 11);
});

// npm test -- --testPathPattern=src/components/sub/SubTask.test.tsx

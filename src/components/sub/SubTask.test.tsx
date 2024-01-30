import { fireEvent, render } from "@testing-library/react";
import SubTask from "./SubTask";
import { Todo, TodoProvider } from "../../context/TodoContext";
import { PrimeReactProvider } from "primereact/api";
import SubTaskInput from "../../shared/SubTaskInput";

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
const mockSubtaskOfSubtask: Todo = {
  id: 11,
  text: "Nested Subtask 1",
  completed: false,
  depth: 1,
  tag: undefined,
  subtasks: [],
};
const onRemoveSubtaskMock = jest.fn();

// describe("SubTask Component", () => {
//   it("renders subtasks with SubTaskInput and SubTaskSq components", () => {});
// });

test("renders TodoItem, check handler and remove todo", () => {
  const { getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <SubTask todo={mockSubtask} />
        {/* <SubTaskInput
          onRemoveSubtask={onRemoveSubtaskMock}
          subtask={mockSubtaskOfSubtask}
          todo={mockSubtask}
        /> */}
      </TodoProvider>
    </PrimeReactProvider>
  );

  const toggleTodoButton = getByTestId("toggle-todo-button");
  expect(toggleTodoButton).toBeInTheDocument();
  fireEvent.click(toggleTodoButton, 11);
  fireEvent.click(toggleTodoButton, 11);

  const popupButton = getByTestId("popup-button");
  expect(popupButton).toBeInTheDocument();
  fireEvent.click(popupButton);

  const deleteButton = getByTestId("delete-button");
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton, () => onRemoveSubtaskMock(1, 11));
});

// npm test -- --testPathPattern=src/components/sub/SubTask.test.tsx

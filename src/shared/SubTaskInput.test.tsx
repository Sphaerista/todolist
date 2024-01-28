import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect"; // for expect(...).toBeInTheDocument()
import SubTaskInput from "./SubTaskInput";
import Dialog from "./Dialog";
import { TodoProvider } from "../context/TodoContext";
import { PrimeReactProvider } from "primereact/api";

const todo = {
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
const subtask = {
  id: 1705867819971,
  text: "codecove",
  completed: false,
  depth: 2,
  tag: undefined,
  subtasks: [],
};

// Mock the required context and functions
jest.mock("../context/TodoContext", () => ({
  ...jest.requireActual("../context/TodoContext"),
  useTodoContext: () => ({
    addSubtask: jest.fn(),
    editTodoText: jest.fn(),
  }),
}));

test("renders SubTaskInput component", () => {
  const { getByText, getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <SubTaskInput
          todo={todo}
          subtask={subtask}
          onRemoveSubtask={() => {}}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );

  // Check if the popup button input is rendered
  const popupButton = getByTestId("popup-button");
  expect(popupButton).toBeInTheDocument();
  // Simulate a click on the popup button to show/hide buttons
  fireEvent.click(popupButton);

  // Check if the input button exists
  const showInputButton = getByTestId("show-input-button");
  expect(showInputButton).toBeInTheDocument();
  fireEvent.click(showInputButton);

  //   Check if the edit task button exists
  const editTaskButton = getByTestId("edit-task-button");
  expect(editTaskButton).toBeInTheDocument();
  fireEvent.click(editTaskButton);
  // const event = new KeyboardEvent("keydown", { key: "Escape" });
  // document.dispatchEvent(event);

  // check input area
  const inputArea = getByTestId("input");
  fireEvent.change(inputArea, { target: { value: "New Task Name" } });

  // Check if the delete button exists
  const deleteButton = getByTestId("delete-button");
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  // const onHideMock = jest.fn();
  // const dialog = getByTestId("dialog");
  // Attach the mock function to the input's onChange
  // dialog.addEventListener("hide", onHideMock);
  // fireEvent.click(dialog);
});

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
const onRemoveSubtaskMock = jest.fn();

test("renders SubTaskInput component and click buttons", () => {
  const { getByText, getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <SubTaskInput
          todo={todo}
          subtask={subtask}
          onRemoveSubtask={onRemoveSubtaskMock}
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

  // check input area
  const inputArea = getByTestId("input");
  fireEvent.change(inputArea, { target: { value: "New Task Name" } });

  // check input area
  const addSubtaskButton = getByTestId("add-subtask-button");
  expect(addSubtaskButton).toBeInTheDocument();
  fireEvent.click(addSubtaskButton);

  // Check if the delete button exists
  const deleteButton = getByTestId("delete-button");
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton, () => onRemoveSubtaskMock(1, 2));

  // const onHideMock = jest.fn();
  // const dialog = getByTestId("dialog");
  // Attach the mock function to the input's onChange
  // dialog.addEventListener("hide", onHideMock);
  // fireEvent.click(dialog);
});

test("check vissibleOffFunction", () => {
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
  fireEvent.click(popupButton);

  //   Check if the edit task button exists
  const editTaskButton = getByTestId("edit-task-button");
  expect(editTaskButton).toBeInTheDocument();
  fireEvent.click(editTaskButton);
  // const event = new KeyboardEvent("keydown", { key: "Escape" });
  // document.dispatchEvent(event);

  // const onHideMock = jest.fn();
  // const dialog = getByTestId("dialog");
  // Attach the mock function to the input's onChange
  // dialog.addEventListener("hide", onHideMock);
  // fireEvent.click(dialog);
});

test("click on delete buttons", () => {
  const { getByText, getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <SubTaskInput
          todo={todo}
          subtask={subtask}
          onRemoveSubtask={onRemoveSubtaskMock}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );

  // Check if the popup button input is rendered
  const popupButton = getByTestId("popup-button");
  expect(popupButton).toBeInTheDocument();
  // Simulate a click on the popup button to show/hide buttons
  fireEvent.click(popupButton);

  // Check if the delete button exists
  const deleteButton = getByTestId("delete-button");
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton, () =>
    onRemoveSubtaskMock(1705867809635, 1705867819971)
  );

  // const onHideMock = jest.fn();
  // const dialog = getByTestId("dialog");
  // Attach the mock function to the input's onChange
  // dialog.addEventListener("hide", onHideMock);
  // fireEvent.click(dialog);
});

const editTextHanlder = jest.fn();
test("edit text handler with custom button", () => {
  const { getByText, getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <SubTaskInput
          todo={todo}
          subtask={subtask}
          onRemoveSubtask={onRemoveSubtaskMock}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );

  // Check if the popup button input is rendered
  const editTextButton = getByTestId("editTextHanlder");
  expect(editTextButton).toBeInTheDocument();
  // Simulate a click on the popup button to show/hide buttons
  fireEvent.click(editTextButton);

  // Check if the delete button exists
  // const deleteButton = getByTestId("delete-button");
  // expect(deleteButton).toBeInTheDocument();
  // fireEvent.click(deleteButton, () =>
  //   onRemoveSubtaskMock(1705867809635, 1705867819971)
  // );

  // const onHideMock = jest.fn();
  // const dialog = getByTestId("dialog");
  // Attach the mock function to the input's onChange
  // dialog.addEventListener("hide", onHideMock);
  // fireEvent.click(dialog);
});

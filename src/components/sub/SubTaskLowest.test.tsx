import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for expect(...).toBeInTheDocument()
import SubTaskLowest from "./SubTaskLowest";

// Mock the functions passed as props
const mockAddToggleHandler = jest.fn();
const mockRemoveSubTaskHandler = jest.fn();

const mockTask = {
  id: 1,
  text: "Task 1",
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
    {
      id: 12,
      text: "Nested Subtask 2",
      completed: true,
      depth: 1,
      tag: undefined,
      subtasks: [],
    },
  ],
};

const mockSubtask = {
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
    {
      id: 12,
      text: "Nested Subtask 2",
      completed: true,
      depth: 1,
      tag: undefined,
      subtasks: [],
    },
  ],
};

test("renders SubTaskLowest component", () => {
  const { getByText, getByTestId } = render(
    <SubTaskLowest
      task={mockTask}
      subtask={mockSubtask}
      addToggleHandler={mockAddToggleHandler}
      removeSubTaskHandler={mockRemoveSubTaskHandler}
    />
  );

  // Check if the task text is rendered
  expect(getByText("Task 1")).toBeInTheDocument();

  // Check if the toggle button is rendered
  const toggleButton = getByTestId("toggle-button");
  expect(toggleButton).toBeInTheDocument();

  // Simulate a click on the toggle button
  fireEvent.click(toggleButton);

  // Check if the addToggleHandler function is called with the correct parameters
  expect(mockAddToggleHandler).toHaveBeenCalledWith(1);

  // Check if the remove button is rendered
  const removeButton = getByTestId("remove-button");
  expect(removeButton).toBeInTheDocument();

  // Simulate a click on the remove button
  fireEvent.click(removeButton);

  // Check if the removeSubTaskHandler function is called with the correct parameters
  expect(mockRemoveSubTaskHandler).toHaveBeenCalledWith(1, 1);
});

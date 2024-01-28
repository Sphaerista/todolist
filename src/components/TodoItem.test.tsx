import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { Todo, TodoProvider } from "../context/TodoContext";
import Dialog from "../shared/Dialog";
import { PrimeReactProvider } from "primereact/api";

const mockTodo: Todo = {
  id: 1705867809635,
  text: "todolist",
  completed: false,
  depth: 1,
  tag: { tagName: "tag", priority: "warning" },
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

const mockTodoWithoutTag: Todo = {
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

const newName = "newName";
const sameName = "newName";
const setNewName = jest.fn();
const visibleOffFunc = jest.fn();
const visible = false;
const onSubmition = jest.fn();

const setSelectedPriority = jest.fn();

test("renders TodoItem, check handler and remove todo", () => {
  const { getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    </PrimeReactProvider>
  );

  const toggleTodoButton = getByTestId("toggle-todo-button");
  expect(toggleTodoButton).toBeInTheDocument();
  fireEvent.click(toggleTodoButton, mockTodo.id);
  fireEvent.click(toggleTodoButton, mockTodo.id);

  // Check if the popup button input is rendered
  const removeTagButton = getByTestId("remove-tag-button");
  expect(removeTagButton).toBeInTheDocument();
  fireEvent.click(removeTagButton);

  // Check if the popup button input is rendered
  const popupButton = getByTestId("popup-button");
  expect(popupButton).toBeInTheDocument();
  fireEvent.click(popupButton);

  const editTaskButton = getByTestId("edit-task-button");
  expect(editTaskButton).toBeInTheDocument();
  fireEvent.click(editTaskButton);

  const removeTodoButton = getByTestId("remove-todo-button");
  expect(removeTodoButton).toBeInTheDocument();
  fireEvent.click(removeTodoButton);

  render(
    <PrimeReactProvider>
      <TodoProvider>
        <Dialog
          setNewName={setNewName}
          visibleOffFunc={visibleOffFunc}
          visible={visible}
          header={"Are you sure to delete todo?"}
          submitButtonLabel="Add"
          onSubmition={onSubmition}
          trashDial={true}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );

  const dialRemoveTodoButton = getByTestId("dial_btn_remove");
  expect(dialRemoveTodoButton).toBeInTheDocument();
  fireEvent.click(dialRemoveTodoButton);
});

test("renders TodoItem and add tag", () => {
  const { getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <TodoItem todo={mockTodoWithoutTag} />
      </TodoProvider>
    </PrimeReactProvider>
  );

  // Check if the popup button input is rendered
  const popupButton = getByTestId("popup-button");
  expect(popupButton).toBeInTheDocument();
  // Simulate a click on the popup button to show/hide buttons
  fireEvent.click(popupButton);

  render(
    <PrimeReactProvider>
      <TodoProvider>
        <Dialog
          newName={newName}
          //   sameName={sameName}
          setNewName={setNewName}
          setSelectedPriority={setSelectedPriority}
          visibleOffFunc={visibleOffFunc}
          visible={true}
          header="Edit tag"
          placeholder={"Enter Tag..."}
          submitButtonLabel={"Add"}
          onSubmition={onSubmition}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );
  // write in input
  const input = getByTestId("input_in_dialog");
  fireEvent.change(input, { target: { value: "newTag" } });
  // clic on button
  const mockEvent = { preventDefault: jest.fn() };
  const submissionButton = getByTestId("submission_button");
  expect(submissionButton).toBeInTheDocument();
  fireEvent.click(submissionButton, mockEvent);

  const removeTodoButton = getByTestId("remove-todo-button");
  expect(removeTodoButton).toBeInTheDocument();
  fireEvent.click(removeTodoButton);
});

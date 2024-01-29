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
  text: "codecove",
  completed: false,
  depth: 1,
  tag: undefined,
  subtasks: [
    {
      id: 1705867819972,
      text: "codecove",
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

  const lowest = getByTestId("lowest_component");
  expect(lowest).toBeInTheDocument();

  //   const input = getByTestId("input_in_input");
  //   fireEvent.change(input, { target: { value: "New Input" } });

  //   const addTodoBtn = getByTestId("add-todo-button");
  //   fireEvent.click(addTodoBtn);
});

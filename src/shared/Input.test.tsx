import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect"; // for expect(...).toBeInTheDocument()
import Input from "./Input";
import { TodoProvider } from "../context/TodoContext";
import { PrimeReactProvider } from "primereact/api";

test("renders Input", () => {
  const { getByTestId } = render(
    <TodoProvider>
      <Input />
    </TodoProvider>
  );

  const input = getByTestId("input_in_input");
  fireEvent.change(input, { target: { value: "New Input" } });

  const addTodoBtn = getByTestId("add-todo-button");
  fireEvent.click(addTodoBtn);
});

test("empty input", () => {
  const { getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <Input />
      </TodoProvider>
    </PrimeReactProvider>
  );

  const input = getByTestId("input_in_input");
  fireEvent.change(input, { target: { value: "" } });

  const addTodoBtn = getByTestId("add-todo-button");
  fireEvent.click(addTodoBtn);
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect"; // for expect(...).toBeInTheDocument()
import SubTaskInput from "./SubTaskInput";
import Dialog from "./Dialog";
import { PrimeReactProvider } from "primereact/api";
import { TodoProvider } from "../context/TodoContext";

test("renders Dialog", () => {
  const editTextHanlder = jest.fn();
  const setNewTestkName = jest.fn();
  const newTextName = "new name";
  const visibleEditTask = true;
  const visibleOffFunc = jest.fn();

  const { getByText, getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <Dialog
          header="Edit subtask name"
          onSubmition={editTextHanlder}
          setNewName={setNewTestkName}
          newName={newTextName}
          submitButtonLabel="Submit"
          visible={visibleEditTask}
          visibleOffFunc={visibleOffFunc}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );
  const dial = getByTestId("dial");
  expect(dial).toBeInTheDocument();

  const event = new KeyboardEvent("keydown", { key: "Escape" });
  document.dispatchEvent(event);
  const dialogInput = getByTestId("input_in_dialog");
  fireEvent.change(dialogInput, { target: { value: "New Text" } });

  // const onHideMock = jest.fn();

  // dialog.onkeydown(event)
  // addEventListener("onHide", onHideMock);
  // fireEvent.click(dialog);
});

const radio_btn_selection = {
  name: "high",
  key: "danger",
};

test("radio Button", () => {
  const editTextHanlder = jest.fn();
  const setNewTestkName = jest.fn();
  const newTextName = "new name";
  const visibleEditTask = true;
  const visibleOffFunc = jest.fn();
  const tagPriorityList = [radio_btn_selection];
  const setSelectedPriority = jest.fn();
  const selectedPriority = radio_btn_selection;

  const { getByText, getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <Dialog
          header="Edit subtask name"
          onSubmition={editTextHanlder}
          setNewName={setNewTestkName}
          newName={newTextName}
          submitButtonLabel="Submit"
          visible={visibleEditTask}
          visibleOffFunc={visibleOffFunc}
          tagPriorityList={tagPriorityList}
          setSelectedPriority={setSelectedPriority}
          selectedPriority={selectedPriority}
        />
      </TodoProvider>
    </PrimeReactProvider>
  );
  const radioBtn = getByTestId("radio_button");
  fireEvent.click(radioBtn);
});

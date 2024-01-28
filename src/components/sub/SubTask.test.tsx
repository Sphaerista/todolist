import { render } from "@testing-library/react";
import SubTask from "./SubTask";
import { Todo } from "../../context/TodoContext";

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

describe("SubTask Component", () => {
  it("renders subtasks with SubTaskInput and SubTaskSq components", () => {});
});

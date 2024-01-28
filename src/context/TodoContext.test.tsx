import { render } from "@testing-library/react";
import { Todo, TodoProvider, todoReducer } from "./TodoContext";

test("todoReducer adds a tag", () => {
  const initialState: Todo[] = [];
  const newTodo: Todo = {
    id: 1,
    text: "Test Todo",
    completed: false,
    depth: 0,
    tag: { tagName: "newTag", priority: "warning" },
    subtasks: [],
  };

  const updatedState = todoReducer(initialState, {
    type: "ADD_TAG",
    payload: newTodo,
  });

  expect(updatedState).toHaveLength(1);
  expect(updatedState[0]).toEqual(newTodo);
});

test("todoReducer updates todotext", () => {
  const initialState: Todo[] = [
    {
      id: 1,
      text: "Test Todo",
      completed: false,
      depth: 0,
      tag: { tagName: "newTag", priority: "warning" },
      subtasks: [],
    },
  ];
  const action = {
    type: "UPDATE_TODO_TEXT",
    payload: { id: 1, newText: "NewText" },
  };

  const updatedState = todoReducer(initialState, action);

  const expectedState = {
    todos: [
      {
        id: 1,
        text: "NewText",
        completed: false,
        depth: 0,
        tag: { tagName: "newTag", priority: "warning" },
        subtasks: [],
      },
    ],
  };
  // Assert that the state is updated as expected
  expect(updatedState).toEqual(expectedState);
});

test("todoReducer toggle todo", () => {
  const initialState: Todo[] = [
    {
      id: 1,
      text: "Test Todo",
      completed: false,
      depth: 0,
      tag: { tagName: "newTag", priority: "warning" },
      subtasks: [
        {
          id: 2,
          text: "Subtask 1",
          completed: false,
          depth: 1,
          tag: undefined,
          subtasks: [],
        },
      ],
    },
  ];
  // Mock the action
  const action = {
    type: "TOGGLE_TODO",
    payload: 1,
  };
  // Call the reducer with the mock data
  const updatedState = todoReducer(initialState, action);
  // Manually update the expected state based on the action
  const expectedState = {
    todos: [
      {
        id: 1,
        text: "Test Todo",
        completed: true, // Toggled
        depth: 0,
        tag: { tagName: "newTag", priority: "warning" },
        subtasks: [
          {
            id: 2,
            text: "Subtask 1",
            completed: true, // Toggled along with the parent
            depth: 1,
            tag: undefined,
            subtasks: [],
          },
        ],
      },
    ],
  };
  // Assert that the state is updated as expected
  expect(updatedState).toEqual(expectedState);
});

test("todoReducer toggle subtask", () => {
  const initialState: Todo[] = [
    {
      id: 1,
      text: "Test Todo",
      completed: false,
      depth: 0,
      tag: { tagName: "newTag", priority: "warning" },
      subtasks: [
        {
          id: 2,
          text: "Subtask 1",
          completed: false,
          depth: 1,
          tag: undefined,
          subtasks: [],
        },
      ],
    },
  ];
  // Mock the action
  const action = {
    type: "TOGGLE_TODO",
    payload: 2,
  };
  // Call the reducer with the mock data
  const updatedState = todoReducer(initialState, action);
  // Manually update the expected state based on the action
  const expectedState = {
    todos: [
      {
        id: 1,
        text: "Test Todo",
        completed: false, // Toggled
        depth: 0,
        tag: { tagName: "newTag", priority: "warning" },
        subtasks: [
          {
            id: 2,
            text: "Subtask 1",
            completed: true,
            depth: 1,
            tag: undefined,
            subtasks: [],
          },
        ],
      },
    ],
  };
  // Assert that the state is updated as expected
  expect(updatedState).toEqual(expectedState);
});

test("todoReducer adding subtask", () => {
  const initialState: Todo[] = [
    {
      id: 1,
      text: "Test Todo",
      completed: false,
      depth: 0,
      tag: { tagName: "newTag", priority: "warning" },
      subtasks: [
        {
          id: 2,
          text: "Subtask 1",
          completed: false,
          depth: 1,
          tag: undefined,
          subtasks: [],
        },
      ],
    },
  ];

  // Mock the action
  const action = {
    type: "ADD_SUBTASK",
    payload: {
      idSub: 1,
      subtaskText: "New Subtask",
    },
  };

  // Call the reducer with the mock data
  const updatedState = todoReducer(initialState, action);

  // Manually update the expected state based on the action
  const expectedState = {
    todos: [
      {
        id: 1,
        text: "Test Todo",
        completed: false,
        depth: 0,
        tag: { tagName: "newTag", priority: "warning" },
        subtasks: [
          {
            id: 2,
            text: "Subtask 1",
            completed: false,
            depth: 1,
            tag: undefined,
            subtasks: [],
          },
          {
            id: 3,
            text: "New Subtask",
            completed: false,
            depth: 1,
            tag: undefined,
            subtasks: [],
          },
        ],
      },
    ],
  };

  // Assert that the state is updated as expected
  expect(updatedState).toEqual(expectedState);
});

test("todoReducer removing subtask", () => {
  // Mock initial state
  const initialState: Todo[] = [
    {
      id: 1,
      text: "Test Todo",
      completed: false,
      depth: 0,
      tag: { tagName: "newTag", priority: "warning" },
      subtasks: [
        {
          id: 2,
          text: "Subtask 1",
          completed: false,
          depth: 1,
          tag: undefined,
          subtasks: [],
        },
      ],
    },
  ];

  // Mock the action
  const action = {
    type: "REMOVE_SUBTASK",
    payload: {
      parentId: 1,
      removeSubtaskId: 2,
    },
  };

  // Call the reducer with the mock data
  const updatedState = todoReducer(initialState, action);

  // Manually update the expected state based on the action
  const expectedState = {
    todos: [
      {
        id: 1,
        text: "Test Todo",
        completed: false,
        depth: 0,
        tag: { tagName: "newTag", priority: "warning" },
        subtasks: [],
      },
    ],
  };
  // Assert that the state is updated as expected
  expect(updatedState).toEqual(expectedState);
});
test("todoReducer removing subtask of subtask", () => {
  // Mock initial state
  const initialState: Todo[] = [
    {
      id: 1,
      text: "Test Todo",
      completed: false,
      depth: 0,
      tag: { tagName: "newTag", priority: "warning" },
      subtasks: [
        {
          id: 2,
          text: "Subtask 1",
          completed: false,
          depth: 1,
          tag: undefined,
          subtasks: [
            {
              id: 3,
              text: "Subtask of subtask 1",
              completed: false,
              depth: 1,
              tag: undefined,
              subtasks: [],
            },
          ],
        },
      ],
    },
  ];

  // Mock the action
  const action = {
    type: "REMOVE_SUBTASK",
    payload: {
      parentId: 2,
      removeSubtaskId: 3,
    },
  };

  // Call the reducer with the mock data
  const updatedState = todoReducer(initialState, action);

  // Manually update the expected state based on the action
  const expectedState = {
    todos: [
      {
        id: 1,
        text: "Test Todo",
        completed: false,
        depth: 0,
        tag: { tagName: "newTag", priority: "warning" },
        subtasks: [
          {
            id: 2,
            text: "Subtask 1",
            completed: false,
            depth: 1,
            tag: undefined,
            subtasks: [],
          },
        ],
      },
    ],
  };
  // Assert that the state is updated as expected
  expect(updatedState).toEqual(expectedState);
});

// const { id, newText } = action.payload;
// return updateTodoItem(state, id, (todo) => ({ ...todo, text: newText }));
// test("todoReducer adds a new todo", () => {
//     const initialState: Todo[] = [];
//     const newTodo: Todo = { id: 1, text: "Test Todo", completed: false, depth: 0, tag:undefined, subtasks: [] };

//     const updatedState = todoReducer(initialState, { type: "ADD_TODO", payload: newTodo });

//     expect(updatedState).toHaveLength(1);
//     expect(updatedState[0]).toEqual(newTodo);
//   });

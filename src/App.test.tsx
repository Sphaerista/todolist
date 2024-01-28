import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { TodoProvider } from "./context/TodoContext";
import { PrimeReactProvider } from "primereact/api";

test("renders learn react link", () => {
  const { getByTestId } = render(
    <PrimeReactProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </PrimeReactProvider>
  );
  const linkElement = screen.getByText(/todoapp/i);
  expect(linkElement).toBeInTheDocument();

  const changeThemeButton = getByTestId("change-theme-button");
  expect(changeThemeButton).toBeInTheDocument();
  fireEvent.click(changeThemeButton);
});

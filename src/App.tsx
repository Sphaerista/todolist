import "./App.css";
import "./index.css";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { PrimeReactContext } from "primereact/api";
import { useContext, useState } from "react";
import { Button } from "primereact/button";

function App() {
  const { changeTheme } = useContext(PrimeReactContext);
  const [theme, setTheme] = useState("dark");

  const changeMyTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    if (changeTheme)
      changeTheme(
        `bootstrap4-${theme}-purple`,
        `bootstrap4-${newTheme}-purple`,
        "app-theme",
        () => setTheme(newTheme)
      );
  };

  return (
    <div className="App">
      <Button
        className={`p-2 rounded ${
          theme === "dark" ? "bg-gray-100 text-black" : "bg-gray-700 text-white"
        }`}
        onClick={() => changeMyTheme()}
      >
        <span
          className={`pr-1 pi pi-${theme === "dark" ? "sun" : "moon"}`}
        ></span>
      </Button>
      <div className="App">
        <h1>todos</h1>
        <Input />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

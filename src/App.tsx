import "./App.css";
import "./index.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
function App() {
  return (
    <div className="App">
      <div className="App">
        <h1>todos</h1>
        <Input />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

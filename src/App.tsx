import "./App.css";
import "./index.css";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { PrimeReactContext } from "primereact/api";
import { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import OpenAI from "openai";

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
  let OPENAI_API_KEY = "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";

  // const openai = new OpenAI({
  //   apiKey,
  //   dangerouslyAllowBrowser: true,
  // });
  // const workPlease = () => {
  //   fetch("https://api.openai.com/v1/chat/completions", {
  //     mode: "no-cors",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "Access-Control-Allow-Origin": "*",
  //       Authorization: "Bearer OPENAI_API_KEY",
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         {
  //           role: "user",
  //           content: "what is the capital of greece?",
  //         },
  //       ],
  //     }),
  //   });
  // async function main() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   console.log(completion.choices[0]);
  // }
  // main();
  // console.log("here");
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: "what is the capital of Russia?",
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        // setResponse(result.choices[0].message.content);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="head">
        <h1>todoapp</h1>
        <div className="btn_theme">
          <Button
            className={`p-2 rounded ${
              theme === "dark"
                ? "bg-gray-100 text-black"
                : "bg-gray-700 text-white"
            }`}
            severity={theme === "dark" ? "secondary" : "warning"}
            onClick={() => changeMyTheme()}
          >
            <span
              className={`pr-1 pi pi-${theme === "dark" ? "moon" : "sun"}`}
            ></span>
          </Button>
        </div>
      </div>
      <div className="App">
        <Input />
        <TodoList />
        {/* <button onClick={workPlease}>AI</button> */}
      </div>
    </div>
  );
}

export default App;

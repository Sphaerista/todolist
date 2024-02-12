import "./App.css";
import "./index.css";
import Input from "./shared/Input";
import TodoList from "./components/TodoList";
import AIUI from "./ai/AIUI";
import { PrimeReactContext } from "primereact/api";
import { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import OpenAI from "openai";
import NewAI from "./ai/newAI";

function App() {
  const { changeTheme } = useContext(PrimeReactContext);
  const [theme, setTheme] = useState("dark");
  const [openChat, setOpentChat] = useState(false);

  const changeMyTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    if (changeTheme)
      changeTheme(
        `bootstrap4-${theme}-purple`,
        `bootstrap4-${newTheme}-purple`,
        "app-theme",
        /* istanbul ignore next */ () => setTheme(newTheme)
      );
  };

  const openChatHandler = () => {
    setOpentChat((prev) => !prev);
  };

  return (
    <div className="App">
      <div className="head">
        <h1>todoapp</h1>
        <div className="btn_theme">
          <Button
            data-testid="change-theme-button"
            className={`${theme === "dark" ? "moon_btn" : "sun_btn"}`}
            // severity={theme === "dark" ? "secondary" : "warning"}
            onClick={() => changeMyTheme()}
          >
            <span
              className={`pr-1 pi pi-${theme === "dark" ? "moon" : "sun"}`}
            ></span>
          </Button>
        </div>
      </div>
      <div className="App-chat">
        <Input />
        <TodoList />
        <div className="class-for-ai-btn">
          <Button
            className="open-chat"
            // icon='pi pi-comment'
            rounded
            size="large"
            onClick={openChatHandler}
          >
            AI
          </Button>
        </div>
      </div>
      {openChat && <AIUI />}
    </div>
  );
}

export default App;

// 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
// let OPENAI_API_KEY = "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";
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

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           // mode: "no-cors",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENAI_API_KEY}`,
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
//           },
//           body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [
//               {
//                 role: "user",
//                 content: "what is the capital of Russia?",
//               },
//             ],
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log(result);
//       setResponse(result.choices[0].message.content);
//     } catch (error) {
//       console.error("There was an error!", error);
//     }
//   };

//   fetchData();
// }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/openai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "user",
//               content: "what is the capital of Russia?",
//             },
//           ],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log(result);
//       // setResponse(result.choices[0].message.content);
//     } catch (error) {
//       console.error("There was an error!", error);
//     }
//   };

//   fetchData();
// }, []);

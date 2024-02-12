import { useState } from "react";

const conversationArr = [
  {
    role: "system",
    content:
      "You are an planning expert giving short answers. Every question should be broken into tasks and if needed into task's subtasks. For example, if there is a question about planning vacation, the answer should explain what are the tasks and microtasks for vacation.",
  },
];
const renderedArr = [{ role: "assistant", content: "What are you planning?" }];

function NewAI() {
  const [responseText, setResponse] = useState(conversationArr);
  const [renderedText, setRenderedText] = useState(renderedArr);
  const [sendText, setSendText] = useState("");
  //   http://localhost:3001/api/openai

  const fetchWorld = async () => {
    try {
      const response = await fetch(
        "https://roaring-paletas-13eae2.netlify.app/.netlify/functions/fetchAI"
      );
      if (!response.ok) {
        throw new Error("error");
      }
      const result = response.json();
      console.log(result);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://roaring-paletas-13eae2.netlify.app/.netlify/functions/fetchAI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   model: "gpt-3.5-turbo",
          //   messages: [
          //     {
          //       role: "user",
          //       content: "what is the capital of greece?",
          //     },
          //   ],
          // }),
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              ...responseText,
              {
                role: "user",
                content: sendText,
              },
            ],
            max_tokens: 100,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result, responseText);
      setResponse((prev) => [...prev, result.reply.choices[0].message]);
      setRenderedText((prev) => [...prev, result.reply.choices[0].message]);
    } catch (error) {
      console.error("There was an error!", error);
    }
    setSendText("");
  };

  const sendHandler = () => {
    setResponse((prev) => [
      ...prev,
      {
        role: "user",
        content: sendText,
      },
    ]);
    setRenderedText((prev) => [
      ...prev,
      {
        role: "user",
        content: sendText,
      },
    ]);
    fetchData();
  };
  const clearHandler = () => {
    setResponse(conversationArr);
    setRenderedText(renderedArr);
  };
  return (
    <>
      <button onClick={clearHandler}>clear</button>
      <input
        type="text"
        value={sendText}
        onChange={(e) => setSendText(e.target.value)}
      />
      <button onClick={sendHandler}>ai</button>
      {/* <button onClick={fetchWorld}>ai</button> */}
      <div>
        {renderedText?.map((item, idx) => (
          <div key={idx}>
            <p>{item.role}</p>
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
}

export default NewAI;

import { useEffect, useRef, useState } from "react";
import "./ai-styles.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const renderedData = [
  { role: "assistant", content: "What are you planning?" },
  { role: "user", content: "build a house" },
  {
    role: "assistant",
    content:
      "Tasks for building a house:\n\n1. Design and Planning\n - Hire an architect or designer\n - Discuss requirements and preferences for the house\n - Develop a preliminary design and floor plan\n - Finalize the design and obtain necessary permits and approvals\n\n2. Site Preparation and Foundation\n - Clear the construction site\n - Level the ground\n - Excavate for the foundation\n - Pour the foundation and let it cure\n\n3. Framing and Structural Work\n",
  },
  { role: "user", content: "how long will it take" },
  {
    role: "assistant",
    content:
      "The duration of building a house can vary depending on various factors, such as the size of the house, complexity of the design, availability of labor and materials, weather conditions, and the efficiency of the construction process. Generally, it can take anywhere from several months to over a year to complete a house.",
  },
  { role: "user", content: "what tools do i need?" },
  {
    role: "assistant",
    content:
      "The tools you will need for building a house can vary depending on the specific tasks involved in the construction process. Here are some basic tools that are commonly used:\n\n1. Measuring and Layout Tools:\n - Tape measure\n - Level\n - Square\n - Chalk line\n\n2. Cutting and Shaping Tools:\n - Circular saw\n - Handsaw\n - Jigsaw or reciprocating saw\n - Miter saw or chop saw\n\n3. Fastening",
  },
];

export default function App() {
  const conversationArr = [
    {
      role: "system",
      content:
        "You are an planning expert giving short answers. Every question should be broken into tasks and if needed into task's subtasks. For example, if there is a question about planning vacation, the answer should explain what are the tasks and microtasks for vacation.",
    },
  ];
  const renderedArr = [
    { role: "assistant", content: "What are you planning?" },
  ];

  // let KEY = "";
  const [responseText, setResponse] = useState(conversationArr);
  const [renderedText, setRenderedText] = useState(renderedData);
  const [sendText, setSendText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  // fetch
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://roaring-paletas-13eae2.netlify.app/.netlify/functions/fetchAI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

  const sendHandler = (e: any) => {
    e.preventDefault();
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
  console.log(responseText);

  const loadHandl = () => {
    setIsLoading(true);
  };
  const loadHandlStop = () => {
    setIsLoading(false);
  };
  return (
    <>
      <main>
        <section className="chatbot-container">
          <div className="chatbot-header">
            {/* testing spinner */}
            <Button severity="info" label="loading" onClick={loadHandl} />
            <Button
              severity="info"
              label="stop loading"
              onClick={loadHandlStop}
            />
            {/* testing spinner */}
            <Button severity="danger" onClick={clearHandler}>
              Clear
            </Button>
          </div>
          <div
            className="chatbot-conversation-container"
            id="chatbot-conversation"
          >
            <div className="speech speech-ai">
              {renderedText?.map((item, idx) => (
                <div className={`speech-${item.role}`} key={idx}>
                  {item.content}
                </div>
              ))}
            </div>
            {isLoading && (
              <div className="loader">
                <div className="snippet" data-title="dot-flashing">
                  <div className="stage">
                    <div className="dot-flashing"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={divRef} />
          </div>
          <form id="form" className="chatbot-input-container">
            <InputText
              className="user-input"
              name="user-input"
              type="text"
              id="user-input"
              required
              value={sendText}
              onChange={(e) => setSendText(e.target.value)}
            />
            <Button
              icon={"pi pi-send"}
              id="submit-btn"
              className="submit-btn"
              onClick={sendHandler}
            ></Button>
          </form>
        </section>
      </main>
    </>
  );
}

{
  /* <div className="App">
        <h1>Hello CodeSandbox</h1>
        <button onClick={clearHandler}>clear</button>
        <input
          type="text"
          value={sendText}
          onChange={(e) => setSendText(e.target.value)}
        />
        <button onClick={sendHandler}>ai</button>
        <button onClick={() => {}}>ai</button>
        <div>
          {renderedText.map((item, idx) => (
            <div key={idx}>
              <p>{item.role}</p>
              {item.content}
            </div>
          ))}
        </div>
      </div> */
}
// how to clean the room in three steps?
// useEffect(() => {
// const fetchData = async () => {
//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: conversationArr
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result = await response.json();
//     setResponse(result.choices[0].message.content);
//     console.log(result.choices[0].message.content);
//   } catch (error) {
//     console.error("There was an error!", error);
//   }
// };

// fetchData();
// }, []);

import express, { json } from "express";
import fetch from "node-fetch";
// import cors from "cors";
const app = express();
// const port = 3001;

app.use(json());
// app.use(cors());
let OPENAI_API_KEY = "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";

app.post("/api/openai", async (req, res) => {
  //   console.log(req.body);
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      //   body: JSON.stringify(req.body),
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "what is the capital of greece?",
          },
        ],
        max_tokens: 100,
      }),
    });

    const responseText = await response.text();
    console.log(responseText);
    const result = await response.json();
    // console.log(result);
    res.json(result);
  } catch (error) {
    console.error("There was an error!", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

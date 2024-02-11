let OPENAI_API_KEY = "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";
const fetchData = async () => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      //    body: JSON.stringify(body)
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "what is the capital of greece",
          },
        ],
      }),
    });
    const responseText = await response.json();
    console.log(responseText);

    // return res.json(responseText);
  } catch (error) {
    console.error("There was an error!", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

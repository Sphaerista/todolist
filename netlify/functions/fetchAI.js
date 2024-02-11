const handler = async () => {
  let OPENAI_API_KEY = "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";
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: responseText,
      }),
    };
  } catch (error) {
    console.error("There was an error!", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { handler };

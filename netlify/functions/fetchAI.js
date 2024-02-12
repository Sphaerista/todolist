const handler = async (req) => {
  console.log(req);
  let KEY = "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";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify(req.body),
      // body: JSON.stringify({
      //   model: "gpt-3.5-turbo",
      //   messages: [
      //     {
      //       role: "user",
      //       content: "what is the capital of greece",
      //     },
      //   ],
      // }),
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

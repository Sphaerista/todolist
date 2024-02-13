const handler = async (req) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KEY}`,
      },
      body: req.body,
    });
    const responseText = await response.json();

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

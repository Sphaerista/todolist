const handler = async () => {
  try {
    const subject = "world";
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `hello ${subject}` }),
    };
  } catch (error) {
    return { statusCode: 0, body: error.toString() };
  }
};
module.exports = { handler };

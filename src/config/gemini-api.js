export async function getGeminiResponse(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API key for Gemini is not set in environment variables.");
    return "Error: API key is missing. Please configure your .env file.";
  }

  const model = "gemini-1.5-flash-latest";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.7,
      topP: 0.95,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Error:", errorData);
      return `Error: ${res.status} ${res.statusText}. See console for details.`;
    }

    const data = await res.json();

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("Fetch Error:", error);
    return "Error: Could not connect to the API. Please check your network connection.";
  }
}

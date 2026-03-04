require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ─── Code Execution (JDoodle) ────────────────────────────────────────────────
app.post("/execute", async (req, res) => {
  const { script, stdin } = req.body;
  const program = {
    script,
    language: "cpp",
    versionIndex: "5",
    stdin: stdin || "",
    clientId: "8cace9e01420dd8fc831d625909e7601",
    clientSecret: "ec38e848bc7f7f3ee9d006235be5f234753e1574caf79d36076bfd85d3820252",
  };
  try {
    const response = await axios.post("https://api.jdoodle.com/v1/execute", program);
    res.json(response.data);
  } catch (error) {
    const status = error.response?.status;
    if (status === 429) {
      res.status(200).json({ output: "⚠️ JDoodle daily limit reached. The free plan allows 200 runs/day. Try again tomorrow or upgrade your JDoodle plan." });
    } else if (status === 401 || status === 403) {
      res.status(200).json({ output: "⚠️ JDoodle authentication failed. Check your clientId and clientSecret in server.js." });
    } else if (!error.response) {
      res.status(200).json({ output: "⚠️ Could not reach JDoodle API. Check your internet connection." });
    } else {
      console.error("JDoodle Error:", error.message);
      res.status(200).json({ output: `⚠️ JDoodle error: ${error.message}` });
    }
  }
});

// ─── AI: Explain Code ────────────────────────────────────────────────────────
app.post("/ai/explain", async (req, res) => {
  const { code, levelTitle, levelDesc } = req.body;
  if (!code || code.trim().length === 0) {
    return res.status(400).json({ error: "No code provided." });
  }
  try {
    const prompt = `You are a friendly C++ tutor helping a beginner student on a coding platform called CodeTusker.

The student is working on: "${levelTitle}"
Problem description: ${levelDesc}

Here is their C++ code:
\`\`\`cpp
${code}
\`\`\`

Please explain this code clearly and concisely:
1. What the code does overall
2. Key lines or logic explained simply
3. Any improvements or tips (if any)

Keep the explanation beginner-friendly and encouraging. Use markdown formatting.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ explanation: text });
  } catch (error) {
    console.error("Gemini explain error:", error.message);
    res.status(500).json({ error: "AI explanation failed. Check your Gemini API key." });
  }
});

// ─── AI: Analyze Error ───────────────────────────────────────────────────────
app.post("/ai/analyze-error", async (req, res) => {
  const { code, output, expected, levelDesc } = req.body;
  try {
    const prompt = `You are a helpful C++ debugging assistant on a coding platform called CodeTusker.

The student is working on this problem: ${levelDesc}

Their C++ code:
\`\`\`cpp
${code}
\`\`\`

Their code produced this output:
\`\`\`
${output}
\`\`\`

But the expected output is:
\`\`\`
${expected}
\`\`\`

Please help the student understand:
1. What went wrong (explain the bug clearly)
2. Why the output doesn't match
3. A specific hint on how to fix it (don't give the full solution)

Be encouraging, concise, and use markdown formatting.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ analysis: text });
  } catch (error) {
    console.error("Gemini error analysis error:", error.message);
    res.status(500).json({ error: "AI error analysis failed. Check your Gemini API key." });
  }
});

// ─── AI: Chat ────────────────────────────────────────────────────────────────
app.post("/ai/chat", async (req, res) => {
  const { message, history } = req.body;
  try {
    const chat = model.startChat({
      history: (history || []).map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      generationConfig: { maxOutputTokens: 1024 },
    });

    const systemContext = `You are a helpful C++ coding assistant on CodeTusker, a platform for learning C++. 
Answer questions about C++ programming, data structures, algorithms, and debugging. 
Keep answers concise and beginner-friendly. Use markdown formatting and code blocks where helpful.

User question: ${message}`;

    const result = await chat.sendMessage(systemContext);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini chat error:", error.message);
    res.status(500).json({ error: "AI chat failed. Check your Gemini API key." });
  }
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
  console.log("🤖 Gemini AI endpoints ready: /ai/explain, /ai/analyze-error, /ai/chat");
});

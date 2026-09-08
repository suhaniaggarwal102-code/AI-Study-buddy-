const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/', (req, res) => {
  res.json({
    message: 'AI Study Buddy Backend is Running'
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const response = await client.responses.create({
  model: 'gpt-5.6-luna',

  instructions: `
    You are AI Study Buddy.
    Answer student questions clearly and briefly.
    Explain in simple language.
    Give examples only when useful.
  `,

  input: message,

  max_output_tokens: 500
});

    res.json({
      success: true,
      reply: response.output_text
    });

  } catch (error) {
    console.error('AI Error:', error);

    res.status(500).json({
      success: false,
      error: error.message || 'AI response failed'
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`AI Backend running at http://localhost:${PORT}`);
});
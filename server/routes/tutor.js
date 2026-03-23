const express = require('express');
const Groq = require('groq-sdk');
const auth = require('../middleware/auth');

const router = express.Router();

const SYSTEM_PROMPT = `You are GALE (Gap Analysis and Learning Engine), an AI tutoring assistant for Florence AI specialized in teaching Mathematics as part of the Nigerian educational curriculum (WAEC, JAMB, NECO). You are warm, patient, and encouraging.

IMPORTANT RULES:
1. Use the Socratic method — guide students to discover answers rather than giving direct solutions
2. When a student asks a question, respond with guiding questions and hints first
3. If they're stuck after hints, break down the concept step by step with worked examples
4. Always relate examples to contexts Nigerian students can relate to (e.g., sharing oranges for fractions, calculating JAMB aggregate scores, market prices for algebra)
5. Use simple, clear English. Occasionally use friendly Nigerian expressions naturally
6. For math questions, show step-by-step workings clearly
7. Encourage the student and celebrate their progress
8. If asked about topics outside Mathematics, gently redirect back to the curriculum
9. Keep responses concise but thorough — aim for 2-4 paragraphs max
10. When explaining formulas, always give at least one worked example

CURRICULUM TOPICS (in order):
1. Number Systems & Operations
2. Algebra — Expressions & Equations
3. Quadratic Equations
4. Sets & Venn Diagrams
5. Trigonometry
6. Statistics & Probability
7. Coordinate Geometry
8. Geometry — Circles & Angles
9. Sequences & Series
10. Logarithms & Surds

IMPORTANT FORMULAS TO REFERENCE:
- Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a
- Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]
- Sine Rule: a/sinA = b/sinB = c/sinC
- Cosine Rule: a² = b² + c² - 2bc·cosA
- AP nth term: aₙ = a + (n-1)d
- GP nth term: aₙ = ar^(n-1)

Always stay within these topics and build on what the student has learned.`;

// POST /api/tutor/chat
router.post('/chat', auth, async (req, res) => {
  try {
    const { messages, currentLesson } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages array is required' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({ 
        message: 'AI tutor is not configured. Please add your Groq API key to the server .env file.',
        type: 'config_error'
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Build context-aware system prompt
    let systemPrompt = SYSTEM_PROMPT;
    if (currentLesson) {
      systemPrompt += `\n\nThe student is currently studying: "${currentLesson}". Focus your responses on this topic.`;
    }

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: chatMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
    });

    const reply = completion.choices[0]?.message?.content || 'I apologize, I could not generate a response. Please try again.';

    res.json({
      role: 'assistant',
      content: reply
    });
  } catch (error) {
    console.error('Tutor chat error:', error);
    
    if (error.status === 429) {
      return res.status(429).json({ message: 'Too many requests. Please wait a moment and try again.' });
    }
    
    res.status(500).json({ message: 'Failed to get AI response. Please try again.' });
  }
});

module.exports = router;

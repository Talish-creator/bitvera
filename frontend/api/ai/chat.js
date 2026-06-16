import Groq from 'groq-sdk';
import clientPromise from '../../lib/db.js';

// Vercel serverless function configuration
// No need to export default function req, res in Next.js, but for bare Vercel we use module.exports
// Wait, Vercel supports ESM but usually it's `export default async function handler(req, res)`
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, session_id } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME || 'test_database');
    const historyCollection = db.collection('chat_histories');

    // Fetch existing history for this session
    let history = await historyCollection.findOne({ session_id: session_id || 'default' });
    let messages = [];

    if (history && history.messages) {
      messages = history.messages;
    } else {
      messages = [
        {
          role: 'system',
          content: 'You are a helpful and professional AI assistant for Bitvera, a software development and digital agency. You help users with their inquiries about Bitvera services. Keep answers concise, helpful, and professional.'
        }
      ];
    }

    // Add new user message
    messages.push({ role: 'user', content: text });

    // Call Groq AI
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    // Add AI response to history
    messages.push({ role: 'assistant', content: aiResponse });

    // Save back to DB
    await historyCollection.updateOne(
      { session_id: session_id || 'default' },
      { 
        $set: { 
          messages,
          updated_at: new Date()
        },
        $setOnInsert: { created_at: new Date() }
      },
      { upsert: true }
    );

    return res.status(200).json({
      response: aiResponse,
      session_id: session_id || 'default'
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

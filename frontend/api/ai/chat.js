import Groq from 'groq-sdk';
import clientPromise from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, session_id } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.warn("GROQ_API_KEY is missing!");
      return res.status(500).json({ error: 'AI API Key not configured' });
    }

    const groq = new Groq({ apiKey: groqApiKey });

    let messages = [];
    let historyCollection = null;

    try {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      historyCollection = db.collection('chat_histories');

      // Fetch existing history
      let history = await historyCollection.findOne({ session_id: session_id || 'default' });
      if (history && history.messages) {
        messages = history.messages;
      }
    } catch (dbError) {
      console.warn("Database connection skipped for chat. Proceeding without history.", dbError.message);
    }

    if (messages.length === 0) {
      messages = [
        {
          role: 'system',
          content: 'You are a helpful and professional AI assistant for Bitvera, a software development and digital agency. You help users with their inquiries about Bitvera services. Keep answers concise, helpful, and professional.'
        }
      ];
    }

    messages.push({ role: 'user', content: text });

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    messages.push({ role: 'assistant', content: aiResponse });

    if (historyCollection) {
      try {
        await historyCollection.updateOne(
          { session_id: session_id || 'default' },
          { 
            $set: { messages, updated_at: new Date() },
            $setOnInsert: { created_at: new Date() }
          },
          { upsert: true }
        );
      } catch (saveError) {
        console.warn("Failed to save history to DB.", saveError.message);
      }
    }

    return res.status(200).json({
      response: aiResponse,
      session_id: session_id || 'default'
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

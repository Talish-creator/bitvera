import Groq from 'groq-sdk';
import clientPromise from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, session_id, context = {} } = req.body;
    
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

      let history = await historyCollection.findOne({ session_id: session_id || 'default' });
      if (history && history.messages) {
        messages = history.messages;
      }
    } catch (dbError) {
      console.warn("Database connection skipped for chat. Proceeding without history.", dbError.message);
    }

    // Always re-inject the system prompt with the latest context to ensure the AI knows exactly what page the user is on right now.
    const systemPrompt = `You are the official AI Assistant for BitVera IT Solutions, a premium software development and digital agency based in Riyadh, Saudi Arabia.
Your goal is to help users understand our services, answer their questions, and guide them to book a consultation.

**Company Knowledge Base:**
- **Services:** ERPNext Implementation, CRM Integration, Custom Software Development, Business Process Automation.
- **Key Strengths:** ZATCA Phase 2 E-Invoicing Compliance, 95% Success Rate, 30-Day Setup.
- **Contact:** +966 58 060 8336 | info@bitvera.com
- **Partners:** ZATCA, AWS, Microsoft, Google Cloud, SAP, Oracle, IBM, Salesforce, Frappe.

**Current User Context:**
- The user is currently browsing this page: ${context.url || 'Home Page'}
- The user's interface language is set to: ${context.language === 'ar' ? 'Arabic' : 'English'}

**Instructions for you:**
1. Always respond in the language the user is speaking to you. If they speak Arabic, reply in Arabic. If English, reply in English.
2. Be concise, professional, and friendly. Do not write massive essays. Break your answers down into easily readable bullet points or short paragraphs.
3. Use Markdown formatting (**bold**, *italics*, bullet points) to structure your response beautifully.
4. If they ask about pricing, mention we offer Competitive Pricing tailored to their exact business needs and encourage them to book a demo.
5. If they ask for contact info, provide the phone number and email prominently.
`;

    if (messages.length > 0 && messages[0].role === 'system') {
      messages[0].content = systemPrompt; // Update existing system prompt with fresh context
    } else {
      messages.unshift({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: text });

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
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

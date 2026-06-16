import clientPromise from '../../../../lib/db.js';

export default async function handler(req, res) {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME || 'test_database');
    const historyCollection = db.collection('chat_histories');

    if (req.method === 'GET') {
      const history = await historyCollection.findOne({ session_id });
      return res.status(200).json({ 
        history: history ? history.messages : [] 
      });
    } else if (req.method === 'DELETE') {
      await historyCollection.deleteOne({ session_id });
      return res.status(200).json({ 
        success: true, 
        message: 'History cleared successfully' 
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Chat history error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

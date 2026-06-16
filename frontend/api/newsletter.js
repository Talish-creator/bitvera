import clientPromise from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, name, preferences } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      const newsletterCollection = db.collection('newsletter_subscribers');

      const existing = await newsletterCollection.findOne({ email });
      if (existing) {
        return res.status(400).json({ error: 'Email already subscribed' });
      }

      const subscriber = {
        email,
        name,
        preferences,
        active: true,
        subscribed_at: new Date()
      };

      const result = await newsletterCollection.insertOne(subscriber);
      
      return res.status(200).json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        subscriber_id: result.insertedId
      });
    } catch (error) {
      console.error('Newsletter error:', error);
      return res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      const newsletterCollection = db.collection('newsletter_subscribers');

      const subscribers = await newsletterCollection.find({}).sort({ subscribed_at: -1 }).toArray();
      
      return res.status(200).json({ subscribers });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

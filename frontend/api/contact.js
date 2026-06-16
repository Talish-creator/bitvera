import clientPromise from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, company, project_type, budget, message, phone } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
      }

      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      const contacts = db.collection('contacts');

      const contact = {
        name,
        email,
        company,
        project_type,
        budget,
        message,
        phone,
        status: 'new',
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await contacts.insertOne(contact);
      
      return res.status(200).json({
        success: true,
        message: 'Contact request submitted successfully',
        contact_id: result.insertedId
      });
    } catch (error) {
      console.error('Contact error:', error);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      const contacts = db.collection('contacts');

      const allContacts = await contacts.find({}).sort({ created_at: -1 }).toArray();
      
      return res.status(200).json({ contacts: allContacts });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

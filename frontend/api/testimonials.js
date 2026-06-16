import clientPromise from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      const testimonialsCollection = db.collection('testimonials');

      const testimonials = await testimonialsCollection
        .find({ approved: true })
        .sort({ created_at: -1 })
        .limit(100)
        .toArray();
      
      return res.status(200).json({ testimonials });
    } catch (error) {
      console.error('Testimonial error:', error);
      return res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, company, role, content, rating, avatar, approved } = req.body;
      
      if (!name || !content || !rating) {
        return res.status(400).json({ error: 'Name, content, and rating are required' });
      }

      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      const testimonialsCollection = db.collection('testimonials');

      const testimonial = {
        name,
        company,
        role,
        content,
        rating,
        avatar,
        approved: approved !== undefined ? approved : false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await testimonialsCollection.insertOne(testimonial);
      
      return res.status(200).json({
        success: true,
        message: 'Testimonial created successfully',
        testimonial_id: result.insertedId
      });
    } catch (error) {
      console.error('Testimonial error:', error);
      return res.status(500).json({ error: 'Failed to create testimonial' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

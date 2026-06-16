import Stripe from 'stripe';
import clientPromise from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;
    
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME || 'test_database');
    const transactions = db.collection('payment_transactions');

    const existingTransaction = await transactions.findOne({ session_id, payment_status: 'paid' });
    if (existingTransaction) {
      return res.status(200).json({ 
        status: 'complete', 
        payment_status: 'paid', 
        message: 'Payment already processed' 
      });
    }

    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    await transactions.updateOne(
      { session_id },
      { 
        $set: { 
          status: session.status,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency
        } 
      }
    );

    return res.status(200).json({
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata
    });
  } catch (error) {
    console.error('Status error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

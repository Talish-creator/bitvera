import Stripe from 'stripe';
import clientPromise from '../../lib/db.js';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_API_KEY);
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    
    // Warning: for production, STRIPE_WEBHOOK_SECRET must be set.
    // If not set, we'll try to process without signature verification (not recommended).
    let event;
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      event = JSON.parse(buf.toString());
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME || 'test_database');
      const transactions = db.collection('payment_transactions');

      await transactions.updateOne(
        { session_id: session.id },
        { 
          $set: { 
            payment_status: 'paid',
            status: 'complete',
            event_id: event.id
          } 
        }
      );
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

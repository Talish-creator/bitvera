import Stripe from 'stripe';
import clientPromise from '../../lib/db.js';

const PRICING_PACKAGES = {
  "startup_accelerator": {
    "id": "startup_accelerator",
    "name": "Startup Accelerator",
    "monthly_price": 2999,
    "annual_price": 29990,
    "currency": "USD"
  },
  "enterprise_scale": {
    "id": "enterprise_scale",
    "name": "Enterprise Scale",
    "monthly_price": 4999,
    "annual_price": 49990,
    "currency": "USD"
  },
  "digital_transformation": {
    "id": "digital_transformation",
    "name": "Digital Transformation",
    "monthly_price": 7999,
    "annual_price": 79990,
    "currency": "USD"
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { package_id, payment_type, billing_period, email, metadata, origin_url } = req.body;

    if (!PRICING_PACKAGES[package_id]) {
      return res.status(400).json({ error: 'Invalid package ID' });
    }

    const pkg = PRICING_PACKAGES[package_id];
    let amount = 0;
    
    if (payment_type === 'subscription') {
      amount = billing_period === 'monthly' ? pkg.monthly_price : pkg.annual_price;
    } else {
      amount = pkg.monthly_price; // fallback
    }

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: pkg.currency.toLowerCase(),
            product_data: {
              name: pkg.name,
            },
            unit_amount: amount * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin_url || 'https://bitvera.co'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin_url || 'https://bitvera.co'}/payment/cancel`,
      customer_email: email,
      metadata: {
        package_id,
        payment_type,
        billing_period,
        ...metadata
      }
    });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME || 'test_database');
    const transactions = db.collection('payment_transactions');

    await transactions.insertOne({
      session_id: session.id,
      package_id,
      package_name: pkg.name,
      payment_type,
      billing_period,
      amount,
      currency: pkg.currency,
      payment_status: 'pending',
      status: 'initiated',
      metadata,
      email
    });

    return res.status(200).json({
      success: true,
      checkout_url: session.url,
      session_id: session.id
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

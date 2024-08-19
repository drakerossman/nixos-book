const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // price: 'price_1PoQDWP5b98TWJFkQxQWIsWf', // sandbox
            price: 'price_1PotZkP5b98TWJFkXc8Fdevp', // production
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: {enabled: true},
        // discounts: [{ coupon: 'sSn4QnWL' }], // sandbox
        discounts: [{ coupon: 'YlAbu2Yl' }], // production
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

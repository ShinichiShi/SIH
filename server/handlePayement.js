const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const CLIENT_PORT = process.env.CLIENT_PORT;

const handlePayment = async(req,res)=>{
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: `${req.body.product}`,
              },
              unit_amount:3000*100 //Number(req.body.total_amount)*100, // Price in paisa, must be atleast greater than Rs300
            },
            quantity: 1,
          },
        ],
        success_url: `http://localhost:${CLIENT_PORT}/chat`,
        cancel_url: `http://localhost:${CLIENT_PORT}/login`,
      });
    
      res.json({ id: session.id });
}

module.exports = {handlePayment};
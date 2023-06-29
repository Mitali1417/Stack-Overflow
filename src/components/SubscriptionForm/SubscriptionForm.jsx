import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import "./Subscription.css"

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const SubscriptionForm = () => {
  const [plan, setPlan] = useState('free');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: `PRICE_ID_FOR_${plan.toUpperCase()}` }],
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });
    setIsLoading(false);
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className='sub-question'>
    <div className='container1'>
      <h2>Choose a subscription plan</h2>
      <div>
        <label>
          <input type="radio" value="free" checked={plan === 'free'} onChange={handlePlanChange} />
          Free plan - 1 question per day
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="silver" checked={plan === 'silver'} onChange={handlePlanChange} />
          Silver plan - ₹100/month, 5 questions per day
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="gold" checked={plan === 'gold'} onChange={handlePlanChange} />
          Gold plan - ₹1000/month, unlimited questions
        </label>
      </div>
      <button onClick={handlePayment} disabled={isLoading} className='sub-btn'>
        {isLoading ? 'Processing...' : 'Subscribe'}
      </button>
    </div>
    </div>
  );
};

export default SubscriptionForm;

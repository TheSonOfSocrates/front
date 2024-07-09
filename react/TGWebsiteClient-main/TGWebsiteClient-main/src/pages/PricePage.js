import { Helmet } from 'react-helmet-async';
import PricePanel from '../sections/price/PricePanel';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_API_KEY } from '../config-global';

const stripe = loadStripe(STRIPE_API_KEY);

export default function AboutPage() {

  return (
    <>
      <Helmet>
        <title> Price | TG</title>
      </Helmet>

      <Elements stripe={stripe}>
        <PricePanel />
      </Elements>

    </>
  );
}

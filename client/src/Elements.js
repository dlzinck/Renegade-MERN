import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51L2NgSI68014kvfXocZ6PEsIxy8RWIl6ADWv9BWFoBUhYM4sGt7q5ffn7jZlsPMTYbkP3F3ClD1ZMjUkZ0tMgfIY00Pqc6TskR');

function App() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};
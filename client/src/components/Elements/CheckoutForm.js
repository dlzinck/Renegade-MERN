import {useStripe, useElements, PaymentElement, CardElement , CardNumberElement , CardExpiryElement , CardCvcElement} from '@stripe/react-stripe-js';
import { useStoreContext } from "../../utils/GlobalState";
// import { model } from 'mongoose';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "https://renegadeattire.com/congrats",
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <CardElement />
            <CardNumberElement />
            <CardExpiryElement />
            <CardCvcElement />

            <button disabled={!stripe}>Submit</button>
        </form>
    );
};

export default CheckoutForm;
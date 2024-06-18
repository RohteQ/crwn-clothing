import {useState,useEffect} from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import {selectCartTotal} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector';
import  {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { PaymentFormContainer,FormContainer, PaymentButton } from "./payment-form.styles";
import { Alert } from '@mui/material';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements(); 
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    
    useEffect(() => {
        if (paymentError || paymentSuccess) {
            const timer = setTimeout(() => {
                setPaymentError(null);
                setPaymentSuccess(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [paymentError, paymentSuccess]);
    
    const paymentHandler = async(e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);
        
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json());
        const {paymentIntent: {client_secret}} = response;


        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method:{
                card: elements.getElement(CardElement),
                billing_details:{
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });
        
        setIsProcessingPayment(false);

        
        if(paymentResult.error){
           setPaymentError(paymentResult.error.message);
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){ 
                setPaymentSuccess('Payment succeeded!');
            }
        }
    };
    
    return( 
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement/>
                {paymentError && <Alert 
                    variant="outlined" 
                    severity="error" 
                    style={{backgroundColor: 'white'}}>
                    {paymentError}
                        </Alert>}
                {paymentSuccess && <Alert 
                    variant="outlined" 
                    severity="success"
                    style={{backgroundColor: 'white'}}>
                    {paymentSuccess}
                        </Alert>}
                <PaymentButton isLoading = { isProcessingPayment} 
                buttonType={BUTTON_TYPE_CLASSES.ButtonSpinner}>
                    Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm
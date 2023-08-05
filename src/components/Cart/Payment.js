import React from 'react';
import { Fragment } from 'react';
import MetaData from '../Layout/MetaData/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { Typography } from '@mui/material';

import "./payment.css";
import { CreditCard, Event, VpnKey } from '@mui/icons-material';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import { createOrder } from '../../actions/orderAction';

const Payment = ({ stripeApiKey }) => {
 
     

    // console.log(stripeApiKey)
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const stripe = useStripe();
    // console.log(stripe);
    const elements = useElements();
    const navigate = useNavigate()

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    console.log(shippingInfo);
    const paymentData = {
        amount: Math.round(orderInfo?.totalPrice * 100),
    };
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice:orderInfo?.subtotal,
        taxPrice: orderInfo?.tax,
        shippingPrice: orderInfo?.shippingPrice,
        totalPrice: orderInfo?.totalPrice,
        // phoneNumber:orderInfo?.setPhoneNumber,

    };




    const submitHandler = async (e) => {

        e.preventDefault();
        payBtn.current.disable = true;
        try {
            const config = {
                headers: {
                    // Authorization: `Bearer ${stripeApiKey}`,
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/api/v1/payment/process",
                paymentData,
                config
            );
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                        address: {
                            line1: shippingInfo?.address,
                            city: shippingInfo?.city,
                            state: shippingInfo?.state,
                            postal_code: shippingInfo?.pinCode,
                            country: shippingInfo?.country
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disable = false;
                toast.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    // set order on database 
                    dispatch(createOrder(order))
                    navigate("/success");
                } else {
                    toast.warn("There's some issue while processing payment");
                }
            }
        } catch (error) {
            payBtn.current.disable = false;
            toast.error(error.response.data.message);
        }
    }
    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form
                    className='paymentForm'
                    onSubmit={(e) => submitHandler(e)}
                >
                    <Typography> Card Info </Typography>
                    <div>
                        <CreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <Event />
                        <CardExpiryElement className='paymentInput' />

                    </div>
                    <div>
                        <VpnKey />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input
                        type='submit'
                        value={`Pay ${orderInfo && orderInfo?.totalPrice}`}
                        ref={payBtn}
                        className='paymentFormBtn'
                    >

                    </input>
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;
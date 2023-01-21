import React, { useState, useEffect } from "react";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Checkoutproduct from "./Checkoutproduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [succeeded, setsucceeded] = useState(false);
  const [processing, setprocessing] = useState("");
  const [error, seterror] = useState(null);
  const [disabled, setdisabled] = useState(true);
  const [clientsecret, setclientsecret] = useState(true);

  useEffect(() => {
    const getclientsecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,  //check here incase o any problem................................
      });
      setclientsecret(response.data.clientsecret);
    };
    getclientsecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientsecret);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setprocessing(true);

    const payload = await stripe
      .confirmCardPayment(clientsecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({paymentIntent}) => {
        // paymentIntent = payment confirmation
          
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setsucceeded(true);
        seterror(null);
        setprocessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      }).catch((e)=>console.log('have kbr padi ke error aai'));       //check here also in problem....................
  };

  const handlechange = (e) => {
    //display the changes in the carelelment and if display error if customer create in their card details
    setdisabled(e.empty);
    seterror(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* {payment section-delivery address} */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React street</p>
            <p>Los angeles,CA</p>
          </div>
        </div>

        {/* {payment-section-actual items} */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <Checkoutproduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* {payment section-payment method} */}
        <div className="payment_section">
          <div className="payment_title">
            {/* stripe payment gateway goes here */}
            <h3>Payment method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handlesubmit}>
              <CardElement onChange={handlechange} />

              <div className="payment_pricecontainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}                     ///check here also...........................
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>processing</p> : <p>Buy Now</p>}</span>
                </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

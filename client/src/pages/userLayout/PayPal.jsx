import React, { useEffect, useRef } from "react";

const PayPal = ({ chosenTimePeriods }) => {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder,
        onApprove: (data, actions) => {
          return actions.order.capture().then(function (orderData) {
            // Successful capture! For dev/demo purposes:];
            alert(
              `Transaction was complete by ${orderData.payer.name.given_name}`
            );
            // When ready to go live, remove the alert and show a success message within this page. For example:
            // const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
          });
        },
      })
      .render(paypal.current);
  }, []);

  useEffect(() => {}, [chosenTimePeriods]);

  const createOrder = () => {
    return fetch("/processPayPalOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chosenTimePeriods }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ id }) => {
        return id;
      })
      .catch(({ error }) => console.log(error));
  };

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PayPal;

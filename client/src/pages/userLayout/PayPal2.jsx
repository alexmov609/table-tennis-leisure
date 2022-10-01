import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { corsMaker } from "../../data/dummy";

//Paypal buttons
function PayPal2({ chosenTimePeriods }) {
  const createOrder = () => {
    return fetch(
      process.env.REACT_APP_PROCESS_PAY_PAL_ORDER,
      corsMaker({
        method: "POST",
        body: { chosenTimePeriods },
      })
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ id }) => {
        return id;
      })
      .catch(({ error }) => {
        console.log(error);
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (captureData) {
      // Successful capture! For dev/demo purposes:];
      alert(`Transaction was complete by ${captureData.payer.name.given_name}`);
      console.log(captureData);
      // When ready to go live, remove the alert and show a success message within this page. For example:
      // const element = document.getElementById('paypal-button-container');
      // element.innerHTML = '<h3>Thank you for your payment!</h3>';
      // Or go to another URL:  actions.redirect('thank_you.html');
    });
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AS0OqNuRZFR0b-cAkF0yAexH3YMgbHEtKuS9AaKYtB-h07u9ClmjsBA5fApUg9eoI_452u3ytMPaSjhh",
        currency: "ILS",
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        forceReRender={[chosenTimePeriods]}
      />
    </PayPalScriptProvider>
  );
}

export default PayPal2;

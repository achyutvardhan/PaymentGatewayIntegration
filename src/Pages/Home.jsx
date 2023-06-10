import React from "react";
import "./Home.css";
import ph from "../assets/download.jpg";
import axios from "axios";
export default function Home() {
  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadscript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("razorpay sdk failed to load are you offline?");
      return;
    }
    const result = await axios.post("http://localhost:8080/payment/orders");
    if (!result) {
      alert("server is offline");
      return;
    }
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_iKeJwRRYd7XA1L",
      amount: amount.toString(),
      currency: currency,
      name: "borono corp.",
      description: "Test Transaction",
      image: { ph },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:8080/payment/success",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: "achyut vardhan",
        email: "achyutvardhan234@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "bhagalpur",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <h1>This is simple integration of payment gateway</h1>
      <div className="external-container">
        <div className="internal-container">
          <div className="product-ex">
            <div className="product-int">
              <div className="image">
                <img src={ph} alt="" />
              </div>
              <div className="price">Rs10</div>
              <button onClick={displayRazorpay}>buy</button>
            </div>
          </div>

          <div className="product-ex">
            <div className="product-int">
              <div className="image">
                <img src={ph} alt="" />
              </div>
              <div className="price"> Rs10</div>
              <button onClick={displayRazorpay}>buy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

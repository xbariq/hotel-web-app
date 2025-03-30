import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [customerId, setCustomerId] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [stayType, setStayType] = useState<string>("booking"); // default is booking
  const [stayId, setStayId] = useState<number | "">("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId || !amount || !paymentMethod || !stayId) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const paymentData = {
        customer_id: customerId,
        amount,
        payment_method: paymentMethod,
        stay_type: stayType,
        stay_id: stayId,
      };

      // Make the API request to insert the payment and update the stay type
      const response = await axios.post(
        "http://localhost:3000/payments",
        paymentData
      );

      console.log("Payment processed:", response.data);
      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Error processing payment", error);
      alert("Error processing payment");
    }
  };

  return (
    <div>
      <h3>Process Payment</h3>
      <form onSubmit={handlePayment}>
        <div>
          <label>Customer ID:</label>
          <input
            type="number"
            value={customerId || ""}
            onChange={(e) => setCustomerId(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div>
          <label>Stay Type:</label>
          <select
            value={stayType}
            onChange={(e) => setStayType(e.target.value)}
          >
            <option value="booking">Booking</option>
            <option value="renting">Renting</option>
          </select>
        </div>
        <div>
          <label>Stay ID:</label>
          <input
            type="number"
            value={stayId || ""}
            onChange={(e) => setStayId(Number(e.target.value))}
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;

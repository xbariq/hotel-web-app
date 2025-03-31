import React, { useState } from "react";
import axios from "axios";

const AddPayment = () => {
  const [stayId, setStayId] = useState<number | "">("");
  const [amount, setAmount] = useState<number | "">("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [stayType, setStayType] = useState<string>("booking");
  const [customerId, setCustomerId] = useState<number | "">("");

  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !stayId ||
      !amount ||
      !paymentMethod ||
      !paymentDate ||
      !stayType ||
      !customerId
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      // Send the payment data to the backend
      const response = await axios.post("http://localhost:3000/payments", {
        stay_id: stayId,
        amount,
        payment_method: paymentMethod,
        payment_date: paymentDate,
        stay_type: stayType,
        customer_id: customerId,
      });

      if (response.status === 201) {
        setMessage("Payment added successfully!");
      }
    } catch (error) {
      setMessage("Error adding payment");
      console.error("Error adding payment", error);
    }
  };

  return (
    <div>
      <h3>Add Payment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stay ID:</label>
          <input
            type="number"
            value={stayId || ""}
            onChange={(e) => setStayId(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payment Date:</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Customer ID:</label>
          <input
            type="number"
            value={customerId || ""}
            onChange={(e) => setCustomerId(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Stay Type:</label>
          <select
            value={stayType}
            onChange={(e) => setStayType(e.target.value)}
            required
          >
            <option value="booking">Booking</option>
            <option value="renting">Renting</option>
          </select>
        </div>
        <button type="submit">Add Payment</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPayment;

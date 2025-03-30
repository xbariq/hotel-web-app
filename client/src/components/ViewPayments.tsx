import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  // Fetch all payments from the backend
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/payments");
        setPayments(response.data);
      } catch (error) {
        setMessage("Error fetching payments");
        console.error("Error fetching payments", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="view-payments-container">
      <h2 className="view-payments-header">View Payments</h2>
      {message && <p>{message}</p>}
      {payments.length > 0 ? (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Payment Amount</th>
              <th>Payment Method</th>
              <th>Payment Date</th>
              <th>Stay Type</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.payment_id}>
                <td>${payment.amount}</td>
                <td>{payment.payment_method}</td>
                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                <td>{payment.stay_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payments found</p>
      )}
    </div>
  );
};

export default ViewPayments;

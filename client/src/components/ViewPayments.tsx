import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const ViewPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showPayments, setShowPayments] = useState<boolean>(false);
  const [showBookings, setShowBookings] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/stays");
        console.log(response.data);
        setBookings(response.data);
      } catch (error) {
        setMessage("Error fetching bookings");
        console.error("Error fetching bookings", error);
      }
    };

    fetchBookings();
  }, []);

  const handleTogglePayments = () => {
    setShowPayments((prevState) => !prevState);
  };

  const handleToggleBookings = () => {
    setShowBookings((prevState) => !prevState);
  };

  return (
    <div className="view-payments-container">
      <h2 className="view-payments-header">View Payments</h2>
      <div>
        <button onClick={handleTogglePayments}>
          {showPayments ? "Hide Payments" : "View Payments"}
        </button>
        <button onClick={handleToggleBookings}>
          {showBookings ? "Hide Bookings" : "View Bookings"}
        </button>
      </div>

      {message && <p>{message}</p>}

      {showPayments && payments.length > 0 ? (
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
        showPayments && <p>No payments found</p>
      )}

      {showBookings && bookings.length > 0 ? (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Stay ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Stay Type</th>
              <th>Room Number</th>
              <th>Hotel ID</th>
              <th>Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.stay_id}>
                <td>{booking.stay_id}</td>
                <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                <td>{booking.stay_type}</td>
                <td>{booking.room_number}</td>
                <td>{booking.hotel_id}</td>
                <td>{`${booking.f_name} ${booking.l_name}`}</td>{" "}
                {/* Display customer name */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        showBookings && <p>No bookings found</p>
      )}
    </div>
  );
};

export default ViewPayments;

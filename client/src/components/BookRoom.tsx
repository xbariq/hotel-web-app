import React, { useState } from "react";
import axios from "axios";

const BookRoom = ({ roomDetails }: { roomDetails: any }) => {
  const [showCustomerForm, setShowCustomerForm] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState({
    f_name: "",
    m_name: "",
    l_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    code: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !customerData.f_name ||
      !customerData.l_name ||
      !customerData.email ||
      !customerData.street ||
      !customerData.city ||
      !customerData.state ||
      !customerData.country ||
      !customerData.code
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Insert customer into hotel_customer table
      const response = await axios.post(
        "http://localhost:3000/hotel_customers",
        {
          ...customerData,
        }
      );

      if (response.status === 201) {
        setMessage("Customer added successfully!");
      }
    } catch (error) {
      setMessage("Error adding customer");
      console.error("Error adding customer", error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowCustomerForm(true)}>Book Now</button>

      {showCustomerForm && (
        <div>
          <h3>Customer Details</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="f_name"
                value={customerData.f_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Middle Name:</label>
              <input
                type="text"
                name="m_name"
                value={customerData.m_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="l_name"
                value={customerData.l_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Street:</label>
              <input
                type="text"
                name="street"
                value={customerData.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={customerData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={customerData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={customerData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Postal Code:</label>
              <input
                type="text"
                name="code"
                value={customerData.code}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Add Customer</button>
          </form>

          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default BookRoom;

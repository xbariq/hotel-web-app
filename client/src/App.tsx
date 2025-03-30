import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HotelList from "./components/HotelList";
import SearchRoom from "./components/SearchRoom";
import ViewPayments from "./components/ViewPayments";
import AddPayment from "./components/AddPayment";

const App: React.FC = () => {
  const [role, setRole] = useState<string>("customer"); // Default to customer

  return (
    <div className="App">
      <h1>Hotel Web App</h1>

      {/* Role selection dropdown */}
      <div>
        <label>Select Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {/* Conditional rendering based on role */}
      {role === "employee" && (
        <div>
          <AddPayment />
          <h3>View Payments</h3>
          <ViewPayments />
        </div>
      )}

      {/* For customer, only show search room and hotel list */}
      {role === "customer" && (
        <div>
          <SearchRoom />
        </div>
      )}

      {/* Uncomment to display the hotel list if needed */}
      {/* <HotelList /> */}
    </div>
  );
};

export default App;

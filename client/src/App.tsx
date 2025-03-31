import React, { useState } from "react";
import "./App.css";
import SearchRoom from "./components/SearchRoom";
import ViewPayments from "./components/ViewPayments";
import AddPayment from "./components/AddPayment";

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(null); // Null means not logged in

  // Login handler when a role is selected
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role to log in.");
    }
  };

  if (!role) {
    return (
      <div className="login-container">
        <h1>Hotel Web App - Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Select Role:</label>
            <select
              value={role || ""}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hotel Web App</h1>
      {/* Conditional rendering based on role */}
      {role === "employee" && (
        <div>
          <h3>Employee Dashboard</h3>
          <AddPayment />
          <h3>View Payments</h3>
          <ViewPayments />
        </div>
      )}
      {role === "customer" && (
        <div>
          <SearchRoom />
        </div>
      )}
    </div>
  );
};

export default App;

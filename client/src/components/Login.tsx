import React, { useState } from "react";
import "../styles.css";

const Login = ({
  setRole,
}: {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [role, setSelectedRole] = useState<string>("customer");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null); // Show login error

  // Hardcode employees and customers for simple login
  const predefinedRoles = {
    customer: "customerPassword", // password for customer - For now I decided to not use log in credentials
    employee: "employeePassword", // password for employee - For now I decided to not use log in credentials
  };

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === predefinedRoles.customer) {
      setRole("customer");
      setLoginError(null);
    } else if (password === predefinedRoles.employee) {
      setRole("employee");
      setLoginError(null);
    } else {
      setLoginError("Invalid role or password. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Role:</label>
          <select
            onChange={(e) => setSelectedRole(e.target.value)}
            value={role}
            required
          >
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";

const ManagerLogin = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password" && role === "Manager") {
      onSuccess();
    } else {
      setError("Access Denied.");
    }
  };

  return (
    <div className="modal">
      <h2>Manager Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        value={role}
        onChange={(e)=>setRole(e.target.value)}
        className="role-dropdown"
      >
        <option value="">Select role</option>
        <option value="Manager">Manager</option>
        <option value="Employee">Employee</option>
      </select>
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ManagerLogin;

import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = ({ fetchEmployees, setShowForm }) => {
  const [form, setForm] = useState({
    name: "",
    employee_id: "",
    email: "",
    phone_number: "",
    department: "",
    date_of_joining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim() || !form.name.includes(" ")) {
      newErrors.name = "Please provide both first and last name.";
    }

    // Employee ID validation
    if (!/^[a-zA-Z0-9]{1,10}$/.test(form.employee_id)) {
      newErrors.employee_id = "Employee ID must be alphanumeric and max 10 characters.";
    }

    // Email validation
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Phone Number validation
    if (!/^\d{10}$/.test(form.phone_number)) {
      newErrors.phone_number = "Phone number must be exactly 10 digits.";
    }

    // Date of Joining validation
    const today = new Date().toISOString().split("T")[0];
    if (!form.date_of_joining || form.date_of_joining > today) {
      newErrors.date_of_joining = "Date of Joining cannot be a future date.";
    }

    // Role validation
    if (!form.role.trim()) {
      newErrors.role = "Role is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("https://employee-management-8tkm.onrender.com/api/employees", form);
      setSuccessMessage("Employee added successfully!");
      fetchEmployees(); // Refresh employee list
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to add employee. Duplicate Employee ID or Email.");
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      employee_id: "",
      email: "",
      phone_number: "",
      department: "",
      date_of_joining: "",
      role: "",
    });
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>Add Employee</h2>

      <input
        type="text"
        name="name"
        placeholder="Name (First and Last)"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        type="text"
        name="employee_id"
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={handleChange}
      />
      {errors.employee_id && <p className="error">{errors.employee_id}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={form.phone_number}
        onChange={handleChange}
      />
      {errors.phone_number && <p className="error">{errors.phone_number}</p>}

      <select name="department" value={form.department} onChange={handleChange}>
        <option>Select Department</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
      </select>

      <input
        type="date"
        name="date_of_joining"
        value={form.date_of_joining}
        onChange={handleChange}
      />
      {errors.date_of_joining && <p className="error">{errors.date_of_joining}</p>}

      <input
        type="text"
        name="role"
        placeholder="Role (e.g., Manager, Developer)"
        value={form.role}
        onChange={handleChange}
      />
      {errors.role && <p className="error">{errors.role}</p>}

      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>

      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default EmployeeForm;

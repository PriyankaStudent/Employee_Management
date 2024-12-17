import React, { useState } from "react";

const EmployeeList = ({ employees }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (departmentFilter === "" || emp.department === departmentFilter)
    );
  });

  return (
    <div>
      <div className="filters">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        {/* Department Filter */}
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div className="employee-list">
        {filteredEmployees.map((emp) => (
          <div key={emp.id} className="employee-card">
            <h3>{emp.name}</h3>
            <p>Role: {emp.role}</p>
            <p>Department: {emp.department || "N/A"}</p>
          </div>
        ))}
        {filteredEmployees.length === 0 && <p>No employees found.</p>}
      </div>
    </div>
  );
};

export default EmployeeList;

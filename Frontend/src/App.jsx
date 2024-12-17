import React, { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import ManagerLogin from "./components/ManagerLogin";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleManagerLogin = () => {
    setIsManager(true);
    setShowForm(true);
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      {showForm ? (
        <EmployeeForm
          fetchEmployees={fetchEmployees}
          setShowForm={setShowForm}
        />
      ) : (
        <>
          {!isManager && (
            <ManagerLogin onSuccess={handleManagerLogin} />
          )}
          <EmployeeList employees={employees} />
        </>
      )}
    </div>
  );
};

export default App;

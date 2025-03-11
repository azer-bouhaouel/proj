import { useContext, useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function DisplayEmployees() {
  const { user } = useContext(AuthContext);

  if (user.role === "admin") {
    return <Child />;
  }
  return <Navigate to="/" />;
}

function Child() {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchedValue, setSearchedValue] = useState("");

  const handleChange = (e) => {
    setSearchedValue(e.target.value);
  };

  const handleSelect = (e) => {
    setFilter(e.target.value);
  };

  const handleOnDelete = (employeeId) => {
    setItems(items.filter((ele) => ele._id !== employeeId));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/employee/getEmployees")
      .then(async (res) => {
        const employees = await res.data.employees;
        const ok = await res.data.ok;
        const message = await res.data.message;
        if (ok) {
          setItems(employees);
          setDisplayedItems(employees);
        } else {
          console.log(message);
          alert(message);
        }
      })
      .catch((err) => {
        console.log("client err: ", err);
      });
  }, []);

  useEffect(() => {
    let result = items;

    if (filter !== "all") {
      result = result.filter((ele) => ele.role === filter);
    }

    if (searchedValue) {
      result = result.filter((ele) =>
        ele.fullName.toLowerCase().startsWith(searchedValue.toLowerCase())
      );
    }

    setDisplayedItems(result);
  }, [filter, searchedValue, items]);

  return (
    <div className="w-full px-6 py-12 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-10 text-center">Employees List</h1>

        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 mx-auto w-full sm:w-lg">
          <input
            id="searchEmployee"
            name="searchEmployee"
            type="text"
            placeholder="employee name"
            onChange={handleChange}
            autoComplete="searchEmployee"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />

          <select
            id="role"
            name="role"
            onChange={handleSelect}
            required
            className="block w-64 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="all">all</option>
            <option value="project manager">Project Manager</option>
            <option value="warehouse manager">Warehouse Manager</option>
          </select>
        </div>

        {items.length !== 0 && (
          <p className="block mt-3 font-medium text-gray-900">
            Total: {displayedItems.length}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-20 ">
          {items.length !== 0 ? (
            displayedItems.map((employee, index) => (
              <EmployeeCard
                key={index}
                employee={employee}
                onDelete={handleOnDelete}
              />
            ))
          ) : (
            <p>No items</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayEmployees;

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const EmployeeCard = ({ employee, onDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditEmployee = () => {
    navigate(`/editEmployee/${employee._id}`);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/employee/deleteEmployee/${employee._id}`)
      .then(async (res) => {
        const message = await res.data.message;
        const ok = await res.data.ok;

        setIsOpen(false);
        if (ok) {
          onDelete(employee._id);
        } else {
          console.log(message);
          alert(message);
        }
      })
      .catch((err) => {
        console.log("client error: ", err);
      });
  };

  return (
    <div className=" relative w-full flex flex-col gap-2 sm:w-[280px] p-8 bg-blue-500 text-white rounded-xl shadow-lg ">
      <div className="absolute top-2 right-2 cursor-pointer">
        <MoreVertical
          onClick={() => setIsOpen(!isOpen)}
          className=" rounded-ful"
          size={20}
        />

        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-24 bg-white text-black rounded-md shadow-lg"
            ref={menuRef}
          >
            <button
              onClick={handleEditEmployee}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="font-bold mb-2 text-lg">{employee.fullName}</p>
      <p>CIN: {employee.cin}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Address: {employee.address}</p>
      <p>Role: {employee.role}</p>
    </div>
  );
};

EmployeeCard.propTypes = {
  employee: PropTypes.object,
  onDelete: PropTypes.func,
};

export default EmployeeCard;

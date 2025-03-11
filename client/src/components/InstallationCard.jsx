import PropTypes from "prop-types";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstallationCard = ({ installation, onDelete }) => {
  const [desc, setDesc] = useState(false);

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

  const handleEditInstallation = () => {
    navigate(`/editInstallation/${installation._id}`);
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:3001/admin/deleteInstallation/${installation._id}`
      )
      .then(async (res) => {
        const message = await res.data.message;
        const ok = await res.data.ok;
        console.log(message);
        setIsOpen(false);
        if (ok) {
          onDelete(installation._id);
        }
      })
      .catch((err) => {
        console.log("client error: ", err);
      });
  };

  return (
    <div className="relative w-full md:w-[300px] p-8 bg-blue-500 text-white rounded-xl shadow-lg ">
      <div className="absolute top-2 right-2 cursor-pointer">
        <MoreVertical
          onClick={() => setIsOpen(!isOpen)}
          className=" rounded-ful"
          size={20}
        />

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-24 bg-white text-black rounded-md shadow-lg"
            ref={menuRef}
          >
            <button
              onClick={handleEditInstallation}
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
      {!desc ? (
        <>
          <p className="font-bold mb-2">
            {new Date(installation.date).toISOString().split("T")[0]}
          </p>
          <p>Client Name: {installation.client?.fullName}</p>
          <p>Manager Name: {installation.manager?.fullName}</p>
          <p>Panels: {installation.panels}</p>
          <p>Address: {installation.address}</p>
          <button
            className="mt-4 cursor-pointer"
            onClick={() => {
              setDesc(!desc);
            }}
          >
            MORE
          </button>
        </>
      ) : (
        <>
          <p>Description: {installation.description}</p>
          <button
            className="mt-4 cursor-pointer"
            onClick={() => {
              setDesc(!desc);
            }}
          >
            LESS
          </button>
        </>
      )}
    </div>
  );
};

InstallationCard.propTypes = {
  installation: PropTypes.object,
  onDelete: PropTypes.func,
};

export default InstallationCard;

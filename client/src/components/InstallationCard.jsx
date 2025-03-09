import PropTypes from "prop-types";
import { useState } from "react";

const InstallationCard = ({ installation }) => {
  const [desc, setDesc] = useState(false);
  return (
    <div className="w-full md:w-[300px] p-8 bg-blue-500 text-white rounded-xl shadow-lg ">
      {!desc ? (
        <>
          <p className="font-bold">
            {new Date(installation.date).toISOString().split("T")[0]}
          </p>
          <p>Client Name: {installation.client.fullName}</p>
          <p>Manager Name: {installation.manager.fullName}</p>
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
};

export default InstallationCard;

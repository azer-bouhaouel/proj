import PropTypes from "prop-types";

const ClientCard = ({ client }) => {
  return (
    <div className="w-full md:w-[300px] p-8 bg-blue-500 text-white rounded-xl shadow-lg ">
      <p className="font-bold">{client.fullName}</p>
      <p>CIN: {client.cin}</p>
      <p>Email: {client.email}</p>
      <p>Phone: {client.phone}</p>
      <p>Address: {client.address}</p>
    </div>
  );
};

ClientCard.propTypes = {
  client: PropTypes.object,
};

export default ClientCard;

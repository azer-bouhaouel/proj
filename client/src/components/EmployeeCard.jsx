import PropTypes from "prop-types";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="w-full md:w-[300px] p-8 bg-blue-500 text-white rounded-xl shadow-lg ">
      <p className="font-bold">{employee.fullName}</p>
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
};

export default EmployeeCard;

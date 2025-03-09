import PropTypes from "prop-types";

function PopupMessage({ toggleMessage, message }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="lg:w-64"></div>
      <div className="flex-1 flex justify-center ">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-900">Notification</h2>
          <p className="text-gray-600 mt-4">{message}</p>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
            onClick={toggleMessage}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

PopupMessage.propTypes = {
  toggleMessage: PropTypes.func,
  message: PropTypes.string,
};

export default PopupMessage;

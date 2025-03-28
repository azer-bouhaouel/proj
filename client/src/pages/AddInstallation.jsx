import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function AddInstallation() {
  const { user } = useContext(AuthContext);

  if (user.role === "admin") {
    return <Child />;
  }
  return <Navigate to="/" />;
}

function Child() {
  const [managers, setManagers] = useState([]);
  const [clients, setClients] = useState([]);

  const [installationInfo, setInstallationInfo] = useState({
    date: new Date().toISOString(),
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (installationInfo.panels == 0) {
      alert("panel's number shouldn't be 0");

      return;
    }

    axios
      .post(
        "http://localhost:3001/installation/addInstallation",
        installationInfo
      )
      .then(async (res) => {
        const message = await res.data.message;
        const ok = await res.data.ok;

        if (ok) {
          navigate("/displayInstallations");
        } else {
          console.log(message);
          alert(message);
        }
      })
      .catch((err) => {
        console.log("client err : ", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstallationInfo((prev) => {
      const updatedValues = { ...prev, [name]: value };
      return updatedValues;
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/employee/getManagers")
      .then(async (res) => {
        const managers = await res.data.managers;
        const message = await res.data.message;
        const ok = await res.data.ok;
        if (ok) {
          setManagers(managers);
        } else {
          console.log(message);
          alert(message);
        }
      })
      .catch((err) => {
        console.log("client error: ", err);
      });

    axios
      .get("http://localhost:3001/client/getClients")
      .then(async (res) => {
        const clients = await res.data.clients;
        if (clients) {
          setClients(clients);
        }
      })
      .catch((err) => {
        console.log("client error: ", err);
      });
  }, []);

  return (
    <div className="flex w-full  flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create an Installation
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Date
            </label>
            <div className="mt-2">
              <p className="block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ">
                {new Date().toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                onChange={handleChange}
                type="text"
                required
                autoComplete="address"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="panels"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Panels
            </label>
            <div className="mt-2">
              <input
                id="panels"
                name="panels"
                onChange={handleChange}
                type="text"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="client"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Client
            </label>
            <div className="mt-2">
              <select
                id="client"
                name="client"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">select a client</option>
                {clients.map((clt, index) => (
                  <option key={index} value={clt._id}>
                    {clt.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="manager"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Project Manager
            </label>
            <div className="mt-2">
              <select
                id="manager"
                name="manager"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">select a manager</option>

                {managers.map((opt, index) => (
                  <option key={index} value={opt._id}>
                    {opt.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                type="text"
                className="min-h-36 resize-none overflow-auto block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer bg-indigo-600 hover:bg-indigo-500"
            >
              Add Installation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInstallation;

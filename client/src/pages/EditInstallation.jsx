import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditInstallation() {
  const { id } = useParams();

  const [managers, setManagers] = useState([]);
  const [installationInfo, setInstallationInfo] = useState({});
  const [newInfo, setNewInfo] = useState({
    address: "",
    panels: 1,
    description: "",
  });
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prev) => {
      const updatedValues = { ...prev, [name]: value };
      setIsChanged(
        JSON.stringify(installationInfo) !== JSON.stringify(updatedValues)
      );
      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newInfo.panels == 0) {
      alert("panel's number shouldn't be 0");
      return;
    }

    axios
      .put("http://localhost:3001/installation/updateInstallation", newInfo)
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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/installation/getInstallation/${id}`)
      .then(async (res) => {
        const installation = await res.data.installation;
        const message = await res.data.message;
        const ok = await res.data.ok;
        if (ok) {
          setInstallationInfo(installation);
          setNewInfo(installation);
        } else {
          console.log(message);
          alert(message);
        }
      })
      .catch((err) => {
        console.log("client error: ", err);
      });

    axios
      .get(`http://localhost:3001/employee/getManagers`)
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
  }, [id]);

  return (
    <div className="flex w-full  flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Update Installation
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="block text-lg/6 font-medium text-gray-900">
              Created At : {newInfo.date?.split("T")[0]}
            </p>
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
                value={newInfo.address}
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
                value={newInfo.panels}
                type="text"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="managerId"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Change project manager
            </label>
            <div className="mt-2">
              <select
                id="managerId"
                name="managerId"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">select a manager</option>

                {managers.map((mngr, index) => (
                  <option key={index} value={mngr._id}>
                    {mngr.fullName}
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
                value={newInfo.description}
                type="text"
                className="min-h-36 resize-none overflow-auto block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isChanged
                  ? "cursor-pointer bg-indigo-600 hover:bg-indigo-500"
                  : "cursor-not-allowed bg-gray-400"
              } `}
              disabled={!isChanged}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditInstallation;

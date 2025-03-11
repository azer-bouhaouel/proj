import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeInfo, setEmployeeInfo] = useState({});
  const [newInfo, setNewInfo] = useState({
    fullName: "",
    cin: "",
    phone: "",
    address: "",
    role: "",
    email: "",
  });
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prev) => {
      const updatedValues = { ...prev, [name]: value };
      setIsChanged(
        JSON.stringify(employeeInfo) !== JSON.stringify(updatedValues)
      );
      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/employee/updateEmployee", newInfo)
      .then(async (res) => {
        const message = await res.data.message;
        const ok = await res.data.ok;
        if (ok) {
          navigate("/displayEmployees");
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
      .get(`http://localhost:3001/employee/getEmployee/${id}`)
      .then(async (res) => {
        const employee = await res.data.employee;
        const message = await res.data.message;
        const ok = await res.data.ok;
        if (ok) {
          setEmployeeInfo(employee);
          setNewInfo(employee);
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
          Update Employee
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={handleChange}
                value={newInfo.fullName}
                required
                autoComplete="fullName"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={newInfo.email}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cin"
              className="block text-sm/6 font-medium text-gray-900"
            >
              CIN
            </label>
            <div className="mt-2">
              <input
                id="cin"
                name="cin"
                type="text"
                onChange={handleChange}
                value={newInfo.cin}
                required
                autoComplete="cin"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                onChange={handleChange}
                value={newInfo.phone}
                required
                autoComplete="phone"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
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
                type="text"
                onChange={handleChange}
                value={newInfo.address}
                required
                autoComplete="address"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Role
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                onChange={handleChange}
                value={newInfo.role}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">Select a role</option>
                <option value="project manager">Project Manager</option>
                <option value="warehouse manager">Warehouse Manager</option>
              </select>
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

export default EditEmployee;

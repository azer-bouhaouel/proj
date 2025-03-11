import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function UpdateProfileForAdmin() {
  const { user, setUser } = useContext(AuthContext);
  const [newInfo, setNewInfo] = useState(user);
  const [isChanged, setIsChanged] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/auth/changeAdminCredential", newInfo)
      .then(async (res) => {
        const message = await res.data.message;
        const updatedUser = await res.data.user;
        const ok = await res.data.ok;

        if (ok) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
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
    setNewInfo((prev) => {
      const updatedValues = { ...prev, [name]: value };
      setIsChanged(JSON.stringify(user) !== JSON.stringify(updatedValues));
      return updatedValues;
    });
  };

  return (
    <div className="flex w-full  flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Update Admin Profile
        </h2>

        <p className="mt-5  text-md/9 font-bold tracking-tight text-gray-600">
          Change your login and password
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="login"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Login
            </label>
            <div className="mt-2">
              <input
                id="login"
                name="login"
                onChange={handleChange}
                value={newInfo.login}
                type="text"
                required
                autoComplete="login"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              FullName
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                onChange={handleChange}
                value={newInfo.fullName}
                type="text"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {user.passwordChanged && (
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Old Password
              </label>
              <div className="mt-2">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  onChange={handleChange}
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
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
export default UpdateProfileForAdmin;

import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function EstimationTool() {
  const { user } = useContext(AuthContext);

  if (user.role === "admin") {
    return <Child />;
  }
  return <Navigate to="/" />;
}

function Child() {
  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(Math.ceil(annualProductionForSinglePanel / clientUsage));
  };

  const solarPower = 2; // 2 Kw
  const peekSunPerDay = 5; // 5 or 7 hours of sun everyday in tunisia
  const annualProductionForSinglePanel = solarPower * peekSunPerDay * 365; // 3650
  const [clientUsage, setClientUsage] = useState(0);
  const [result, setResult] = useState(0);
  const handleChange = (e) => {
    setClientUsage(e.target.value);
  };

  return (
    <div className="flex w-full  flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Estimate your needs
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="consumption"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Annual Energy Consumption (Kwh)
            </label>
            <div className="mt-2">
              <input
                id="consumption"
                name="consumption"
                type="text"
                onChange={handleChange}
                required
                autoComplete="consumption"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          {result === Infinity ? (
            <p className="block text-sm font-medium text-red-600">
              this field cannot be 0 !
            </p>
          ) : (
            <p className="block text-sm font-medium text-gray-900">
              {result > 0
                ? `${result} panels`
                : `please enter your energy consumption in the last year`}
            </p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
      {/* <PopupMessage /> */}
    </div>
  );
}

export default EstimationTool;

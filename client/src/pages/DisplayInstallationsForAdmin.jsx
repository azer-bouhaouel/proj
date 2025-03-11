import { useEffect, useState } from "react";
import InstallationCard from "../components/InstallationCard";
import axios from "axios";

/* 

still needs work on the search and filter

*/

function DisplayInstallationsForAdmin() {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  const [filterBy, setFilterBy] = useState("client");
  const [searchedValue, setSearchedValue] = useState("");

  const handleChange = (e) => {
    setSearchedValue(e.target.value);
  };

  const handleSelect = (e) => {
    setFilterBy(e.target.value);
  };

  useEffect(() => {
    let result = items;

    if (filterBy == "client") {
      result = result.filter((ele) =>
        ele.client.fullName
          .toLowerCase()
          .startsWith(searchedValue.toLowerCase())
      );
    }
    if (filterBy == "manager") {
      result = result.filter((ele) =>
        ele.manager.fullName
          .toLowerCase()
          .startsWith(searchedValue.toLowerCase())
      );
    }
    if (filterBy == "date") {
      result = result.filter((ele) =>
        ele.date.toLowerCase().startsWith(searchedValue.toLowerCase())
      );
    }

    setDisplayedItems(result);
  }, [filterBy, searchedValue, items]);

  const handleOnDelete = (installationId) => {
    setItems(items.filter((ele) => ele._id !== installationId));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/installation/getInstallations")
      .then(async (res) => {
        const installations = await res.data.installations;
        const message = await res.data.message;
        const ok = await res.data.ok;
        if (ok) {
          setItems(installations);
          setDisplayedItems(installations);
        } else {
          console.log(message);
          alert(message);
        }
      })
      .catch((err) => {
        console.log("client err: ", err);
      });
  }, []);

  return (
    <div className="w-full px-6 py-12 lg:px-8">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-2xl font-bold mb-10 text-center">
          Installations List
        </h1>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 mx-auto w-full sm:w-lg">
          <input
            id="searchInstallation"
            name="searchInstallation"
            type="text"
            placeholder="search here"
            onChange={handleChange}
            required
            autoComplete="searchInstallation"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
          />

          <select
            id="filter"
            name="filter"
            onChange={handleSelect}
            required
            className="block w-64 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="client">client name</option>
            <option value="date">date</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {items.length !== 0 && (
          <p className="block mt-3 font-medium text-gray-900">
            Total: {displayedItems.length}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-20">
          {items.length !== 0 ? (
            displayedItems.map((installation, index) => (
              <InstallationCard
                key={index}
                installation={installation}
                onDelete={handleOnDelete}
              />
            ))
          ) : (
            <p>No items</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayInstallationsForAdmin;

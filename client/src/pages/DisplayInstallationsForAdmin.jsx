import { useEffect, useState } from "react";
import InstallationCard from "../components/InstallationCard";
import axios from "axios";

function DisplayInstallationsForAdmin() {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setDisplayedItems(items);
      return;
    }
    setDisplayedItems(
      items.filter((ele) =>
        ele.client.fullName.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/getInstallations")
      .then(async (res) => {
        const installations = await res.data.installations;
        setItems(installations);
        setDisplayedItems(installations);
      })
      .catch((err) => {
        console.log("client err: ", err);
      });
  }, []);
  return (
    <div className="w-full px-6 py-12 lg:px-8">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-2xl font-bold mb-20 text-center">
          Installations List
        </h1>
        <div className="mt-2 flex items-center gap-2 mx-auto w-full md:w-md">
          <input
            id="searchInstallation"
            name="searchInstallation"
            type="text"
            placeholder="client name"
            onChange={handleChange}
            required
            autoComplete="searchInstallation"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-20">
          {items ? (
            displayedItems.map((installation, index) => (
              <InstallationCard key={index} installation={installation} />
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

import { useContext, useEffect, useState } from "react";
import ClientCard from "../components/ClientCard";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function DisplayClients() {
  const { user } = useContext(AuthContext);
  if (user.role === "admin") {
    return <Child />;
  }
  return <Navigate to="/" />;
}

function Child() {
  const [items, setItems] = useState([]); // all clients
  const [displayedItems, setDisplayedItems] = useState([]); // displayed clients (because we filter by search)

  const handleOnDelete = (clientId) => {
    setItems(items.filter((ele) => ele._id !== clientId));
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setDisplayedItems(items);
      return;
    }
    setDisplayedItems(
      items.filter((ele) =>
        ele.fullName.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/client/getClients")
      .then(async (res) => {
        const clients = await res.data.clients;
        const message = await res.data.message;
        const ok = await res.data.ok;
        if (ok) {
          setItems(clients);
          setDisplayedItems(clients);
        } else {
          console.log(message);
          alert(message);
        }
      })
      .catch((err) => {
        console.log("client err: ", err);
      });
  }, []);

  useEffect(() => {
    setDisplayedItems(items); // updates clients after filter
  }, [items]);

  return (
    <div className="w-full px-6 py-12 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-10 text-center">Client List</h1>
        <div className="mt-2 flex items-center gap-2 mx-auto w-full md:w-md">
          <input
            id="searchClient"
            name="searchClient"
            type="text"
            placeholder="client name"
            onChange={handleChange}
            required
            autoComplete="searchClient"
            className="block w-full rounded-md bg-white  px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
          />
        </div>
        {items.length !== 0 && (
          <p className="block mt-3 font-medium text-gray-900">
            Total: {displayedItems.length}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 mt-20">
          {items.length !== 0 ? (
            displayedItems.map((client, index) => (
              <ClientCard
                key={index}
                client={client}
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

export default DisplayClients;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      if (result.success) {
        setProducts(result);
      } else if (!result.success) {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateNewSprint = () => {
    navigate("/createSprint");
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      {/* <h1>Welcome {loggedInUser}</h1> */}
      {/* <button onClick={handleLogout}>Logout</button> */}
      <div>
        {/* {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))} */}
        <button onClick={handleCreateNewSprint}>Create Sprint</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;

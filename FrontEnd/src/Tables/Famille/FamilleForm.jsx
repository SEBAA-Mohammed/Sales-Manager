import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate } from "react-router-dom";

const FamilleForm = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    famille: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.post("http://localhost:8000/famille/store", formData, {
        headers,
      });
      alert("Famille bien ajoutée");
      navigate("/FamilleList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">
          Ajouter une nouvelle famille
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="famille"
              className="block text-sm font-semibold mb-1"
            >
              Famille :
            </label>
            <input
              type="text"
              name="famille"
              id="famille"
              value={formData.famille}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
          <button
            className="bg-teal-500 text-white mx-5 py-2 px-4 rounded hover:bg-teal-600"
            onClick={() => {
              navigate("/FamilleList");
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  );
};

export default FamilleForm;

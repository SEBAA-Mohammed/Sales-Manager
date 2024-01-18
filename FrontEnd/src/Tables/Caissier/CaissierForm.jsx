import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate } from "react-router-dom";

const CaissierForm = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    poste: "",
    email: "",
    password: "",
    admin: "",
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
      await axios.post("http://localhost:8000/caissier/store", formData, {
        headers,
      });
      alert("Caissier bien ajouté");
      navigate("/CaissierList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">
          Ajouter un nouveau caissier
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="1" className="block text-sm font-semibold mb-1">
              Nom :
            </label>
            <input
              type="text"
              name="nom"
              id="1"
              value={formData.nom}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="2" className="block text-sm font-semibold mb-1">
              Prenom:
            </label>
            <input
              type="text"
              name="prenom"
              id="2"
              value={formData.prenom}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="3" className="block text-sm font-semibold mb-1">
              Poste:
            </label>
            <input
              type="text"
              name="poste"
              id="3"
              value={formData.poste}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="6" className="block text-sm font-semibold mb-1">
              Email:
            </label>
            <input
              type="text"
              name="email"
              id="6"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="7" className="block text-sm font-semibold mb-1">
              Password:
            </label>
            <input
              type="text"
              name="password"
              id="7"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="admin" className="block text-sm font-semibold mb-1">
              Admin ??
            </label>
            <select
              name="admin"
              value={formData.admin}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Admin ??</option>
              <option value={0}>Non</option>
              <option value={1}>Oui</option>
            </select>
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
              navigate("/CaissierList");
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  );
};

export default CaissierForm;

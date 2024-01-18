import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
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
    adresse: "",
    ville: "",
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
      await axios.post("http://localhost:8000/client/store", formData, {
        headers,
      });
      alert("Client bien ajouté");
      navigate("/ClientList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">Ajouter un nouveau employé</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-semibold mb-1">
              Nom :
            </label>
            <input
              type="text"
              name="nom"
              id="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="prenom"
              className="block text-sm font-semibold mb-1"
            >
              Prenom :
            </label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="adresse"
              className="block text-sm font-semibold mb-1"
            >
              Adresse :
            </label>
            <input
              type="text"
              name="adresse"
              id="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ville" className="block text-sm font-semibold mb-1">
              Ville :
            </label>
            <input
              type="text"
              name="ville"
              id="ville"
              value={formData.ville}
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
              navigate("/ClientList");
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  );
};

export default ClientForm;

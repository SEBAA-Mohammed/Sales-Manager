import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate, useParams } from "react-router-dom";

const CaissierUpdate = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/caissier/show?id=${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, [id]);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    poste: "",
    email: "",
    password: "",
    admin: "",
    id: null,
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
      await axios.put("http://localhost:8000/caissier/update", formData, {
        headers,
      });
      alert("Caissier bien modifié");
      navigate("/CaissierList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">Modifier cet employé</h1>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-semibold mb-1">
              Id :
            </label>
            <input
              disabled={true}
              type="text"
              name="id"
              id="id"
              value={formData.id === null ? "" : formData.id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
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
            <label htmlFor="poste" className="block text-sm font-semibold mb-1">
              Poste :
            </label>
            <input
              type="text"
              name="poste"
              id="poste"
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
              Admin :
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
            Modifier
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

export default CaissierUpdate;

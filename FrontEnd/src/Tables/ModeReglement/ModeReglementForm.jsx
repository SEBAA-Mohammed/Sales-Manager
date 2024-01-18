import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate } from "react-router-dom";

const ModeReglementForm = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const [formData, setFormData] = useState({
    mode: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mode.trim()) {
      setError("Le champ Mode est requis.");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.post("http://localhost:8000/modeReglement/store", formData, {
        headers,
      });
      alert("Mode de règlement bien ajouté");
      navigate("/ModeReglementList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">
          Ajouter un nouveau règlement
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mode" className="block text-sm font-semibold mb-1">
            Mode :
          </label>
          <input
            type="text"
            name="mode"
            id="mode"
            value={formData.mode}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 my-5 px-4 rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
          <button
            className="bg-teal-500 text-white mx-5 py-2 px-4 rounded hover:bg-teal-600"
            onClick={() => {
              navigate("/ModeReglementList");
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  );
};

export default ModeReglementForm;

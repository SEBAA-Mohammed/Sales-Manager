import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate, useParams } from "react-router-dom";

const ModeReglementUpdate = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    mode: "",
    id: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/modeReglement/show?id=${id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Unable to fetch data");
        setLoading(false);
      });
  }, [id]);

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
      await axios.put("http://localhost:8000/modeReglement/update", formData, {
        headers,
      });
      alert("Mode de règlement bien modifié");
      navigate("/ModeReglementList");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Erreur lors de la modification du mode de règlement");
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">
          Modifier un mode de règlement
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="6" className="block text-sm font-semibold mb-1">
              Id :
            </label>
            <input
              disabled={true}
              type="text"
              name="id"
              id="6"
              value={formData.id === null ? "" : formData.id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
            <label htmlFor="1" className="block text-sm font-semibold mb-1">
              Mode :
            </label>
            <input
              type="text"
              name="mode"
              id="1"
              value={formData.mode}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 my-5 px-4 rounded hover:bg-blue-600"
            >
              Modifier
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
        )}
      </div>
    </>
  );
};

export default ModeReglementUpdate;

import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate } from "react-router-dom";

const ArticleForm = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    designation: "",
    famille_id: "",
    prix_ht: "",
    stock: "",
    tva: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [familleData, setFamilleData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/famille")
      .then((response) => {
        setFamilleData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);
  console.log(familleData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.post("http://localhost:8000/article/store", formData, {
        headers,
      });
      alert("Article bien ajouté");
      navigate("/ArticleList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">Ajouter un nouveau article</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="1" className="block text-sm font-semibold mb-1">
              Designation :
            </label>
            <input
              type="text"
              name="designation"
              id="1"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="2" className="block text-sm font-semibold mb-1">
              Prix_ht:
            </label>
            <input
              type="text"
              name="prix_ht"
              id="2"
              value={formData.prix_ht}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="3" className="block text-sm font-semibold mb-1">
              TVA:
            </label>
            <input
              type="text"
              name="tva"
              id="3"
              value={formData.tva}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="4" className="block text-sm font-semibold mb-1">
              Stock:
            </label>
            <input
              type="text"
              name="stock"
              id="4"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="5" className="block text-sm font-semibold mb-1">
              Famille:
            </label>
            <select
              name="famille_id"
              id="5"
              value={formData.famille_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">choisir famille</option>
              {familleData.map((fam) => (
                <option key={fam.id} value={fam.id}>
                  {fam.famille}
                </option>
              ))}
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
              navigate("/ArticleList");
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  );
};

export default ArticleForm;

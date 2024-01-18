import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate, useParams } from "react-router-dom";

const DetailBlForm = ({ isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  });
  const navigate = useNavigate();
  const { id: idbl } = useParams();
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/article")
      .then((response) => {
        setArticleData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    article_id: "",
    qte: "",
    bl_id: idbl,
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
      await axios.post("http://localhost:8000/detailBl/store", formData, {
        headers,
      });
      alert("DetailBl bien ajouté");
      navigate(`/Det/${idbl}`);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-2xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-10">
          Ajouter un nouveau reglement
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="6" className="block text-sm font-semibold mb-1">
              Bon Livraison id :
            </label>
            <input
              disabled={true}
              type="text"
              name="bl_id"
              id="6"
              value={formData.bl_id === null ? "" : formData.bl_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="2" className="block text-sm font-semibold mb-1">
              qte :
            </label>
            <input
              type="text"
              name="qte"
              id="2"
              value={formData.qte}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="article_id"
              className="block text-sm font-semibold mb-1"
            >
              Choisir un article :
            </label>
            <select
              name="article_id"
              value={formData.article_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Choisir un article</option>
              {articleData.map((art) => {
                return (
                  <option key={art.id} value={art.id}>
                    {art.designation}
                  </option>
                );
              })}
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
              navigate(`/Det/${idbl}`);
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  );
};

export default DetailBlForm;

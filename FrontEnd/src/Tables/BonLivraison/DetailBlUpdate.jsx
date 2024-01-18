import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate, useParams } from "react-router-dom";

const DetailBlUpdate = ({ isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/detailBl/show?id=${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, [id]);

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
    bl_id: "",
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
      await axios.put("http://localhost:8000/detailBl/update", formData, {
        headers,
      });
      alert("Detailbl bien modifié");
      navigate(`/Det/${formData.bl_id}`);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Modifier un détail de livraison
        </h1>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label
              htmlFor="6"
              className="block text-sm font-bold text-gray-700"
            >
              Id :
            </label>
            <input
              disabled={true}
              type="text"
              name="id"
              id="6"
              value={formData.id === null ? "" : formData.id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="6"
              className="block text-sm font-bold text-gray-700"
            >
              Bon Livraison id :
            </label>
            <input
              disabled={true}
              type="text"
              name="bl_id"
              id="6"
              value={formData.bl_id === null ? "" : formData.bl_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="2"
              className="block text-sm font-bold text-gray-700"
            >
              qte :
            </label>
            <input
              type="text"
              name="qte"
              id="2"
              value={formData.qte}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="article_id"
              className="block text-sm font-bold text-gray-700"
            >
              Choisir un article :
            </label>
            <select
              name="article_id"
              value={formData.article_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Choisir un article</option>
              {articleData.map((art) => (
                <option key={art.id} value={art.id}>
                  {art.designation}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Modifier
          </button>
        </form>
      </div>
    </>
  );
};

export default DetailBlUpdate;

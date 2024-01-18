import { useState, useEffect } from "react";
import Menu from "../../Menu";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ArticleList = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/article")
      .then((response) => {
        setArticleData(response.data);
        console.log(articleData);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const destroy = async (id) => {
    if (
      window.confirm(
        "Si vous supprimez cet article, tous les detailbl qui ont l'article vont aussi être supprimés"
      )
    ) {
      try {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.delete(
          "http://localhost:8000/article/destroy",
          { data: { id } },
          { headers }
        );
        axios
          .get("http://localhost:8000/article")
          .then((response) => {
            setArticleData(response.data);
          })
          .catch((error) => {
            console.error("Error : ", error);
          });
        console.log(response.data);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-10">Liste des articles</h1>
        <Link
          to="/ArticleForm"
          className="menu-link text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Ajouter un article
        </Link>
        <table className="w-full my-10 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-center">id</th>
              <th className="py-2 px-4 border text-center">Designation</th>
              <th className="py-2 px-4 border text-center">Prix_Ht</th>
              <th className="py-2 px-4 border text-center">TVA</th>
              <th className="py-2 px-4 border text-center">Stock</th>
              <th className="py-2 px-4 border text-center">famille_id</th>
              <th className="py-2 px-4 border text-center">Supprimer</th>
              <th className="py-2 px-4 border text-center">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {articleData.map((art) => {
              const tva = art.tva * 100;
              return (
                <tr key={art.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{art.id}</td>
                  <td className="py-2 px-4 border text-center">
                    {art.designation}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {art.prix_ht} DH
                  </td>
                  <td className="py-2 px-4 border text-center">{tva}%</td>
                  <td className="py-2 px-4 border text-center">{art.stock}</td>
                  <td className="py-2 px-4 border text-center">
                    {art.famille_id}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => destroy(art.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <Link
                      to={`/ArticleUpdate/${art.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                    >
                      🔁
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ArticleList;

import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { Link, useNavigate } from "react-router-dom";

const BonLivraisonList = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const [blData, setBlData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/bonLivraison")
      .then((response) => {
        setBlData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const destroy = async (id) => {
    if (
      confirm(
        "Si vous supprimez ce bl, tous les detailbl et reglement à propos de lui seront également supprimés"
      )
    ) {
      try {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.delete(
          "http://localhost:8000/bonLivraison/destroy",
          { data: { id } },
          { headers }
        );
        axios
          .get("http://localhost:8000/bonLivraison")
          .then((response) => {
            setBlData(response.data);
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
        <h1 className="text-2xl font-bold mb-10">
          Liste des Bons de Livraison
        </h1>
        <table className="w-full my-10 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-center">Id</th>
              <th className="py-2 px-4 border text-center">Date</th>
              <th className="py-2 px-4 border text-center">Regle</th>
              <th className="py-2 px-4 border text-center">Client_id</th>
              <th className="py-2 px-4 border text-center">Caissier_id</th>
              <th className="py-2 px-4 border text-center">Supprimer</th>
              <th className="py-2 px-4 border text-center">Modifier</th>
              <th className="py-2 px-4 border text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {blData.map((bl) => {
              const isregle = parseInt(bl.regle);
              return (
                <tr key={bl.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{bl.id}</td>
                  <td className="py-2 px-4 border text-center">{bl.date}</td>
                  <td className="py-2 px-4 border text-center">
                    {isregle ? "Oui" : "Non"}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {bl.client_id}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {bl.caissier_id}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => destroy(bl.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <Link
                      to={`/BonLivraisonUpdate/${bl.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                    >
                      🔁
                    </Link>{" "}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button className="bg-gray-500 text-white p-2 rounded hover:bg-blue-700">
                      <Link to={`/Det/${bl.id}`}>Details</Link>
                    </button>
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

export default BonLivraisonList;

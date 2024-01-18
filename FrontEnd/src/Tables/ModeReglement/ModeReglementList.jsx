import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { Link, useNavigate } from "react-router-dom";

const ModeReglementList = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const [mrData, setMrData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/modeReglement")
      .then((response) => {
        setMrData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error : ", error);
        setLoading(false);
      });
  }, []);

  const destroy = async (id) => {
    if (
      confirm(
        "Si vous supprimez ce mode de règlement, tous les règlements qui ont ce mode seront également supprimés"
      )
    ) {
      try {
        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.delete(
          "http://localhost:8000/modeReglement/destroy",
          { data: { id } },
          { headers }
        );
        setMrData((prevData) => prevData.filter((mr) => mr.id !== id));

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
          Liste des Modes de Règlement
        </h1>
        <Link
          to="/ModeReglementForm"
          className="menu-link text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Ajouter un mode de règlement
        </Link>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse my-10 border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-center">Id</th>
                <th className="py-2 px-4 border text-center">Mode</th>
                <th className="py-2 px-4 border text-center">Supprimer</th>
                <th className="py-2 px-4 border text-center">Modifier</th>
              </tr>
            </thead>
            <tbody>
              {mrData.map((mr) => (
                <tr key={mr.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{mr.id}</td>
                  <td className="py-2 px-4 border text-center">{mr.mode}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => destroy(mr.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <Link
                      to={`/ModeReglementUpdate/${mr.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                    >
                      🔁
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ModeReglementList;

import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../Menu";

import { Link, useNavigate } from "react-router-dom";

const ReglementList = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const [reglementData, setReglementData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/reglement")
      .then((response) => {
        setReglementData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const destroy = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      const response = await axios.delete(
        "http://localhost:8000/reglement/destroy",
        { data: { id } },
        { headers }
      );
      axios
        .get("http://localhost:8000/reglement")
        .then((response) => {
          setReglementData(response.data);
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-10">List des Reglements</h1>
        <table className="w-full border-collapse border border-gray-300 my-10">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-center">Id</th>
              <th className="py-2 px-4 border text-center">Date</th>
              <th className="py-2 px-4 border text-center">Montant</th>
              <th className="py-2 px-4 border text-center">Bl_id</th>
              <th className="py-2 px-4 border text-center">Mode_id</th>
              <th className="py-2 px-4 border text-center">Supprimer</th>
              <th className="py-2 px-4 border text-center">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {reglementData.map((reg) => {
              return (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{reg.id}</td>
                  <td className="py-2 px-4 border text-center">{reg.date}</td>
                  <td className="py-2 px-4 border text-center">
                    {reg.montant} DH
                  </td>
                  <td className="py-2 px-4 border text-center">{reg.bl_id}</td>
                  <td className="py-2 px-4 border text-center">
                    {reg.mode_id}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => destroy(reg.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                    >
                      ❌
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <Link
                      to={`/ReglementUpdate/${reg.id}`}
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

export default ReglementList;

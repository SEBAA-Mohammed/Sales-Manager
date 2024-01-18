import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate, useParams } from "react-router-dom";
const DetailBlList = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);
  const { id: idbl } = useParams();
  const [detailBlData, setDetailBlData] = useState([]);
  const [blData, setBlData] = useState([]);
  const [caissier, setCaissier] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/bonLivraison/show?id=${idbl}`)
      .then((response) => {
        setBlData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
    axios
      .get(`http://localhost:8000/caissier/show?id=${blData.caissier_id}`)
      .then((response) => {
        setCaissier(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
    if (blData.client_id !== undefined) {
      axios
        .get(`http://localhost:8000/client/show?id=${blData.client_id}`)
        .then((response) => {
          setClient(response.data);
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    }
    axios
      .get(`http://localhost:8000/detailBl?id=${idbl}`)
      .then((response) => {
        setDetailBlData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, [idbl, blData.caissier_id, blData.client_id]);

  const totalrows = detailBlData
    .reduce((acc, dbl) => {
      const rowTotal =
        parseFloat(dbl.prix_ht) * parseFloat(dbl.qte) +
        parseFloat(dbl.tva) * parseFloat(dbl.prix_ht);
      return acc + parseFloat(rowTotal);
    }, 0)
    .toFixed(2);

  return (
    <>
      <Menu />
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-teal-600 mb-4">
          Infos du Bon de livraison
        </h1>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-bold text-center">ID :</td>
              <td className="p-2 text-center">{blData.id}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold text-center">Date :</td>
              <td className="p-2 text-center">{blData.date}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold text-center">Regle :</td>
              <td className="p-2 text-center">
                {parseInt(blData.regle) ? "Oui" : "Non"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold text-center">Client :</td>
              <td className="p-2 text-center">
                {client.nom} {client.prenom}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-bold text-center">Caissier :</td>
              <td className="p-2 text-center">
                {caissier.nom} {caissier.prenom}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-teal-600 mb-10">
          List des DetailBl
        </h1>
        <table className="w-full my-10 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-center">Article</th>
              <th className="py-2 px-4 border text-center">Prix_ht</th>
              <th className="py-2 px-4 border text-center">qte</th>
              <th className="py-2 px-4 border text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {detailBlData.map((dbl) => {
              return (
                <tr key={dbl.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">
                    {dbl.designation}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {dbl.prix_ht}
                  </td>
                  <td className="py-2 px-4 border text-center">{dbl.qte}</td>
                  <td className="py-2 px-4 border text-center">
                    {(
                      parseFloat(dbl.prix_ht) * parseFloat(dbl.qte) +
                      parseFloat(dbl.tva) * parseFloat(dbl.prix_ht)
                    ).toFixed(2)}{" "}
                    DH
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="relative overflow-hidden mx-80 bg-white rounded-lg shadow w-60 md:w-72">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm font-medium leading-5 text-gray-500 truncate">
                TTC :
              </dt>
              <dd className="mt-1 text-teal-600 text-3xl font-semibold leading-9 text-gray-900">
                {totalrows} DH
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBlList;

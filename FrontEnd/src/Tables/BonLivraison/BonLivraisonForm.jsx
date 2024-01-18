import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import { useNavigate } from "react-router-dom";

const BonLivraisonForm = () => {
  const loginId = localStorage.getItem("loginId");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

  const [clientData, setClientData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [modeData, setModeData] = useState([]);

  const [caissier, setCaissier] = useState("");
  const id = loginId;

  const [bl_id, setBl_id] = useState();

  const currentDate = new Date().toISOString().split("T")[0];

  const [blData, setBlData] = useState({
    date: currentDate,
    regle: "0",
    client_id: "",
    caissier_id: id,
  });

  const [mode_id, setMode_id] = useState();

  const [articlesList, setArticlesList] = useState([]);

  const [total, setTotal] = useState(0);

  const reglementData = {
    date: currentDate,
    montant: total,
    bl_id: bl_id,
    mode_id: mode_id,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/caissier/show?id=${id}`)
      .then((response) => {
        setCaissier(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/bonLivraison/nextId")
      .then((response) => {
        setBl_id(response.data.next_id);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
    axios
      .get("http://localhost:8000/client")
      .then((response) => {
        setClientData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
    axios
      .get("http://localhost:8000/article")
      .then((response) => {
        setArticleData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
    axios
      .get("http://localhost:8000/modeReglement")
      .then((response) => {
        setModeData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const handleBlData = (e) => {
    const { name, value } = e.target;
    setBlData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    let newTotal = 0;
    articlesList.forEach((article) => {
      newTotal +=
        parseFloat(article.prix_ht) * parseFloat(article.qte) +
        parseFloat(article.tva) * parseFloat(article.prix_ht);
    });
    setTotal(newTotal);
  };

  const handlearticle = (id) => {
    axios
      .get(`http://localhost:8000/article/show?id=${id}`)
      .then((response) => {
        const articleData = response.data;
        if (id !== "") {
          const existingArticle = articlesList.find(
            (art) => art.id === articleData.id
          );

          if (existingArticle) {
            setArticlesList((prevArticlesList) =>
              prevArticlesList.map((art) =>
                art.id === existingArticle.id
                  ? { ...art, qte: art.qte + 1 }
                  : art
              )
            );
          } else {
            setArticlesList((prevArticlesList) => [
              ...prevArticlesList,
              {
                id: articleData.id,
                designation: articleData.designation,
                qte: 1,
                prix_ht: articleData.prix_ht,
                tva: articleData.tva,
                stock: articleData.stock,
              },
            ]);
          }
          calculateTotal();
        }
      })
      .catch((error) => {
        console.error("Error fetching article data:", error);
      });
  };

  useEffect(() => {
    calculateTotal(); // Call calculateTotal when articlesList changes
  }, [articlesList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.post("http://localhost:8000/bonLivraison/store", blData, {
        headers,
      });
      alert("BonLivraison bien ajouté");
      navigate("/BonLivraisonList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
    if (blData.regle) {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        await axios.post(
          "http://localhost:8000/reglement/store",
          reglementData,
          {
            headers,
          }
        );
        alert("Reglement bien ajouté");
        navigate("/ReglementList");
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
    const deatilBlData = articlesList.map((art) => ({
      article_id: art.id,
      qte: art.qte,
      bl_id: bl_id,
    }));
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.post(
        "http://localhost:8000/detailBl/storeCollection",
        deatilBlData,
        {
          headers,
        }
      );
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  console.log(blData.regle);

  return (
    <>
      <Menu />
      <div className="max-w-7xl mx-auto mt-30 p-4 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold my-8">Nouveau bon de livraison</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center">
            <h1 className="text-1xl text-gray-600 font-bold my-10 basis-1/2">
              Caissier : {caissier.nom} {caissier.prenom}
            </h1>
            <label
              htmlFor="1"
              className="block text-gray-600 font-bold mb-1 basis-1/8 mr-5"
            >
              Date:
            </label>
            <input
              readOnly
              type="date"
              name="date"
              id="1"
              value={blData.date}
              className="w-full border border-gray-300 rounded p-2 basis-1/3"
            />
          </div>
          <div className="mb-4 flex flex-row items-center">
            <label
              htmlFor="client_id"
              className="block text-sm font-semibold mb-1 basis-1/8 mr-5"
            >
              Client:
            </label>
            <select
              name="client_id"
              value={blData.client_id}
              onChange={handleBlData}
              className="block flex-1  px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Choisir Client</option>
              {clientData.map((cl) => (
                <option key={cl.id} value={cl.id}>
                  {cl.nom} {cl.prenom}
                </option>
              ))}
            </select>
            <label
              htmlFor="article_id"
              className="block text-sm font-semibold mb-1 basis-1/8 mx-10"
            >
              Article :
            </label>
            <select
              className="block px-3 flex-1  py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              onChange={(e) => {
                handlearticle(e.target.value);
                e.target.value = "";
              }}
            >
              <option value="">Choisir Article</option>
              {articleData.map((art) => (
                <option key={art.id} value={art.id}>
                  {art.designation}
                </option>
              ))}
            </select>
          </div>
          {articlesList.length > 0 ? (
            <>
              <table className="w-full my-5 border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <td className="py-2 px-4 border text-center">Article</td>
                    <td className="py-2 px-4 border text-center">Prix_ht</td>
                    <td className="py-2 px-4 border text-center">qte</td>
                    <td className="py-2 px-4 border text-center">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {articlesList.map((art) => (
                    <tr key={art.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border text-center">
                        {art.designation}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {art.prix_ht}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        <input
                          type="number"
                          name="qte"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={art.qte}
                          max={art.stock}
                          onChange={(e) => {
                            const newQte = parseInt(e.target.value, 10) || 0;
                            setArticlesList((prevArticlesList) =>
                              prevArticlesList.map((a) =>
                                a.id === art.id ? { ...a, qte: newQte } : a
                              )
                            );
                          }}
                        />
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {(
                          parseFloat(art.prix_ht) * parseFloat(art.qte) +
                          parseFloat(art.tva) * parseFloat(art.prix_ht)
                        ).toFixed(2)}{" "}
                        DH
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="relative overflow-hidden mx-80 bg-white rounded-lg shadow w-60 md:w-72">
                <div className="px-4 py-5 sm:p-6">
                  <dl>
                    <dt className="text-sm font-medium leading-5 text-gray-500 truncate">
                      TTC :
                    </dt>
                    <dd className="mt-1 text-teal-600 text-3xl font-semibold leading-9 text-gray-900">
                      {total} DH
                    </dd>
                  </dl>
                </div>
              </div>
            </>
          ) : (
            <p></p>
          )}
          <div className="flex flex-row items-center my-10">
            <div className="mb-4 mr-20">
              <label
                htmlFor="regle"
                className="block text-sm font-semibold mb-1 "
              >
                Réglé ?? :
              </label>
              <select
                name="regle"
                className="block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={blData.regle}
                onChange={handleBlData}
              >
                <option value="0">Non</option>
                <option value="1">Oui</option>
              </select>
            </div>
            {blData.regle === "1" && (
              <div className="mb-4">
                <label
                  htmlFor="mode_id"
                  className="block text-sm font-semibold mb-1"
                >
                  Choisir Mode de payement :
                </label>
                <select
                  className="block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={mode_id}
                  onChange={(e) => {
                    setMode_id(e.target.value);
                  }}
                >
                  {modeData.map((md) => (
                    <option key={md.id} value={md.id}>
                      {md.mode}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Valider
          </button>
          <button
            className="bg-teal-500 text-white mx-5 py-2 px-4 rounded hover:bg-teal-600"
            onClick={() => {
              navigate("/BonLivraisonList");
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </>
  );
};

export default BonLivraisonForm;

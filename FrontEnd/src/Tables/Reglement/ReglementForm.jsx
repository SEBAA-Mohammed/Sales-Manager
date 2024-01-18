import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";

import { useNavigate } from "react-router-dom";

const ReglementForm = () => {
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

  const [mrData, setMrData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/modeReglement")
      .then((response) => {
        setMrData(response.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    date: "",
    montant: "",
    bl_id: "",
    mode_id: "",
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
    console.log(formData);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.post("http://localhost:8000/reglement/store", formData, {
        headers,
      });
      alert("Reglement bien ajouté");
      navigate("/ReglementList");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <Menu />

      <div>
        <h1>Ajouter un nouveau reglement</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="1">Date :</label>
          <input
            type="date"
            name="date"
            id="1"
            value={formData.date}
            onChange={handleInputChange}
          />
          <label htmlFor="2">Montant :</label>
          <input
            type="text"
            name="montant"
            id="2"
            value={formData.montant}
            onChange={handleInputChange}
          />
          <select
            name="bl_id"
            value={formData.bl_id}
            onChange={handleInputChange}
          >
            <option value="">choisir Bon de livraison</option>
            {blData.map((bl) => {
              return (
                <option key={bl.id} value={bl.id}>
                  {bl.id}
                </option>
              );
            })}
          </select>
          <select
            name="mode_id"
            value={formData.mode_id}
            onChange={handleInputChange}
          >
            <option value="">choisir mode</option>
            {mrData.map((mr) => {
              return (
                <option key={mr.id} value={mr.id}>
                  {mr.mode}
                </option>
              );
            })}
          </select>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </>
  );
};

export default ReglementForm;

import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const loginId = localStorage.getItem("loginId");
  const id = loginId;
  const [caissier, setCaissier] = useState("");

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
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <span className="menu-link text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {caissier.nom} {caissier.prenom}
          </span>
        </li>
        <li>
          <Link
            className="menu-link text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            to="/Login"
            onClick={() => {
              localStorage.setItem("isLoggedIn", false);
            }}
          >
            Deconnexion
          </Link>
        </li>
        <li>
          <Link
            className="menu-link vwm hover:border-b-2 border-white"
            to="/ArticleList"
          >
            Article
          </Link>
        </li>
        <li>
          <Link
            className="menu-link hover:border-b-2 border-white"
            to="/FamilleList"
          >
            Famille
          </Link>
        </li>
        <li>
          <Link
            className="menu-link hover:border-b-2 border-white"
            to="/CaissierList"
          >
            Employés
          </Link>
        </li>
        <li>
          <Link
            className="menu-link hover:border-b-2 border-white"
            to="/ClientList"
          >
            Client
          </Link>
        </li>
        <li>
          <Link
            className="menu-link hover:border-b-2 border-white"
            to="/ModeReglementList"
          >
            ModeReglement
          </Link>
        </li>
        <li>
          <Link
            className="menu-link hover:border-b-2 border-white"
            to="/ReglementList"
          >
            Reglement
          </Link>
        </li>
        <li>
          <Link
            className="menu-link hover:border-b-2 border-white"
            to="/BonLivraisonList"
          >
            BonLivraison
          </Link>
        </li>
        <li>
          <Link
            className="menu-link text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            to="/BonLivraisonForm"
          >
            New BL
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

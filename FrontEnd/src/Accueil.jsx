import { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Accueil() {
  const loginId = localStorage.getItem("loginId");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

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
    <>
      <Menu />
      <div className="bg-white dark:bg-gray-800 ">
        <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h1 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">
              Bonjour Mr {caissier.nom} {caissier.prenom}
            </span>
            <span className="block text-teal-500">
              Bienvenue Dans Db Manager
            </span>
            <span className="block text-teal-500">Database : gecom</span>
          </h1>
        </div>
      </div>
    </>
  );
}

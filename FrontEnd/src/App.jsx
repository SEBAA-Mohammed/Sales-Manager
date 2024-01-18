import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Accueil from "./Accueil";
import Login from "./Login";

import FamilleList from "./Tables/Famille/FamilleList";
import FamilleForm from "./Tables/Famille/FamilleForm";
import FamilleUpdate from "./Tables/Famille/FamilleUpdate";

import CaissierList from "./Tables/Caissier/CaissierList";
import CaissierForm from "./Tables/Caissier/CaissierForm";
import CaissierUpdate from "./Tables/Caissier/CaissierUpdate";

import ClientList from "./Tables/Client/ClientList";
import ClientForm from "./Tables/Client/ClientForm";
import ClientUpdate from "./Tables/Client/ClientUpdate";

import ModeReglementList from "./Tables/ModeReglement/ModeReglementList";
import ModeReglementForm from "./Tables/ModeReglement/ModeReglementForm";
import ModeReglementUpdate from "./Tables/ModeReglement/ModeReglementUpdate";

import BonLivraisonList from "./Tables/BonLivraison/BonLivraisonList";
import DetailBlList from "./Tables/BonLivraison/Det";
import BonLivraisonForm from "./Tables/BonLivraison/BonLivraisonForm";
import BonLivraisonUpdate from "./Tables/BonLivraison/BonLivraisonUpdate";
import DetailBlUpdate from "./Tables/BonLivraison/DetailBlUpdate";
import DetailBlForm from "./Tables/BonLivraison/DetailBlForm";

import ArticleList from "./Tables/Article/ArticleList";
import ArticleForm from "./Tables/Article/ArticleForm";
import ArticleUpdate from "./Tables/Article/ArticleUpdate";

import ReglementList from "./Tables/Reglement/ReglementList";
import ReglementForm from "./Tables/Reglement/ReglementForm";
import ReglementUpdate from "./Tables/Reglement/ReglementUpdate";
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if ("/" === pathname) {
      navigate("/Login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/Login"} replace />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/Accueil" element={<Accueil />} />

        <Route path="/ArticleList" element={<ArticleList />} />
        <Route path="/ArticleForm" element={<ArticleForm />} />
        <Route path="/ArticleUpdate/:id" element={<ArticleUpdate />} />

        <Route path="/FamilleList" element={<FamilleList />} />
        <Route path="/FamilleForm" element={<FamilleForm />} />
        <Route path="/FamilleUpdate/:id" element={<FamilleUpdate />} />

        <Route path="/CaissierList" element={<CaissierList />} />
        <Route path="/CaissierForm" element={<CaissierForm />} />
        <Route path="/CaissierUpdate/:id" element={<CaissierUpdate />} />

        <Route path="/ClientList" element={<ClientList />} />
        <Route path="/ClientForm" element={<ClientForm />} />
        <Route path="/ClientUpdate/:id" element={<ClientUpdate />} />

        <Route path="/ModeReglementList" element={<ModeReglementList />} />
        <Route path="/ModeReglementForm" element={<ModeReglementForm />} />
        <Route
          path="/ModeReglementUpdate/:id"
          element={<ModeReglementUpdate />}
        />

        <Route path="/BonLivraisonList" element={<BonLivraisonList />} />
        <Route path="/Det/:id" element={<DetailBlList />} />
        <Route path="/BonLivraisonForm" element={<BonLivraisonForm />} />
        <Route path="/DetailBlForm/:id" element={<DetailBlForm />} />
        <Route
          path="/BonLivraisonUpdate/:id"
          element={<BonLivraisonUpdate />}
        />
        <Route path="/DetailBlUpdate/:id" element={<DetailBlUpdate />} />

        <Route path="/ReglementList" element={<ReglementList />} />
        <Route path="/ReglementForm" element={<ReglementForm />} />
        <Route path="/ReglementUpdate/:id" element={<ReglementUpdate />} />
      </Routes>
    </>
  );
}

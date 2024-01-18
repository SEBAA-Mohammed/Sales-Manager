import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [err, setErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/caissier/login",
        formData
      );
      const { success, isAdmin, loginId } = response.data;

      if (success) {
        navigate("/Accueil");

        localStorage.setItem("loginId", loginId);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("isAdmin", isAdmin);
      } else {
        setErr("Email ou bien mot de passe est incorrect");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-semibold my-40  mb-5 text-center">
          Welcome to Database GECOM
        </h1>
        <h2 className="text-2xl text- font-semibold mb-4">Login</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          onFocus={() => {
            setErr("");
          }}
        >
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password:
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
          <p className="text-red-500 px-4 py-2 rounded-md focus:outline-none focus:ring">
            {err}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

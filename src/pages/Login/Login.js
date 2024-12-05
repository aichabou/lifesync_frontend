import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Button from "../../components/Buttons";
import { loginUser } from "../../api/api";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher les erreurs
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    try {
      // Appeler l'API pour se connecter
      const response = await loginUser({ email, password });
      const { token, user } = response.data;

      if (!token) {
        throw new Error("Le serveur n'a pas renvoyé de token.");
      }

      // Si la connexion est réussie
      localStorage.setItem("token", token);
      localStorage.setItem("userid", user.userid);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Erreur lors de la connexion:", err.message);
      setError("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-primary">Connexion</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <FormInput
            label="Adresse email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
          />
          <FormInput
            label="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
          />
          <Button
            type="submit"
            text="Se connecter"
            className="w-full mt-4 bg-primary text-white hover:bg-green-700"
          />
        </form>
        <p className="text-sm text-center mt-4">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-secondary hover:underline">
            Inscrivez-vous ici
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Button from "../../components/Buttons";
import { registerUser } from "../../api/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); // Pour gérer les erreurs de validation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    // Validation du nom d'utilisateur
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est obligatoire.";
    } else if (formData.username.length < 3) {
      newErrors.username =
        "Le nom d'utilisateur doit comporter au moins 3 caractères.";
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse email n'est pas valide.";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est obligatoire.";
    } else {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Le mot de passe doit comporter au moins 6 caractères, une majuscule et un caractère spécial.";
      }
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "La confirmation du mot de passe est obligatoire.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Renvoie true si aucun champ n'a d'erreur
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert("Inscription réussie !");
      // Redirection ou autre action après l'inscription
    } catch (err) {
      console.error("Erreur d’inscription :", err.message);
      alert("Erreur lors de l’inscription.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
          Inscription
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Nom d'utilisateur"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Entrez votre nom d'utilisateur"
            error={errors.username}
          />
          <FormInput
            label="Adresse email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Entrez votre email"
            error={errors.email}
          />
          <FormInput
            label="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Entrez votre mot de passe"
            error={errors.password}
          />
          <FormInput
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirmez votre mot de passe"
            error={errors.confirmPassword}
          />
          <Button
            type="submit"
            text="S'inscrire"
            className="w-full bg-primary text-white py-2 hover:bg-green-700 transition"
          />
        </form>
        <p className="text-sm text-center mt-4">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Connectez-vous ici
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;

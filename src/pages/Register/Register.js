import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import Button from '../../components/Buttons';
import { registerUser } from '../../api/api';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            newErrors.username = "Le nom d'utilisateur doit comporter au moins 3 caractères.";
        }

        // Validation de l'email
        if (!formData.email.trim()) {
            newErrors.email = "L'adresse email est obligatoire.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'adresse email n'est pas valide.";
        }

        // Validation du mot de passe
        if (!formData.password) {
            newErrors.password = 'Le mot de passe est obligatoire.';
        } else {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
            if (!passwordRegex.test(formData.password)) {
                newErrors.password =
                    'Le mot de passe doit comporter au moins 6 caractères, une majuscule et un caractère spécial.';
            }
        }

        // Validation de la confirmation du mot de passe
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'La confirmation du mot de passe est obligatoire.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
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
            alert('Inscription réussie !');
            // Redirection ou autre action après l'inscription
        } catch (err) {
            console.error('Erreur d’inscription :', err.message);
            alert('Erreur lors de l’inscription.');
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: 'auto', marginTop: '2rem' }}>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Entrez votre nom d'utilisateur"
                    error={errors.username} // Affiche l'erreur pour ce champ
                />
                <FormInput
                    label="Email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Entrez votre email"
                    error={errors.email} // Affiche l'erreur pour ce champ
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Entrez votre mot de passe"
                    error={errors.password} // Affiche l'erreur pour ce champ
                />
                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirmez votre mot de passe"
                    error={errors.confirmPassword} // Affiche l'erreur pour ce champ
                />
                <Button type="submit" text="Register" />
            </form>
            <p>
                Already signed up? <Link to="/login">Login here</Link>.
            </p>
        </div>
    );
};

export default Register;

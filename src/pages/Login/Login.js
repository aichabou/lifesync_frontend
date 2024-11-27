import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import Button from '../../components/Buttons';
import { loginUser } from '../../api/api'; // Importez la fonction API pour la connexion

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Pour afficher les erreurs
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation des champs
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Veuillez entrer une adresse email valide.');
            return;
        }

        try {
            // Appeler l'API pour se connecter
            const response = await loginUser({ email, password });
            console.log('Réponse du serveur:', response.data);

            // Si la connexion est réussie
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', response.data.user.userid); // Enregistrer l'ID utilisateur
            setIsLoggedIn(true);
            navigate('/dashboard'); // Rediriger vers le dashboard après connexion
        } catch (err) {
            console.error('Erreur lors de la connexion:', err.response?.data?.error || err.message);
            setError(err.response?.data?.error || 'Une erreur est survenue lors de la connexion.');
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: 'auto', marginTop: '2rem' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affiche les erreurs */}
                <FormInput
                    label="Email address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre email"
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                />
                <Button type="submit" text="Login" />
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import Button from '../../components/Buttons';
import { loginUser } from '../../api/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData);
            alert('Connexion réussie !');
            navigate('/tasks'); // Redirection vers les tâches après connexion
        } catch (err) {
            console.error('Erreur de connexion :', err.message);
            alert('Erreur lors de la connexion.');
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: 'auto', marginTop: '2rem' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Entrez votre email"
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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

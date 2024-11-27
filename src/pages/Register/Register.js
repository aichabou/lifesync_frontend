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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            alert('Inscription réussie !');
        } catch (err) {
            console.error('Erreur d’inscription :', err.message);
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
                />
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
                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirmez votre mot de passe"
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

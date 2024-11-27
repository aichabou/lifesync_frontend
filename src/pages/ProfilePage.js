import React from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const handleDeleteAccount = async () => {
        try {
            await axios.delete('http://localhost:3000/api/user', { withCredentials: true });
            alert('Votre compte a été supprimé avec succès.');
            // Redirige vers la page d'accueil ou de connexion
            window.location.href = '/login';
        } catch (err) {
            console.error('Erreur lors de la suppression du compte :', err.message);
            alert('Une erreur est survenue.');
        }
    };

    return (
        <div>
            <h1>Mon Profil</h1>
            <button onClick={handleDeleteAccount} style={{ color: 'red' }}>Supprimer mon compte</button>
        </div>
    );
};

export default ProfilePage;

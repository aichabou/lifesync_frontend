import {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token'); // Récupère le token
    if (!token) {
        console.error("Aucun token trouvé. L'utilisateur doit être connecté.");
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        return decoded.userid; // Assurez-vous que le backend inclut le champ `userid` dans le JWT
    } catch (err) {
        console.error('Erreur lors du décodage du token JWT :', err.message);
        return null;
    }
};

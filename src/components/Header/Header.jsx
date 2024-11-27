import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout(); // Appelle la fonction de déconnexion
        navigate('/login'); // Redirige vers la page de connexion
    };

    const handleProfileClick = () => {
        navigate("/profilePage"); // Redirige vers la page de profil
    };

    const handleNotificationsClick = () => {
        alert("Vous avez 0 nouvelles notifications."); // Action pour les notifications
    };

    return (
        <header style={styles.header}>
            {/* Logo */}
            <div style={styles.logoContainer}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={styles.logo}
                    onClick={() => navigate("/dashboard")} // Redirige vers le tableau de bord
                />
            </div>
            <div>
                <button onClick={handleLogout}>Déconnexion</button>
            </div>
            {/* Icônes (Notifications et Avatar) */}
            <div style={styles.iconsContainer}>
                {/* Notifications */}
                <button
                    style={styles.iconButton}
                    onClick={handleNotificationsClick}
                >
                    🔔 {/* Emoji de notification (remplacez par une icône si nécessaire) */}
                </button>

                {/* Avatar */}
                <div
                    style={styles.avatar}
                    onClick={handleProfileClick}
                >
                    <img
                        src="/avatar.png"
                        alt="Avatar"
                        style={styles.avatarImage}
                    />
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa", // Couleur d'arrière-plan du header
        borderBottom: "1px solid #e9ecef", // Ligne pour séparer le header
    },
    logoContainer: {
        cursor: "pointer",
    },
    logo: {
        height: "40px", // Taille du logo
    },
    iconsContainer: {
        display: "flex",
        alignItems: "center",
        gap: "15px", // Espacement entre les icônes
    },
    iconButton: {
        fontSize: "20px", // Taille de l'icône de notification
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
    },
    avatar: {
        cursor: "pointer",
        borderRadius: "50%",
        overflow: "hidden",
        width: "40px",
        height: "40px",
        border: "2px solid #ccc",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover", // Adapte l'image à l'avatar
    },
};

export default Header;

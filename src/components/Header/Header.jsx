import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "../Buttons";

const Header = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      alert("Compte supprimé avec succès."); // Intégrez ici la logique API pour supprimer le compte.
      navigate("/login");
    }
  };

  const handleNotificationsClick = () => {
    alert("Vous avez 0 nouvelles notifications.");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleAvatarMenu = () => {
    setAvatarMenuOpen(!avatarMenuOpen);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img
            src="/img/logo_lifesync.png"
            alt="Logo"
            className="h-14 md:h-35"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className="text-2xl text-secondary bg-transparent border-none cursor-pointer"
            onClick={handleNotificationsClick}
          >
            🔔
          </button>
          {/* Avatar with dropdown menu */}
          <div className="relative">
            <div
              className="cursor-pointer rounded-full w-10 h-10 border-2 border-primary overflow-hidden"
              onClick={toggleAvatarMenu}
            >
              <img
                src="/img/avatar_user.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-40 z-50">
                <button
                  className="w-full text-left text-red-500 hover:text-red-600 py-2 border-b border-gray-200"
                  onClick={handleDeleteAccount}
                >
                  Supprimer mon compte
                </button>
                <button
                  className="w-full text-left text-gray-700 hover:text-gray-900 py-2"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
          {/* <Button
            text="Déconnexion"
            onClick={handleLogout}
            variant="default"
          /> */}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-2xl text-secondary bg-transparent border-none cursor-pointer"
            onClick={toggleMenu}
          >
            ☰ {/* Menu burger icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-end mt-4 space-y-3 text-sm">
          <button
            className="text-lg text-secondary bg-transparent border-none cursor-pointer"
            onClick={handleNotificationsClick}
          >
            🔔
          </button>
          <div className="relative">
            <div
              className="cursor-pointer rounded-full w-8 h-8 border-2 border-primary overflow-hidden"
              onClick={toggleAvatarMenu}
            >
              <img
                src="/img/avatar_user.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-40 z-50">
                <button
                  className="w-full text-left text-red-500 hover:text-red-600 py-2 border-b border-gray-200"
                  onClick={handleDeleteAccount}
                >
                  Supprimer mon compte
                </button>
                <button
                  className="w-full text-left text-gray-700 hover:text-gray-900 py-2"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

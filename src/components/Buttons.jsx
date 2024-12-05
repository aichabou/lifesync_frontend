import React from "react";

const Button = ({ text, onClick, type = "button", variant = "default", className = "" }) => {
  const baseStyle = "px-4 py-2 rounded transition font-medium";
  const variants = {
    default: "bg-primary text-white hover:bg-green-600", // Par défaut (bouton vert)
    outlineYellow: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-black", // Bouton avec bordure jaune
    filledAccent: "bg-accent text-white hover:bg-orange-600", // Bouton rempli en accent (orange)
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white py-6 text-center border-t border-gray-200">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                {/* Logo ou Nom du projet */}
                <div className="mb-4 md:mb-0">
                    <a href="/" className="flex items-center text-primary font-bold text-xl">
                        <img src="/img/logo_lifesync.png" alt="LifeSync Logo" className="h-14 md:h-35" />
                    </a>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
                    <a href="/privacy-policy" className="text-gray-700 hover:text-primary transition">
                        Politique de confidentialité
                    </a>
                    <a href="mailto:support@lifesync.com" className="text-gray-700 hover:text-primary transition">
                        Contactez-nous
                    </a>
                </div>

                {/* Mentions légales */}
                <div className="text-sm text-gray-500">
                    © {new Date().getFullYear()} <span className="text-primary">LifeSync</span>. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState, useEffect } from 'react';

const CookiesConsent = () => {
    const [isConsentGiven, setIsConsentGiven] = useState(false);

    useEffect(() => {
        // Vérifie si l'utilisateur a déjà donné son consentement
        const consent = localStorage.getItem('cookiesConsent');
        if (consent === 'true') {
            setIsConsentGiven(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesConsent', 'true');
        setIsConsentGiven(true);
    };

    const handleReject = () => {
        localStorage.setItem('cookiesConsent', 'false');
        setIsConsentGiven(true);
    };

    if (isConsentGiven) {
        return null; // Si le consentement est donné, ne rien afficher
    }

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex flex-col md:flex-row items-center justify-between shadow-lg z-50">
            <p className="text-gray-700 text-sm mb-4 md:mb-0">
                Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={handleAccept}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                >
                    Accepter
                </button>
                <button
                    onClick={handleReject}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                    Refuser
                </button>
            </div>
        </div>
    );
};

export default CookiesConsent;

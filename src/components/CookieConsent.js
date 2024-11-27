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
        <div>
            <p>
                Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.
            </p>
            <div>
                <button
                    onClick={handleAccept}
                >
                    Accepter
                </button>
                <button
                    onClick={handleReject}
                >
                    Refuser
                </button>
            </div>
        </div>
    );
};

export default CookiesConsent;

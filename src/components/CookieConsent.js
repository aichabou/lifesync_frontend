import React, { useState } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(!localStorage.getItem('cookiesAccepted'));

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', true);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{ position: 'fixed', bottom: 0, backgroundColor: 'lightgrey', padding: '10px', width: '100%' }}>
            <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.</p>
            <button onClick={handleAccept}>Accepter</button>
        </div>
    );
};

export default CookieConsent;

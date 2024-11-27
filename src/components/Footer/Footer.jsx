import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f9f9f9', padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Logo ou Nom du projet */}
                <div>
                    <a href="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
                        <img src="/logo.png" alt="LifeSync Logo" style={{ height: '40px' }} />
                    </a>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="/privacyPolicy" style={{ textDecoration: 'none', color: 'black' }}>Politique de confidentialité</a>
                    <a href="mailto:support@lifesync.com">Contactez-nous</a>
                </div>

                {/* Mentions légales */}
                <div>
                    <p style={{ margin: '0', fontSize: '14px' }}>
                        © {new Date().getFullYear()} LifeSync. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

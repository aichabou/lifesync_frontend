import React from 'react';

const PrivacyPolicy = () => (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Politique de confidentialité
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
            Chez <strong>LifeSync</strong>, nous respectons votre vie privée et nous engageons à protéger
            vos données personnelles. Cette politique de confidentialité explique comment nous collectons,
            utilisons et supprimons vos données.
        </p>

        <h2 className="text-2xl font-medium text-gray-700 mt-6 mb-3">1. Collecte de données</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
            Nous collectons uniquement les données nécessaires pour fournir nos services, telles que :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Votre nom et adresse email.</li>
            <li>Les informations de votre compte utilisateur.</li>
        </ul>

        <h2 className="text-2xl font-medium text-gray-700 mt-6 mb-3">2. Utilisation de vos données</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
            Nous utilisons vos données pour :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Personnaliser votre expérience utilisateur.</li>
            <li>Améliorer nos services et fonctionnalités.</li>
        </ul>

        <h2 className="text-2xl font-medium text-gray-700 mt-6 mb-3">3. Suppression de votre compte et de vos données</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
            Vous avez le droit de supprimer votre compte et toutes vos données associées à tout moment. Une
            fois supprimées, vos données seront effacées de manière permanente de notre système.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
            Pour supprimer votre compte, veuillez utiliser la fonction "Supprimer mon compte" dans votre
            espace utilisateur. Si vous avez des questions, contactez notre support à 
            <a href="mailto:support@lifesync.com" className="text-blue-500 underline">
                support@lifesync.com
            </a>.
        </p>

        <h2 className="text-2xl font-medium text-gray-700 mt-6 mb-3">4. Vos droits</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
            Conformément aux lois applicables, vous avez le droit de :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Consulter les données que nous avons collectées à votre sujet.</li>
            <li>Demander la modification ou la mise à jour de vos données.</li>
            <li>Supprimer votre compte et vos données personnelles.</li>
        </ul>

        <h2 className="text-2xl font-medium text-gray-700 mt-6 mb-3">5. Contact</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
            Si vous avez des questions concernant cette politique de confidentialité ou vos données, n'hésitez
            pas à nous contacter :
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
            Email : <a href="mailto:support@lifesync.com" className="text-blue-500 underline">
                support@lifesync.com
            </a>
        </p>
    </div>
);

export default PrivacyPolicy;

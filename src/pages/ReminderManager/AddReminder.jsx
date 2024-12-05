import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReminderHandler } from '../../api/api';

const AddReminder = () => {
    const [form, setForm] = useState({
        content: '',
        datetime: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddReminder = async (e) => {
        e.preventDefault();
        const userid = localStorage.getItem('userid');

        if (!userid) {
            alert('Utilisateur non identifié. Veuillez vous connecter.');
            return;
        }

        try {
            await createReminderHandler({ userid, ...form });
            alert('Rappel ajouté avec succès !');
            navigate('/dashboard'); // Redirige vers le dashboard après l'ajout
        } catch (err) {
            console.error('Erreur lors de l\'ajout du rappel :', err.message);
            alert('Impossible d\'ajouter le rappel.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 border border-gray-200">
            <h2 className="text-xl font-bold text-primary text-center mb-4">Ajouter un rappel</h2>
            <form onSubmit={handleAddReminder}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Contenu</label>
                    <input
                        type="text"
                        name="content"
                        value={form.content}
                        onChange={handleInputChange}
                        required
                        placeholder="Entrez un contenu"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Date et heure</label>
                    <input
                        type="datetime-local"
                        name="datetime"
                        value={form.datetime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-green-700 transition"
                >
                    Ajouter le rappel
                </button>
            </form>
        </div>
    );
};

export default AddReminder;

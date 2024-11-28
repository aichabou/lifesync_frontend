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
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <h2>Ajouter un rappel</h2>
            <form onSubmit={handleAddReminder}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Contenu</label>
                    <input
                        type="text"
                        name="content"
                        value={form.content}
                        onChange={handleInputChange}
                        required
                        placeholder="Entrez un contenu"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Date et heure</label>
                    <input
                        type="datetime-local"
                        name="datetime"
                        value={form.datetime}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Ajouter le rappel
                </button>
            </form>
        </div>
    );
};

export default AddReminder;

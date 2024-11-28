import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTaskHandler } from '../../api/api';
import { getUserIdFromToken } from '../../utils/auth';

const AddTask = () => {
    const [form, setForm] = useState({
        description: '',
        deadline: '',
        priority: 'low',
        status: 'pending',
    });

    const navigate = useNavigate();

    // Gestion des champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Fonction pour ajouter une tâche
    const handleAddTask = async (e) => {
        e.preventDefault();
        const userid = getUserIdFromToken();// Récupère l'ID utilisateur depuis le stockage local

        if (!userid) {
            alert('Utilisateur non identifié. Veuillez vous connecter.');
            return;
        }

        try {
            // Appel API pour créer une tâche
            await createTaskHandler({ userid, ...form });
            alert('Tâche ajoutée avec succès !');
            navigate('/dashboard'); // Redirige vers la liste des tâches après l'ajout
        } catch (err) {
            console.error('Erreur lors de l\'ajout de la tâche :', err.message);
            alert('Impossible d\'ajouter la tâche.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <h2>Ajouter une tâche</h2>
            <form onSubmit={handleAddTask}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={form.description || ""}
                        onChange={handleInputChange}
                        required
                        placeholder="Entrez une description"
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Date limite</label>
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Priorité</label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Statut</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="pending">En attente</option>
                        <option value="done">Terminée</option>
                    </select>
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Ajouter la tâche
                </button>
            </form>
        </div>
    );
};

export default AddTask;

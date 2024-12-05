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
        const userid = getUserIdFromToken(); // Récupère l'ID utilisateur depuis le stockage local

        if (!userid) {
            alert('Utilisateur non identifié. Veuillez vous connecter.');
            return;
        }

        try {
            // Appel API pour créer une tâche
            await createTaskHandler({ userid, ...form });
            alert('Tâche ajoutée avec succès !');
            navigate('/dashboard'); // Redirige vers le tableau de bord après l'ajout
        } catch (err) {
            console.error('Erreur lors de l\'ajout de la tâche :', err.message);
            alert('Impossible d\'ajouter la tâche.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold text-primary text-center mb-6">
                Ajouter une tâche
            </h2>
            <form onSubmit={handleAddTask} className="space-y-4">
                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={form.description || ""}
                        onChange={handleInputChange}
                        required
                        placeholder="Entrez une description"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                {/* Date limite */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Date limite
                    </label>
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                {/* Priorité */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Priorité
                    </label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleInputChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </select>
                </div>

                {/* Statut */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Statut
                    </label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleInputChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="pending">En attente</option>
                        <option value="done">Terminée</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600 transition"
                >
                    Ajouter la tâche
                </button>
            </form>
        </div>
    );
};

export default AddTask;

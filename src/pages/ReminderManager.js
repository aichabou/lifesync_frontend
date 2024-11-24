import React, { useState, useEffect } from 'react';
import { fetchReminders, createReminder, updateReminder, deleteReminder } from '../api';

const ReminderManager = () => {
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState({ content: '', datetime: '' });
    const [editingReminder, setEditingReminder] = useState(null);

    // Fetch reminders on component load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userid = 1; // Exemple : Utilisateur avec ID 1
                const response = await fetchReminders(userid);
                setReminders(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Erreur lors de la récupération des reminders:', error);
            }
        };
        fetchData();
    }, []);

    // Handle form inputs for creating a reminder
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReminder({ ...newReminder, [name]: value });
    };

    // Add a new reminder
    const handleAddReminder = async (e) => {
        e.preventDefault();
        try {
            const userid = 1; // Exemple : Utilisateur avec ID 1
            const response = await createReminder({ ...newReminder, userid });
            setReminders([...reminders, response.data]);
            setNewReminder({ content: '', datetime: '' });
        } catch (error) {
            console.error('Erreur lors de l’ajout du reminder:', error);
        }
    };

    // Update a reminder
    const handleUpdateReminder = async (reminderId, updatedData) => {
        try {
            const response = await updateReminder(reminderId, updatedData);
            setReminders(
                reminders.map((reminder) =>
                    reminder.reminderid === reminderId ? response.data : reminder
                )
            );
            setEditingReminder(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du reminder:', error);
        }
    };

    // Delete a reminder
    const handleDeleteReminder = async (reminderId) => {
        try {
            await deleteReminder(reminderId);
            setReminders(reminders.filter((reminder) => reminder.reminderid !== reminderId));
        } catch (error) {
            console.error('Erreur lors de la suppression du reminder:', error);
        }
    };

    return (
        <div>
            <h1>Gestion des Rappels</h1>

            {/* Formulaire pour ajouter un nouveau rappel */}
            <form onSubmit={handleAddReminder}>
                <input
                    type="text"
                    name="content"
                    value={newReminder.content}
                    onChange={handleInputChange}
                    placeholder="Contenu du rappel"
                    required
                />
                <input
                    type="datetime-local"
                    name="datetime"
                    value={newReminder.datetime}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Ajouter un rappel</button>
            </form>

            {/* Liste des rappels */}
            <div>
                <h2>Liste des rappels</h2>
                {Array.isArray(reminders) && reminders.length > 0 ? (
                    reminders.map((reminder) => (
                        <div key={reminder.reminderid}>
                            {editingReminder === reminder.reminderid ? (
                                // Formulaire de modification
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdateReminder(reminder.reminderid, newReminder);
                                    }}
                                >
                                    <input
                                        type="text"
                                        name="content"
                                        defaultValue={reminder.content}
                                        onChange={(e) =>
                                            setNewReminder({
                                                ...newReminder,
                                                content: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="datetime-local"
                                        name="datetime"
                                        defaultValue={reminder.datetime}
                                        onChange={(e) =>
                                            setNewReminder({
                                                ...newReminder,
                                                datetime: e.target.value,
                                            })
                                        }
                                    />
                                    <button type="submit">Enregistrer</button>
                                    <button type="button" onClick={() => setEditingReminder(null)}>
                                        Annuler
                                    </button>
                                </form>
                            ) : (
                                <div>
                                    <p>{reminder.content}</p>
                                    <p>
                                        {new Date(reminder.datetime).toLocaleString('fr-FR', {
                                            dateStyle: 'short',
                                            timeStyle: 'short',
                                        })}
                                    </p>
                                    <button onClick={() => setEditingReminder(reminder.reminderid)}>
                                        Modifier
                                    </button>
                                    <button onClick={() => handleDeleteReminder(reminder.reminderid)}>
                                        Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Aucun rappel trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default ReminderManager;

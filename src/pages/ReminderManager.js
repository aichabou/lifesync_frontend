import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    fetchReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    getTasks, // Pour récupérer les tâches
} from '../api';

const ReminderManager = () => {
    const [reminders, setReminders] = useState([]);
    const [tasks, setTasks] = useState([]); // Pour stocker les tâches
    const [newReminder, setNewReminder] = useState({ content: '', datetime: '' });
    const [editingReminder, setEditingReminder] = useState(null);

    // Récupération des rappels et des tâches au chargement
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userid = 1; // Exemple d'utilisateur ID
                const reminderResponse = await fetchReminders(userid);
                const taskResponse = await getTasks(userid);

                setReminders(Array.isArray(reminderResponse.data) ? reminderResponse.data : []);
                setTasks(Array.isArray(taskResponse.data) ? taskResponse.data : []);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, []);

    // Notification pour les tâches proches de leur deadline
    useEffect(() => {
        const checkDeadlines = () => {
            const now = new Date();
            tasks.forEach((task) => {
                const deadline = new Date(task.deadline);
                const timeLeft = deadline - now;

                // Notifie si la tâche est dans les 24 heures
                if (timeLeft > 0 && timeLeft <= 24 * 60 * 60 * 1000) {
                    toast.warning(`La tâche "${task.description}" approche de sa deadline !`);
                }
            });
        };

        const interval = setInterval(checkDeadlines, 60 * 1000); // Vérification chaque minute
        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, [tasks]);

    // Notification pour les rappels proches de leur datetime
    useEffect(() => {
        const checkReminders = () => {
            const now = new Date();
            reminders.forEach((reminder) => {
                const reminderTime = new Date(reminder.datetime);
                const timeLeft = reminderTime - now;

                // Notifie si le rappel est dans les 10 minutes
                if (timeLeft > 0 && timeLeft <= 10 * 60 * 1000) {
                    toast.info(`Rappel imminent : "${reminder.content}" prévu à ${reminderTime.toLocaleTimeString('fr-FR')}`);
                }
            });
        };

        const interval = setInterval(checkReminders, 60 * 1000); // Vérification chaque minute
        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, [reminders]);

    // Gestion des champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReminder({ ...newReminder, [name]: value });
    };

    // Ajouter un rappel
    const handleAddReminder = async (e) => {
        e.preventDefault();
        try {
            const userid = 1; // Exemple d'utilisateur ID
            const response = await createReminder({ ...newReminder, userid });
            setReminders([...reminders, response.data]);
            setNewReminder({ content: '', datetime: '' });
            toast.success('Rappel ajouté avec succès !');
        } catch (error) {
            console.error('Erreur lors de l’ajout du rappel :', error);
            toast.error('Impossible d’ajouter le rappel.');
        }
    };

    // Mettre à jour un rappel
    const handleUpdateReminder = async (reminderId, updatedData) => {
        try {
            const response = await updateReminder(reminderId, updatedData);
            setReminders(
                reminders.map((reminder) =>
                    reminder.reminderid === reminderId ? response.data : reminder
                )
            );
            setEditingReminder(null);
            toast.success('Rappel mis à jour avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rappel :', error);
            toast.error('Impossible de mettre à jour le rappel.');
        }
    };

    // Supprimer un rappel
    const handleDeleteReminder = async (reminderId) => {
        try {
            await deleteReminder(reminderId);
            setReminders(reminders.filter((reminder) => reminder.reminderid !== reminderId));
            toast.info('Rappel supprimé.');
        } catch (error) {
            console.error('Erreur lors de la suppression du rappel :', error);
            toast.error('Impossible de supprimer le rappel.');
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

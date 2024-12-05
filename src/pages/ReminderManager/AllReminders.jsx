import React, { useEffect, useState } from "react";
import { getRemindersHandler, updateReminderHandler, deleteReminderHandler } from "../../api/api";

const AllReminders = () => {
    const [reminders, setReminders] = useState([]);
    const [editingReminder, setEditingReminder] = useState(null);
    const [form, setForm] = useState({
        content: "",
        datetime: "",
    });

    const userid = localStorage.getItem("userid");

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await getRemindersHandler(userid);
                setReminders(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des rappels :", error.message);
            }
        };

        if (userid) fetchReminders();
    }, [userid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleEdit = (reminder) => {
        setEditingReminder(reminder.reminderid);
        setForm({
            content: reminder.content,
            datetime: reminder.datetime,
        });
    };

    const handleSave = async () => {
        try {
            await updateReminderHandler(editingReminder, form);
            alert("Rappel modifié avec succès !");
            setEditingReminder(null);
            setReminders(reminders.map((reminder) =>
                reminder.reminderid === editingReminder ? { ...reminder, ...form } : reminder
            ));
        } catch (error) {
            console.error("Erreur lors de la modification du rappel :", error.message);
        }
    };

    const handleDelete = async (reminderid) => {
        try {
            await deleteReminderHandler(reminderid);
            alert("Rappel supprimé avec succès !");
            setReminders(reminders.filter((reminder) => reminder.reminderid !== reminderid));
        } catch (error) {
            console.error("Erreur lors de la suppression du rappel :", error.message);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-secondary text-center mb-6">
                Tous les rappels
            </h1>
            <ul className="space-y-4">
                {reminders.length > 0 ? (
                    reminders.map((reminder) => (
                        <li
                            key={reminder.reminderid}
                            className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50"
                        >
                            <div className="mb-4 md:mb-0">
                                <p className="font-medium text-lg">{reminder.content}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(reminder.datetime).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleEdit(reminder)}
                                    className="px-4 py-2 bg-yellow text-white rounded hover:bg-yellow-500 transition"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(reminder.reminderid)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Aucun rappel disponible.</p>
                )}
            </ul>

            {/* Formulaire d'édition */}
            {editingReminder && (
                <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
                    <h2 className="text-xl font-semibold mb-4 text-secondary">
                        Modifier un rappel
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Contenu
                            </label>
                            <input
                                type="text"
                                name="content"
                                value={form.content}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date et heure
                            </label>
                            <input
                                type="datetime-local"
                                name="datetime"
                                value={form.datetime}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-4 py-2 bg-secondary text-white rounded hover:bg-yellow-500 transition"
                            >
                                Enregistrer
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingReminder(null)}
                                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AllReminders;

import React, { useEffect, useState } from 'react';
import { getRemindersHandler, updateReminderHandler, deleteReminderHandler } from '../../api/api';

const AllReminders = () => {
    const [reminders, setReminders] = useState([]);
    const [editingReminder, setEditingReminder] = useState(null);
    const [form, setForm] = useState({
        content: '',
        datetime: '',
    });

    const userid = localStorage.getItem('userid');

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await getRemindersHandler(userid);
                setReminders(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des rappels :', error.message);
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
            alert('Rappel modifié avec succès !');
            setEditingReminder(null);
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la modification du rappel :', error.message);
        }
    };

    const handleDelete = async (reminderid) => {
        try {
            await deleteReminderHandler(reminderid);
            alert('Rappel supprimé avec succès !');
            setReminders(reminders.filter((reminder) => reminder.reminderid !== reminderid));
        } catch (error) {
            console.error('Erreur lors de la suppression du rappel :', error.message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Tous les rappels</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {reminders.length > 0 ? (
                    reminders.map((reminder) => (
                        <li
                            key={reminder.reminderid}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 0',
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            <div>
                                <strong>{reminder.content}</strong> - {new Date(reminder.datetime).toLocaleString()}
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(reminder)}
                                    style={{
                                        marginRight: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: '#ffc107',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(reminder.reminderid)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>Aucun rappel disponible.</p>
                )}
            </ul>
            {editingReminder && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>Modifier un rappel</h2>
                    <form>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Contenu</label>
                            <input
                                type="text"
                                name="content"
                                value={form.content}
                                onChange={handleInputChange}
                                required
                                style={{
                                    display: 'block',
                                    margin: '10px 0',
                                    padding: '8px',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Date et heure</label>
                            <input
                                type="datetime-local"
                                name="datetime"
                                value={form.datetime}
                                onChange={handleInputChange}
                                required
                                style={{
                                    display: 'block',
                                    margin: '10px 0',
                                    padding: '8px',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSave}
                            style={{
                                padding: '10px 15px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '5px',
                            }}
                        >
                            Enregistrer
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AllReminders;

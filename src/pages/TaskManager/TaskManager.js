import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
        // Fonction pour gérer la déconnexion
        const handleLogout = () => {
            localStorage.removeItem('token'); // Supprime le token
            window.location.href = '/login'; // Redirige vers la page de connexion
        };
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        description: '',
        deadline: '',
        priority: 'low',
        status: 'pending',
    });
    const [editTaskId, setEditTaskId] = useState(null);
    const [sortBy, setSortBy] = useState('deadline');
    const [order, setOrder] = useState('ASC');

    const userId = 1; // Exemple d'utilisateur connecté

    // Charger les tâches
    const fetchTasks = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/tasks/${userId}?sortBy=${sortBy}&order=${order}`);
            setTasks(res.data);
        } catch (err) {
            console.error('Erreur lors du chargement des tâches :', err.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [sortBy, order]);

    // Ajouter ou modifier une tâche
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editTaskId) {
            // Modifier une tâche
            try {
                await axios.put(`http://localhost:3000/api/tasks/${editTaskId}`, form);
                setEditTaskId(null);
                setForm({ description: '', deadline: '', priority: 'low', status: 'pending' });
                fetchTasks();
            } catch (err) {
                console.error('Erreur lors de la modification de la tâche :', err.message);
            }
        } else {
            // Ajouter une tâche
            try {
                await axios.post('http://localhost:3000/api/tasks', { userid: userId, ...form });
                setForm({ description: '', deadline: '', priority: 'low', status: 'pending' });
                fetchTasks();
            } catch (err) {
                console.error('Erreur lors de l\'ajout de la tâche :', err.message);
            }
        }
    };

    // Supprimer une tâche
    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
            fetchTasks();
        } catch (err) {
            console.error('Erreur lors de la suppression de la tâche :', err.message);
        }
    };

    // Charger les données de la tâche pour modification
    const handleEdit = (task) => {
        setEditTaskId(task.taskid);
        setForm({
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            status: task.status,
        });
    };

    return (
        <div>
            <button onClick={handleLogout} style={{ marginTop: '20px' }}>Déconnexion</button>
            <h1>Gestion des tâches</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Deadline</label>
                    <input
                        type="datetime-local"
                        value={form.deadline}
                        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Priorité</label>
                    <select
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </select>
                </div>
                <div>
                    <label>Statut</label>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="pending">En attente</option>
                        <option value="done">Terminée</option>
                    </select>
                </div>
                <button type="submit">{editTaskId ? 'Modifier' : 'Ajouter'}</button>
            </form>

            <h2>Liste des tâches</h2>
            <div>
                <label>Trier par :</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="deadline">Date limite</option>
                    <option value="priority">Priorité</option>
                    <option value="status">Statut</option>
                </select>
                <button onClick={() => setOrder(order === 'ASC' ? 'DESC' : 'ASC')}>
                    Ordre : {order === 'ASC' ? 'Croissant' : 'Décroissant'}
                </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.taskid}>
                        <strong>{task.description}</strong> - {task.deadline} - {task.priority} - {task.status}
                        <button onClick={() => handleEdit(task)}>Modifier</button>
                        <button onClick={() => handleDelete(task.taskid)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;

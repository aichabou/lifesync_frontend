import React, { useEffect, useState } from "react";
import { getTasksHandler, updateTaskHandler, deleteTaskHandler } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [form, setForm] = useState({
        description: "",
        deadline: "",
        priority: "low",
        status: "pending",
    });
    const navigate = useNavigate();

    const userid = localStorage.getItem("userid");

    const translatePriority = (priority) => {
        const translations = {
            low: "Basse",
            medium: "Moyenne",
            high: "Haute",
        };
        return translations[priority] || priority;
    };

    const translateStatus = (status) => {
        const translations = {
            pending: "En attente",
            done: "Terminée",
        };
        return translations[status] || status;
    };

    useEffect(() => {
        if (!userid) {
            alert("Utilisateur non identifié. Veuillez vous connecter.");
            navigate("/login");
        }
    }, [userid, navigate]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasksHandler(userid);
                setTasks(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des tâches :", error.message);
            }
        };
        if (userid) {
            fetchTasks();
        }
    }, [userid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleEdit = (task) => {
        setEditingTask(task.taskid);
        setForm({
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            status: task.status,
        });
    };

    const handleSave = async () => {
        if (!form.description) {
            alert("La description est obligatoire !");
            return;
        }
        try {
            await updateTaskHandler(editingTask, form);
            alert("Tâche modifiée avec succès !");
            setEditingTask(null);
            setTasks(tasks.map((task) =>
                task.taskid === editingTask ? { ...task, ...form } : task
            ));
        } catch (error) {
            console.error("Erreur lors de la modification de la tâche :", error.message);
        }
    };

    const handleDelete = async (taskid) => {
        try {
            await deleteTaskHandler(taskid);
            alert("Tâche supprimée avec succès !");
            setTasks(tasks.filter((task) => task.taskid !== taskid));
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche :", error.message);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-primary text-center mb-6">
                Toutes les tâches
            </h1>
            <ul className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li
                            key={task.taskid}
                            className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50"
                        >
                            <div className="mb-4 md:mb-0">
                                <p className="font-medium text-lg">{task.description}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(task.deadline).toLocaleString()} -{" "}
                                    {translatePriority(task.priority)} -{" "}
                                    {translateStatus(task.status)}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="px-4 py-2 bg-yellow text-white rounded hover:bg-yellow-500 transition"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(task.taskid)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Aucune tâche disponible.</p>
                )}
            </ul>

            {editingTask && (
                <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
                    <h2 className="text-xl font-semibold mb-4 text-primary">
                        Modifier une tâche
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date limite
                            </label>
                            <input
                                type="datetime-local"
                                name="deadline"
                                value={form.deadline}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Priorité
                            </label>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="low">Basse</option>
                                <option value="medium">Moyenne</option>
                                <option value="high">Haute</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Statut
                            </label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="pending">En attente</option>
                                <option value="done">Terminée</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-yellow-500 transition"
                            >
                                Enregistrer
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingTask(null)}
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

export default AllTasks;

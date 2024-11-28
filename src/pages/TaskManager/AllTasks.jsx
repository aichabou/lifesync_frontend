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

    const userid = localStorage.getItem("userid"); // Récupère l'ID utilisateur
    // if (!userid) {
    //     console.error("Utilisateur non identifié. Veuillez vous connecter.");
    //     alert("Utilisateur non identifié. Veuillez vous connecter.");
    //     navigate("/login"); // Redirige vers la page de connexion
    // }
    useEffect(() => {
        if (!userid) {
            console.error("Utilisateur non identifié. Veuillez vous connecter.");
            alert("Utilisateur non identifié. Veuillez vous connecter.");
            navigate("/login"); // Redirige vers la page de connexion
        }
    }, [userid, navigate]);
    // Charger les tâches au montage
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

    // Gestion du formulaire de modification
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Modifier une tâche
    const handleEdit = (task) => {
        setEditingTask(task.taskid); // Définit la tâche en cours d'édition
        setForm({
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            status: task.status,
        });
    };

    const handleSave = async () => {
        console.log("Données envoyées pour modification :", form); // Ajoutez cette ligne pour déboguer

        if (!form.description) {
            alert("La description est obligatoire !");
            return;
        }
        try {
            await updateTaskHandler(editingTask, form);
            alert("Tâche modifiée avec succès !");
            setEditingTask(null);
            window.location.reload(); 
            // const updatedTasks = tasks.map((task) =>
            //     task.taskid === editingTask ? { ...task, ...form } : task
            // );
            // setTasks(updatedTasks); // Met à jour localement sans recharger la page
        } catch (error) {
            console.error("Erreur lors de la modification de la tâche :", error.message);
        }
    };

    // Supprimer une tâche
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
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Toutes les tâches</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li
                            key={task.taskid}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "10px 0",
                                borderBottom: "1px solid #ccc",
                            }}
                        >
                            <div>
                                <strong>{task.description}</strong> -{" "}
                                {new Date(task.deadline).toLocaleString()} -{" "}
                                {task.priority} - {task.status}
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(task)}
                                    style={{
                                        marginRight: "10px",
                                        padding: "5px 10px",
                                        backgroundColor: "#ffc107",
                                        color: "#fff",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(task.taskid)}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p style={{ textAlign: "center" }}>Aucune tâche disponible.</p>
                )}
            </ul>
            {editingTask && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h2 style={{ textAlign: "center" }}>Modifier une tâche</h2>
                    <form>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                required
                                style={{
                                    display: "block",
                                    margin: "10px 0",
                                    padding: "8px",
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Date limite</label>
                            <input
                                type="datetime-local"
                                name="deadline"
                                value={form.deadline}
                                onChange={handleInputChange}
                                required
                                style={{
                                    display: "block",
                                    margin: "10px 0",
                                    padding: "8px",
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Priorité</label>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleInputChange}
                                style={{
                                    display: "block",
                                    margin: "10px 0",
                                    padding: "8px",
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            >
                                <option value="low">Basse</option>
                                <option value="medium">Moyenne</option>
                                <option value="high">Haute</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Statut</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleInputChange}
                                style={{
                                    display: "block",
                                    margin: "10px 0",
                                    padding: "8px",
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            >
                                <option value="pending">En attente</option>
                                <option value="done">Terminée</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleSave}
                            style={{
                                padding: "10px 15px",
                                backgroundColor: "#28a745",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "5px",
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

export default AllTasks;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import du graphe circulaire
import { Doughnut } from "react-chartjs-2";
import '../../config/chartConfig';
import { getUserIdFromToken } from '../../utils/auth';

// API pour récupérer les données
import { getTasksHandler, fetchReminders } from "../../api/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [taskProgress, setTaskProgress] = useState(0); // % de progression des tâches
  const navigate = useNavigate();

  // Charger les tâches et rappels au démarrage
  useEffect(() => {
    const fetchData = async () => {
        console.log("Token dans le localStorage :", localStorage.getItem('token')); // Vérifiez si le token est bien stocké
        const userid = getUserIdFromToken(); // Récupère l'ID utilisateur
        if (!userid) {
            console.error("Utilisateur non identifié.");
            return; // Arrête si aucun utilisateur identifié
        }

        try {
            const tasksResponse = await getTasksHandler(userid);
            console.log("Tâches récupérées :", tasksResponse.data);
            const remindersResponse = await fetchReminders(userid);

            setTasks(tasksResponse.data.slice(0, 5)); // Affiche un maximum de 5 tâches
            setReminders(remindersResponse.data.slice(0, 5)); // Affiche un maximum de 5 rappels

            // Calcul de progression
            const totalTasks = tasksResponse.data.length;
            const completedTasks = tasksResponse.data.filter(task => task.status === "completed").length;
            setTaskProgress(totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error.message);
        }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Section principale */}
      <main style={{ padding: "20px" }}>
        {/* Progression des tâches */}
        <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px" }}>
          <div style={{ width: "40%" }}>
            <h2>Progression des tâches</h2>
            <Doughnut
              data={{
                labels: ["Complétées", "Restantes"],
                datasets: [
                  {
                    data: [taskProgress, 100 - taskProgress],
                    backgroundColor: ["#4CAF50", "#FFC107"],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <h2>Have a good day</h2>
            <p>
              Vous pouvez commencer votre journée en ajoutant une nouvelle tâche ou un rappel. Restez organisé et
              productif !
            </p>
            <button onClick={() => navigate("/add-task")}>Ajouter une tâche</button>
            <button onClick={() => navigate("/reminders")} style={{ marginLeft: "10px" }}>
              Ajouter un rappel
            </button>
          </div>
        </section>

        {/* Listes des tâches et rappels */}
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Tâches à venir */}
          <div style={{ width: "45%" }}>
            <h3>Tâches à venir</h3>
            <ul>
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <li key={task.taskid} style={{ marginBottom: "10px" }}>
                    {task.description} - {new Date(task.deadline).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <p>Aucune tâche à afficher.</p>
              )}
            </ul>
            <button onClick={() => navigate("/tasks")}>Accéder à toutes les tâches</button>
          </div>

          {/* Rappels à venir */}
          <div style={{ width: "45%" }}>
            <h3>Rappels à venir</h3>
            <ul>
              {reminders.length > 0 ? (
                reminders.map(reminder => (
                  <li key={reminder.reminderid} style={{ marginBottom: "10px" }}>
                    {reminder.content} - {new Date(reminder.datetime).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <p>Aucun rappel à afficher.</p>
              )}
            </ul>
            <button onClick={() => navigate("/reminders")}>Accéder à tous les rappels</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

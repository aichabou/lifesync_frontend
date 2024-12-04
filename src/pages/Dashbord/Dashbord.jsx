import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getUserIdFromToken } from "../../utils/auth";
import { getTasksHandler, getRemindersHandler } from "../../api/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [taskProgress, setTaskProgress] = useState(0);
  const navigate = useNavigate();

  // Fetch tasks and reminders
  useEffect(() => {
    const fetchData = async () => {
      const userid = getUserIdFromToken();
      if (!userid) {
        console.error("Utilisateur non identifié.");
        return;
      }

      try {
        const tasksResponse = await getTasksHandler(userid);
        const remindersResponse = await getRemindersHandler(userid);

        const totalTasks = tasksResponse.data.length;
        const completedTasks = tasksResponse.data.filter(
          (task) => task.status === "done"
        ).length;

        setTasks(tasksResponse.data.slice(0, 5));
        setReminders(remindersResponse.data.slice(0, 5));
        setTaskProgress(
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        );
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error.message);
      }
    };

    fetchData();
  }, []);

  // Dynamic text for the center of the doughnut chart
  const dynamicText =
    taskProgress === 100
      ? "Félicitations, toutes les tâches sont terminées ! 🎉"
      : taskProgress === 0
      ? "Commencez dès maintenant vos tâches ! 💪"
      : `Bon travail ! ${taskProgress}% accompli. 🚀`;

  // Memoized chart data and options
  const chartData = useMemo(
    () => ({
      labels: ["Complétées", "Restantes"],
      datasets: [
        {
          data: [taskProgress, 100 - taskProgress],
          backgroundColor: ["#4CAF50", "#FFC107"],
          borderWidth: 1,
        },
      ],
    }),
    [taskProgress]
  );

  const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: { display: true, position: "bottom" },
      },
      maintainAspectRatio: false,
      cutout: "70%",
    }),
    []
  );

  return (
    <div>
      <main style={{ padding: "20px" }}>
        {/* Task Progress Section */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
        <div style={{ position: "relative", width: "40%", height: "300px" }}>
          <h2>Progression des tâches</h2>
          <Doughnut data={chartData} options={chartOptions} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 30%)", // Assure un centrage parfait horizontalement et verticalement
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30%", // Optionnel, pour limiter la largeur du texte
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#4CAF50",
              lineHeight: "1.4", // Pour bien espacer les lignes si le texte est long
            }}
          >
            {dynamicText}
          </div>
        </div>

          <div style={{ width: "50%" }}>
            <h2>Have a good day</h2>
            <p>
              Vous pouvez commencer votre journée en ajoutant une nouvelle tâche
              ou un rappel. Restez organisé et productif !
            </p>
            <button onClick={() => navigate("/add-task")}>Ajouter une tâche</button>
            <button
              onClick={() => navigate("/add-reminder")}
              style={{ marginLeft: "10px" }}
            >
              Ajouter un rappel
            </button>
          </div>
        </section>

        {/* Task and Reminder Lists */}
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "45%" }}>
            <h3>Tâches à venir</h3>
            <ul>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <li key={task.taskid} style={{ marginBottom: "10px" }}>
                    {task.description} -{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <p>Aucune tâche à afficher.</p>
              )}
            </ul>
            <button onClick={() => navigate("/tasks")}>
              Accéder à toutes les tâches
            </button>
          </div>
          <div style={{ width: "45%" }}>
            <h3>Rappels à venir</h3>
            <ul>
              {reminders.length > 0 ? (
                reminders.map((reminder) => (
                  <li key={reminder.reminderid} style={{ marginBottom: "10px" }}>
                    {reminder.content} -{" "}
                    {new Date(reminder.datetime).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <p>Aucun rappel à afficher.</p>
              )}
            </ul>
            <button onClick={() => navigate("/reminders")}>
              Accéder à tous les rappels
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

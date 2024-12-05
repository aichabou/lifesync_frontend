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

  const dynamicText =
    taskProgress === 100
      ? "🎉 Félicitations, toutes les tâches sont terminées !"
      : taskProgress === 0
      ? "💪 Commencez dès maintenant vos tâches !"
      : `🚀 Bon travail ! ${taskProgress}% accompli.`;

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
    <div className="p-6 bg-background min-h-screen">
      <main className="space-y-8">
        {/* Progression des tâches et bienvenue */} 
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Progression des tâches */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
            <h2 className="text-xl font-bold text-primary mb-4">
              Progression des tâches
            </h2>
            <div className="flex justify-center items-center relative">
  <div className="relative w-1/2 h-64">
    <Doughnut data={chartData} options={chartOptions} />
    <div
      className="absolute inset-0 flex items-center justify-center text-center text-primary font-semibold text-sm"
      style={{
        maxWidth: "60%", // Limite la largeur pour éviter le débordement
        whiteSpace: "normal", // Permet le retour à la ligne
        wordWrap: "break-word", // Gère les mots longs
        lineHeight: "1.5", // Ajoute un espacement vertical
        transform: "translate(30%, -5%)", // Ajuste verticalement si nécessaire
      }}
    >
      {dynamicText}
    </div>
  </div>
</div>

          </div>

          {/* Section de bienvenue */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
            <h2 className="text-lg font-bold text-primary mb-4">Bonjour ! 🌟</h2>
            <p className="text-gray-600 mb-4">
              Profitez de cette journée pour atteindre vos objectifs et avancer
              dans vos projets. Vous êtes capable de grandes choses !
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/add-task")}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700 transition"
              >
                Ajouter une tâche
              </button>
              <button
                onClick={() => navigate("/add-reminder")}
                className="px-4 py-2 bg-secondary text-white rounded hover:bg-yellow-500 transition"
              >
                Ajouter un rappel
              </button>
            </div>
          </div>
        </section>

        {/* Listes des tâches et rappels */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carte des tâches */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-4 text-center">
              Tâches à venir
            </h3>
            <div className="space-y-4">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.taskid}
                    className={`p-4 rounded border ${
                      task.status === "done"
                        ? "border-primary bg-primary/10"
                        : "border-accent bg-accent/10"
                    } shadow-sm`}
                  >
                    <h4 className="font-bold text-gray-800">
                      {task.description}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Échéance : {new Date(task.deadline).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          task.status === "done"
                            ? "bg-primary text-white"
                            : "bg-accent text-white"
                        }`}
                      >
                        {task.status === "done" ? "Fini" : "En attente"}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          task.priority === "High"
                            ? "bg-red-500 text-white"
                            : task.priority === "Medium"
                            ? "bg-yellow-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {task.priority || "Priorité inconnue"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Aucune tâche à afficher.</p>
              )}
            </div>

            <button
              onClick={() => navigate("/tasks")}
              className="mt-4 w-full px-4 py-2 bg-primary text-white rounded hover:bg-green-700 transition"
            >
              Accéder à toutes les tâches
            </button>
          </div>

          {/* Carte des rappels */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-4 text-center">
              Rappels à venir
            </h3>
            <div className="space-y-4">
              {reminders.length > 0 ? (
                reminders.map((reminder) => (
                  <div
                    key={reminder.reminderid}
                    className="p-4 rounded border border-blue-500 bg-blue-50 shadow-sm"
                  >
                    <h4 className="font-bold text-gray-800">
                      {reminder.content}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Date : {new Date(reminder.datetime).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  Aucun rappel à afficher.
                </p>
              )}
            </div>
            <button
              onClick={() => navigate("/reminders")}
              className="mt-4 w-full px-4 py-2 bg-secondary text-white rounded hover:bg-yellow-500 transition"
            >
              Accéder à tous les rappels
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

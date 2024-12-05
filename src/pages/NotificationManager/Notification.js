import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRemindersHandler, getTasksHandler } from "../../api/api";

// Hook Notification: Gère les notifications pour les rappels et les tâches
export const Notification = (userid) => {
    const [tasks, setTasks] = useState([]); // Stocke la liste des tâches
    const [reminders, setReminders] = useState([]); // Stocke la liste des rappels

    // Récupère les tâches et les rappels de l'utilisateur
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Appels API pour récupérer les rappels et les tâches
                const reminderResponse = await getRemindersHandler(userid);
                const taskResponse = await getTasksHandler(userid);

                // Met à jour les rappels et les tâches dans le state
                setReminders(Array.isArray(reminderResponse.data) ? reminderResponse.data : []);
                setTasks(Array.isArray(taskResponse.data) ? taskResponse.data : []);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error.message);
            }
        };

        // Exécute fetchData uniquement si l'utilisateur est identifié
        if (userid) fetchData();
    }, [userid]); // Exécute l'effet lorsque `userid` change

    // Vérifie si les tâches sont proches de leur deadline
    useEffect(() => {
        const checkDeadlines = () => {
            const now = new Date(); // Heure actuelle
            tasks.forEach((task) => {
                const deadline = new Date(task.deadline); // Deadline de la tâche
                const timeLeft = deadline - now; // Temps restant avant la deadline

                // Affiche une notification si la deadline est dans les 24 heures
                if (timeLeft > 0 && timeLeft <= 24 * 60 * 60 * 1000) {
                    toast.warning(`La tâche "${task.description}" approche de sa deadline !`);
                }
            });
        };

        // Exécute checkDeadlines toutes les minutes
        const interval = setInterval(checkDeadlines, 60 * 1000);

        // Nettoyage : Arrête l'intervalle quand le composant est démonté
        return () => clearInterval(interval);
    }, [tasks]); // Exécute l'effet lorsque `tasks` change

    // Vérifie si les rappels sont proches de leur datetime
    useEffect(() => {
        const checkReminders = () => {
            const now = new Date(); // Heure actuelle
            reminders.forEach((reminder) => {
                const reminderTime = new Date(reminder.datetime); // Heure du rappel
                const timeLeft = reminderTime - now; // Temps restant avant le rappel

                // Affiche une notification si le rappel est dans les 10 minutes
                if (timeLeft > 0 && timeLeft <= 10 * 60 * 1000) {
                    toast.info(
                        `Rappel imminent : "${reminder.content}" prévu à ${reminderTime.toLocaleTimeString("fr-FR")}`
                    );
                }
            });
        };

        // Exécute checkReminders toutes les minutes
        const interval = setInterval(checkReminders, 60 * 1000);

        // Nettoyage : Arrête l'intervalle quand le composant est démonté
        return () => clearInterval(interval);
    }, [reminders]); // Exécute l'effet lorsque `reminders` change

    // Retourne les tâches et rappels pour un usage éventuel dans d'autres parties du code
    return { tasks, reminders };
};

import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from '../src/pages/Register/Register';
import Login from '../src/pages/Login/Login';
import AddTask from '../src/pages/TaskManager/AddTask';
import AllTasks from '../src/pages/TaskManager/AllTasks';
import AddReminder from './pages/ReminderManager/AddReminder';
import AllReminders from './pages/ReminderManager/AllReminders';
import CookieConsent from '../src/components/CookieConsent';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashbord/Dashbord';
import { Notification } from './pages/NotificationManager/Notification'; // Assurez-vous du bon chemin

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Vérifie la présence du token
    if (!isAuthenticated) {
        console.error("L'utilisateur n'est pas authentifié.");
        return <Navigate to="/login" />; // Redirige si non connecté
    }
    return children; // Affiche le contenu protégé si connecté
};


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Vérifie si l'utilisateur est connecté au démarrage de l'application
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
        // Gestion de la déconnexion
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const userid = localStorage.getItem('userid'); // Récupère l'utilisateur connecté

    // Appel du hook de notification
    Notification(userid);

    return (
        <>

            <ToastContainer />
            <Router>
            {isLoggedIn && <Header onLogout={handleLogout} />}
                <div>
                    <CookieConsent />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
                />
                    <Route
                        path="/add-task"
                        element={
                            <ProtectedRoute>
                                <AddTask />
                                </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <AllTasks />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/add-reminder" element={<ProtectedRoute><AddReminder /></ProtectedRoute>} />
                    <Route path="/reminders" element={<ProtectedRoute><AllReminders /></ProtectedRoute>} />
                    <Route path="/profilePage" element={<ProfilePage />} />
                    <Route path="*" element={<h2>Page non trouvée</h2>} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
                <Footer />
            </Router>

        </>
    );
};

export default App;

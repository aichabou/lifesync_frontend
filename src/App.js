import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from '../src/pages/Register/Register';
import Login from '../src/pages/Login/Login';
import TaskManager from '../src/pages/TaskManager/TaskManager';
import ReminderManager from '../src/pages/ReminderManager/ReminderManager';
import CookieConsent from '../src/components/CookieConsent';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashbord/Dashbord';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Exemple avec un token
    return isAuthenticated ? children : <Navigate to="/login" />;
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
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <TaskManager />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reminders"
                        element={
                            <ProtectedRoute>
                                <ReminderManager />
                            </ProtectedRoute>
                        }
                    />
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

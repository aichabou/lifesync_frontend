import React from 'react';
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

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Exemple avec un token
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <>
            <ToastContainer />
            <Router>
                <div>
                    <CookieConsent />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
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
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<h2>Page non trouvée</h2>} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
            </Router>
            
        </>
    );
};

export default App;

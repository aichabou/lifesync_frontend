import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/TaskManager';
import ReminderManager from './pages/ReminderManager';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Exemple avec un token
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <>
            <ToastContainer />
            <Router>
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
                    <Route path="*" element={<h2>Page non trouvée</h2>} />
                </Routes>
            </Router>
        </>
    );
};

export default App;

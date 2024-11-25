import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from '../src/pages/Register/Register';
import Login from '../src/pages/Login/Login';
import TaskManager from '../src/pages/TaskManager/TaskManager';
import ReminderManager from '../src/pages/ReminderManager/ReminderManager';

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

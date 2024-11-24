import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/TaskManager';
import ReminderManager from './pages/ReminderManager';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<TaskManager />} />
                <Route path="/reminders" element={<ReminderManager />} />
            </Routes>
        </Router>
    );
};

export default App;

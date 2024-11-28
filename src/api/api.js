import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
// Taches
export const getTasksHandler = (userid) => API.get(`/tasks/${userid}`);
export const createTaskHandler = (data) => API.post(`/tasks`,data);
export const updateTaskHandler = (taskid, data) => API.put(`/tasks/${taskid}`, data);
export const deleteTaskHandler = (taskid) => API.delete(`/tasks/${taskid}`);

// Rappels
export const fetchReminders = (userid) => API.get(`/reminders/${userid}`);
export const createReminder = (data) => API.post('/reminders', data);
export const updateReminder = (reminderid, data) => API.put(`/reminders/${reminderid}`, data);
export const deleteReminder = (reminderid) => API.delete(`/reminders/${reminderid}`);

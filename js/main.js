import { loadTasks, saveTasks } from './storage.js';
import { renderTasks } from './ui.js';
import './events.js'; // Handles interactions

// Load tasks from localStorage and render them on startup
const tasks = loadTasks();
renderTasks(tasks);


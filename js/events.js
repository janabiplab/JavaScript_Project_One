import { saveTasks, loadTasks } from './storage.js';
import { renderTasks } from './ui.js';

//Throttle function for scroll event
const throttle = (callback, limit) => {
    let wait = false;
    return () => {
        if (!wait) {
            callback();
            wait = true;
            setTimeout(() => wait = false, limit);
        }
    };
};

//Debounce function for search input
const debounce = (callback, delay) => {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(callback, delay);
    };
};

// Initial tasks
let tasks = loadTasks();
renderTasks(tasks);

// Add Task
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskText = document.getElementById('taskInput').value;
    if (taskText.trim()) {
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        renderTasks(tasks);
    }
});

// Complete / Delete Task
document.getElementById('tasks').addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.tagName === 'INPUT') {
        tasks[index].completed = e.target.checked;
    } else if (e.target.tagName === 'BUTTON') {
        tasks.splice(index, 1);
    }
    saveTasks(tasks);
    renderTasks(tasks);
});

// Search Task (Debounced Input)
document.getElementById('searchTaskInput').addEventListener('input', debounce(() => {
    const query = document.getElementById('searchTaskInput').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(query));
    renderTasks(filteredTasks);
}, 300));

// Back to Top (Throttled Scroll Event)
window.addEventListener('scroll', throttle(() => {
    document.getElementById('scrollTopBtn').style.display = window.scrollY > 200 ? 'block' : 'none';
}, 100));


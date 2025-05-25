export function renderTasks(tasks) {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.completed ? `<s>${task.text}</s>` : task.text}</span>
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
            <button data-index="${index}">clear</button>
        `;
        taskList.appendChild(li);
    });
}


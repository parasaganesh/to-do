// modern-script.js

// DOM Elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let tasks = [];

// Functions

// Add Task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
};

// Delete Task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

// Edit Task
const editTask = (index) => {
    const newTaskText = prompt('Edit Task:', tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index].text = newTaskText.trim();
        renderTasks();
    }
};

// Complete Task
const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

// Render Tasks
const renderTasks = (filter = 'all') => {
    taskList.innerHTML = '';
    tasks
        .filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
        })
        .forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task-item ${task.completed ? 'completed' : ''};
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-btn" onclick="completeTask(${index})">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="edit-btn" onclick="editTask(${index})">&#9998;</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">&#10006;</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
};

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.getAttribute('data-filter');
        renderTasks(filter);
    });
});

// Initial Render
renderTasks();
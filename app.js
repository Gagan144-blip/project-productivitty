// Productivity Dashboard Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
});

// Global state
let tasks = [];
let timerInterval = null;
let timerSeconds = 25 * 60;
let totalFocusSeconds = 0;
let isTimerRunning = false;

// Initialize Dashboard
function initializeDashboard() {
    loadFromStorage();
    updateDateDisplay();
    setupEventListeners();
    updateStats();
    renderTasks();
    updateTimerDisplay();
}

// Update current date display
function updateDateDisplay() {
    const dateElement = document.getElementById('currentDate');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
}

// Setup all event listeners
function setupEventListeners() {
    // Task form submission
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', handleTaskSubmit);

    // Timer controls
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);

    // Timer presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const minutes = parseInt(this.dataset.minutes);
            setTimerPreset(minutes);
        });
    });

    // Goal checkboxes
    document.querySelectorAll('.goal-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveToStorage);
    });
}

// Handle task form submission
function handleTaskSubmit(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('taskInput');
    const taskPriority = document.getElementById('taskPriority');
    
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const task = {
        id: Date.now(),
        text: taskText,
        priority: taskPriority.value,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    saveToStorage();
    renderTasks();
    updateStats();

    // Reset form
    taskInput.value = '';
    taskInput.focus();
}

// Render tasks to the DOM
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <span class="task-priority priority-${task.priority}">${task.priority}</span>
            <button class="task-delete" aria-label="Delete task">&times;</button>
        `;

        // Event listeners for task actions
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(task.id));

        const deleteBtn = li.querySelector('.task-delete');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(li);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toggle task completion status
function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveToStorage();
        renderTasks();
        updateStats();
        updateGoalProgress();
    }
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveToStorage();
    renderTasks();
    updateStats();
    updateGoalProgress();
}

// Update statistics display
function updateStats() {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    const total = tasks.length;
    const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById('tasksCompleted').textContent = completed;
    document.getElementById('tasksPending').textContent = pending;
    document.getElementById('productivityScore').textContent = productivity + '%';
    
    updateFocusTimeDisplay();
    updateGoalProgress();
}

// Update focus time display
function updateFocusTimeDisplay() {
    const hours = Math.floor(totalFocusSeconds / 3600);
    const minutes = Math.floor((totalFocusSeconds % 3600) / 60);
    document.getElementById('focusTime').textContent = `${hours}h ${minutes}m`;
}

// Timer Functions
function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    document.getElementById('startTimer').disabled = true;
    document.getElementById('pauseTimer').disabled = false;

    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            totalFocusSeconds++;
            updateTimerDisplay();
            updateFocusTimeDisplay();
            saveToStorage();
        } else {
            // Timer completed
            pauseTimer();
            playNotificationSound();
            alert('Focus session complete! Great work!');
        }
    }, 1000);
}

function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    document.getElementById('startTimer').disabled = false;
    document.getElementById('pauseTimer').disabled = true;
}

function resetTimer() {
    pauseTimer();
    timerSeconds = 25 * 60;
    updateTimerDisplay();
}

function setTimerPreset(minutes) {
    pauseTimer();
    timerSeconds = minutes * 60;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

// Play notification sound (if supported)
function playNotificationSound() {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Productivity Dashboard', {
            body: 'Focus session complete!',
            icon: 'favicon.ico'
        });
    }
}

// Update goal progress bars
function updateGoalProgress() {
    const completedTasks = tasks.filter(t => t.completed).length;
    
    // Goal 1: Complete 5 tasks
    const goal1Progress = Math.min((completedTasks / 5) * 100, 100);
    document.getElementById('goal1Progress').style.width = goal1Progress + '%';
    document.getElementById('goal1').checked = completedTasks >= 5;

    // Goal 2: Focus for 2 hours (7200 seconds)
    const goal2Progress = Math.min((totalFocusSeconds / 7200) * 100, 100);
    document.getElementById('goal2Progress').style.width = goal2Progress + '%';
    document.getElementById('goal2').checked = totalFocusSeconds >= 7200;

    // Goal 3: Manual checkbox (no auto-update)
    // User manages this manually
}

// Local Storage Functions
function saveToStorage() {
    const data = {
        tasks: tasks,
        totalFocusSeconds: totalFocusSeconds,
        timerSeconds: timerSeconds,
        savedDate: new Date().toDateString()
    };
    localStorage.setItem('productivityDashboard', JSON.stringify(data));
}

function loadFromStorage() {
    const stored = localStorage.getItem('productivityDashboard');
    if (stored) {
        const data = JSON.parse(stored);
        
        // Reset if it's a new day
        if (data.savedDate !== new Date().toDateString()) {
            tasks = [];
            totalFocusSeconds = 0;
            timerSeconds = 25 * 60;
        } else {
            tasks = data.tasks || [];
            totalFocusSeconds = data.totalFocusSeconds || 0;
            timerSeconds = data.timerSeconds || 25 * 60;
        }
    }
}

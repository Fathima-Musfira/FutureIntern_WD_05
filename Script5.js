let pendingTasks = [];
let completedTasks = [];

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    if (taskInput === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput,
        date: new Date().toLocaleString(),
        completed: false
    };

    pendingTasks.push(task);
    document.getElementById('taskInput').value = ''; // Clear input
    renderTasks();
}

// Render both pending and completed tasks
function renderTasks() {
    const pendingList = document.getElementById('pendingTasks');
    const completedList = document.getElementById('completedTasks');
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    pendingTasks.forEach(task => {
        const listItem = createTaskElement(task);
        pendingList.appendChild(listItem);
    });

    completedTasks.forEach(task => {
        const listItem = createTaskElement(task, true);
        completedList.appendChild(listItem);
    });
}

// Create task HTML element
function createTaskElement(task, isCompleted = false) {
    const li = document.createElement('li');
    li.classList.add(isCompleted ? 'completed' : 'pending');

    const span = document.createElement('span');
    span.textContent = `${task.text} (${task.date})`;
    li.appendChild(span);

    if (!isCompleted) {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete');
        completeButton.onclick = () => completeTask(task.id);
        li.appendChild(completeButton);
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.onclick = () => editTask(task.id);
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => deleteTask(task.id, isCompleted);
    li.appendChild(deleteButton);

    return li;
}

// Mark task as complete
function completeTask(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    const task = pendingTasks.splice(taskIndex, 1)[0];
    task.completed = true;
    task.date = new Date().toLocaleString(); // Mark the time of completion
    completedTasks.push(task);
    renderTasks();
}

// Edit a task
function editTask(taskId) {
    const taskText = prompt('Edit your task:');
    if (taskText === null || taskText.trim() === '') return;

    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        pendingTasks[taskIndex].text = taskText;
    } else {
        const completedTaskIndex = completedTasks.findIndex(task => task.id === taskId);
        completedTasks[completedTaskIndex].text = taskText;
    }
    renderTasks();
}

// Delete a task
function deleteTask(taskId, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(task => task.id !== taskId);
    } else {
        pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    }
    renderTasks();
}

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput').value;
    const responsibleInput = document.getElementById('responsibleInput').value;
    const startDateInput = document.getElementById('startDateInput').value;
    const endDateInput = document.getElementById('endDateInput').value;

    if (taskInput && responsibleInput && startDateInput && endDateInput) {
        const taskTableBody = document.getElementById('taskTableBody');
        const row = document.createElement('tr');
        const now = new Date();
        const startDate = new Date(startDateInput);
        const endDate = new Date(endDateInput);

        if (endDate < startDate) {
            alert('La fecha de término no puede ser menor a la fecha de inicio.');
            return;
        }

        const task = {
            taskInput,
            responsibleInput,
            startDateInput,
            endDateInput,
            isExpired: endDate < now,
            isCompleted: false
        };

        saveTask(task);
        renderTask(task, row, taskTableBody);
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

function renderTask(task, row, taskTableBody) {
    if (task.isExpired) {
        row.style.backgroundColor = 'aquamarine';
        const expiredCell = document.createElement('td');
        expiredCell.colSpan = 4;
        expiredCell.textContent = `${task.taskInput} - ${task.responsibleInput} - ${task.startDateInput} - ${task.endDateInput} - Tarea expirada`;
        row.appendChild(expiredCell);

        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.addEventListener('click', function() {
            taskTableBody.removeChild(row);
            removeTask(task);
        });
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);
        taskTableBody.appendChild(row);
    } else {
        const taskCell = document.createElement('td');
        taskCell.textContent = task.taskInput;
        row.appendChild(taskCell);

        const responsibleCell = document.createElement('td');
        responsibleCell.textContent = task.responsibleInput;
        row.appendChild(responsibleCell);

        const startDateCell = document.createElement('td');
        startDateCell.textContent = task.startDateInput;
        row.appendChild(startDateCell);

        const endDateCell = document.createElement('td');
        endDateCell.textContent = task.endDateInput;
        row.appendChild(endDateCell);

        const actionCell = document.createElement('td');
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completar';
        completeBtn.className = 'btn btn-success';
        completeBtn.addEventListener('click', function() {
            if (task.isCompleted) {
                task.isCompleted = false;
                row.classList.remove('completed');
                taskCell.style.textDecoration = 'none';
                responsibleCell.style.textDecoration = 'none';
                startDateCell.style.textDecoration = 'none';
                endDateCell.style.textDecoration = 'none';
                completeBtn.textContent = 'Completar';
                completeBtn.className = 'btn btn-success';
            } else {
                task.isCompleted = true;
                row.classList.add('completed');
                taskCell.style.textDecoration = 'line-through';
                responsibleCell.style.textDecoration = 'line-through';
                startDateCell.style.textDecoration = 'line-through';
                endDateCell.style.textDecoration = 'line-through';
                completeBtn.textContent = 'Descompletar';
                completeBtn.className = 'btn btn-secondary';
            }
            updateTask(task);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.addEventListener('click', function() {
            taskTableBody.removeChild(row);
            removeTask(task);
        });

        actionCell.appendChild(completeBtn);
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);
        taskTableBody.appendChild(row);
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.startDateInput === updatedTask.startDateInput && task.endDateInput === updatedTask.endDateInput ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.startDateInput !== taskToRemove.startDateInput || task.endDateInput !== taskToRemove.endDateInput);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskTableBody = document.getElementById('taskTableBody');
    tasks.forEach(task => {
        const row = document.createElement('tr');
        renderTask(task, row, taskTableBody);
    });
}

window.addEventListener('load', loadTasks);


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

            // Detener la ejecución si las fechas son inválidas
            return;
        }

        if (startDate < now) {
            row.style.backgroundColor = 'aquamarine';
            const expiredCell = document.createElement('td');
            expiredCell.colSpan = 4;
            expiredCell.textContent = `${taskInput} - ${responsibleInput} - ${startDateInput} - ${endDateInput} - Tarea expirada`;
            row.appendChild(expiredCell);

            const actionCell = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.addEventListener('click', function() {
                taskTableBody.removeChild(row);
            });
            actionCell.appendChild(deleteBtn);
            row.appendChild(actionCell);
            taskTableBody.appendChild(row);
        } else {
            const taskCell = document.createElement('td');
            taskCell.textContent = taskInput;
            row.appendChild(taskCell);

            const responsibleCell = document.createElement('td');
            responsibleCell.textContent = responsibleInput;
            row.appendChild(responsibleCell);

            const startDateCell = document.createElement('td');
            startDateCell.textContent = startDateInput;
            row.appendChild(startDateCell);

            const endDateCell = document.createElement('td');
            endDateCell.textContent = endDateInput;
            row.appendChild(endDateCell);

            const actionCell = document.createElement('td');
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Completar';
            completeBtn.className = 'btn btn-success';
            completeBtn.addEventListener('click', function() {
                if (row.classList.contains('completed')) {
                    row.classList.remove('completed');
                    taskCell.style.textDecoration = 'none';
                    responsibleCell.style.textDecoration = 'none';
                    startDateCell.style.textDecoration = 'none';
                    endDateCell.style.textDecoration = 'none';
                    completeBtn.textContent = 'Completar';
                    completeBtn.className = 'btn btn-success';
                } else {
                    row.classList.add('completed');
                    taskCell.style.textDecoration = 'line-through';
                    responsibleCell.style.textDecoration = 'line-through';
                    startDateCell.style.textDecoration = 'line-through';
                    endDateCell.style.textDecoration = 'line-through';
                    completeBtn.textContent = 'Descompletar';
                    completeBtn.className = 'btn btn-secondary';
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.addEventListener('click', function() {
                taskTableBody.removeChild(row);
            });

            actionCell.appendChild(completeBtn);
            actionCell.appendChild(deleteBtn);
            row.appendChild(actionCell);

            taskTableBody.appendChild(row);
        }

        // Limpiar inputs
        document.getElementById('taskInput').value = '';
        document.getElementById('responsibleInput').value = '';
        document.getElementById('startDateInput').value = '';
        document.getElementById('endDateInput').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

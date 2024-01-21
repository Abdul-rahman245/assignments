let globalId = 1;
let todoState = [];
let oldTodoState = [];
function addTodoToDom(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';
    todoDiv.id = `todo-${todo.id}`;
    todoDiv.innerHTML = `<p>${todo.title}</p><p>${todo.description}</p><div class="todo-actions">
    <button onclick="editTodo(${todo.id})" class="edit-icon"><i class="fas fa-edit"></i></button>
    <button onclick="deleteTodo(${todo.id})" class="delete-icon"><i class="fas fa-trash"></i></button>
    <button onclick="updateTodo(${todo.id})" class="update-icon"><i class="fas fa-check"></i></button>
    </div>`;
    document.getElementById('todos').appendChild(todoDiv);
}

function removeTodoFromDom(todo) {
    const todoDiv = document.getElementById(`todo-${todo.id}`);
    if (todoDiv) {
    todoDiv.remove();
    }
}

function updateTodoInDom(oldTodo, newTodo) {
    const todoDiv = document.getElementById(`todo-${oldTodo.id}`);
    if (todoDiv) {
    todoDiv.innerHTML = `<p>${newTodo.title}</p><p>${newTodo.description}</p><div class="todo-actions">
        <button onclick="editTodo(${newTodo.id})" class="edit-icon"><i class="fas fa-edit"></i></button>
        <button onclick="deleteTodo(${newTodo.id})" class="delete-icon"><i class="fas fa-trash"></i></button>
        <button onclick="updateTodo(${newTodo.id})" class="update-icon"><i class="fas fa-check"></i></button>
    </div>`;
    }
}

function updateState(newTodos) {
    const added = [];
    const deleted = [];
    const updated = [];

    // Calculate added, deleted, and updated todos
    for (const newTodo of newTodos) {
    const oldTodoIndex = oldTodoState.findIndex(oldTodo => oldTodo.id === newTodo.id);

    if (oldTodoIndex === -1) {
        added.push(newTodo);
    } else {
        const oldTodo = oldTodoState[oldTodoIndex];
        if (oldTodo.title !== newTodo.title || oldTodo.description !== newTodo.description) {
        updated.push({ oldTodo, newTodo });
        }
    }
    }

    for (const oldTodo of oldTodoState) {
    const isDeleted = newTodos.findIndex(newTodo => newTodo.id === oldTodo.id) === -1;
    if (isDeleted) {
        deleted.push(oldTodo);
    }
    }

    // Perform DOM operations based on the calculated arrays
    added.forEach(addTodoToDom);
    deleted.forEach(removeTodoFromDom);
    updated.forEach(({ oldTodo, newTodo }) => updateTodoInDom(oldTodo, newTodo));

    // Update oldTodoState
    oldTodoState = [...newTodos];
}

function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    todoState.push({
    title: title,
    description: description,
    id: globalId++,
    })
    updateState(todoState);
    clearInputFields();
}

function clearInputFields() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}

function editTodo(todoId) {
    const todoToEdit = todoState.find(todo => todo.id === todoId);
    if (todoToEdit) {
    document.getElementById("title").value = todoToEdit.title;
    document.getElementById("description").value = todoToEdit.description;
    deleteTodo(todoId);
    }
}

function deleteTodo(todoId) {
    const todoIndex = todoState.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
    const deletedTodo = todoState.splice(todoIndex, 1)[0];
    removeTodoFromDom(deletedTodo);
    updateState(todoState);
    }
}

function updateTodo(todoId) {
    const updatedTitle = document.getElementById("title").value;
    const updatedDescription = document.getElementById("description").value;

    const todoToUpdate = todoState.find(todo => todo.id === todoId);
    if (todoToUpdate) {
    todoToUpdate.title = updatedTitle;
    todoToUpdate.description = updatedDescription;
    updateTodoInDom(todoToUpdate, todoToUpdate);
    updateState(todoState);
    clearInputFields();
    }
}
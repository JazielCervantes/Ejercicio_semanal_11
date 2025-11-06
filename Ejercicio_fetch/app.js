const API_URL = 'https://jsonplaceholder.typicode.com/users';
const usersList = document.getElementById('usersList');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const btnAsync = document.getElementById('btnAsync');
const btnPromise = document.getElementById('btnPromise');

// MÉTODO 1: Usando Async/Await
async function fetchUsersAsync() {
    showLoading();
    hideError();
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        
        const users = await response.json();
        hideLoading();
        displayUsers(users);
        
    } catch (error) {
        hideLoading();
        showError('Error al cargar usuarios con Async/Await');
        console.error('Error:', error);
    }
}

// MÉTODO 2: Usando Promesas (then/catch)
function fetchUsersPromise() {
    showLoading();
    hideError();
    
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(users => {
            hideLoading();
            displayUsers(users);
        })
        .catch(error => {
            hideLoading();
            showError('Error al cargar usuarios con Promesas');
            console.error('Error:', error);
        });
}

function displayUsers(users) {
    usersList.innerHTML = '';
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-item';
        
        li.innerHTML = `
            <div class="user-name">${user.name}</div>
            <div class="user-username">@${user.username}</div>
            <div class="user-email">${user.email}</div>
        `;
        
        usersList.appendChild(li);
    });
}

function showLoading() {
    loadingElement.style.display = 'block';
    usersList.innerHTML = '';
}

function hideLoading() {
    loadingElement.style.display = 'none';
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    errorElement.style.display = 'none';
}

// Event Listeners
btnAsync.addEventListener('click', fetchUsersAsync);
btnPromise.addEventListener('click', fetchUsersPromise);

// Cargar usuarios al iniciar la página con async/await
fetchUsersAsync();
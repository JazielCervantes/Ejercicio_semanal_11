const API_URL = 'https://jsonplaceholder.typicode.com/users';

// MÉTODO 1: Usando Async/Await con Axios
async function fetchUsersAsync() {
    showLoading();
    hideError();
    
    try {
        const response = await axios.get(API_URL);
        const users = response.data;
        
        hideLoading();
        displayUsers(users);
        
    } catch (error) {
        hideLoading();
        showError('Error al cargar usuarios con Async/Await');
        console.error('Error:', error);
    }
}

// MÉTODO 2: Usando Promesas con Axios (.then y .catch)
function fetchUsersPromise() {
    showLoading();
    hideError();
    
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
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
    const usersList = document.getElementById('usersList');
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
    const loadingElement = document.getElementById('loading');
    const usersList = document.getElementById('usersList');
    loadingElement.style.display = 'block';
    usersList.innerHTML = '';
}

function hideLoading() {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'none';
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    const errorElement = document.getElementById('error');
    errorElement.style.display = 'none';
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const btnAsync = document.getElementById('btnAsync');
    const btnPromise = document.getElementById('btnPromise');
    
    // Event Listeners
    btnAsync.addEventListener('click', fetchUsersAsync);
    btnPromise.addEventListener('click', fetchUsersPromise);
    
    // Cargar usuarios al iniciar la página con async/await
    fetchUsersAsync();
});
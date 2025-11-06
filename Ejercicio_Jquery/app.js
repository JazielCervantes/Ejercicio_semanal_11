const API_URL = 'https://jsonplaceholder.typicode.com/users';

// MÉTODO 1: Usando Async/Await con jQuery.ajax()
async function fetchUsersAsync() {
    showLoading();
    hideError();
    
    try {
        const users = await $.ajax({
            url: API_URL,
            method: 'GET',
            dataType: 'json'
        });
        
        hideLoading();
        displayUsers(users);
        
    } catch (error) {
        hideLoading();
        showError('Error al cargar usuarios con Async/Await');
        console.error('Error:', error);
    }
}

// MÉTODO 2: Usando Promesas con jQuery.get()
function fetchUsersPromise() {
    showLoading();
    hideError();
    
    $.get(API_URL)
        .done(function(users) {
            hideLoading();
            displayUsers(users);
        })
        .fail(function(error) {
            hideLoading();
            showError('Error al cargar usuarios con Promesas');
            console.error('Error:', error);
        });
}

function displayUsers(users) {
    $('#usersList').empty();
    
    $.each(users, function(index, user) {
        const userItem = `
            <li class="user-item">
                <div class="user-name">${user.name}</div>
                <div class="user-username">@${user.username}</div>
                <div class="user-email">${user.email}</div>
            </li>
        `;
        
        $('#usersList').append(userItem);
    });
}

function showLoading() {
    $('#loading').show();
    $('#usersList').empty();
}

function hideLoading() {
    $('#loading').hide();
}

function showError(message) {
    $('#error').text(message).show();
}

function hideError() {
    $('#error').hide();
}

// Document Ready - jQuery
$(document).ready(function() {
    // Event Listeners
    $('#btnAsync').click(fetchUsersAsync);
    $('#btnPromise').click(fetchUsersPromise);
    
    // Cargar usuarios al iniciar con async/await
    fetchUsersAsync();
});
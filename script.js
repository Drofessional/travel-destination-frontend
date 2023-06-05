const API_URL = 'https://destination-project-backend.herokuapp.com';
let user;
let id;
let destinationIds;
let state = {};

const token = () => `Bearer ${localStorage.getItem('token')}`;

async function fetchAndDisplayDestinations() {
  const destinationsResponse = await fetch(`${API_URL}/destinations/${user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token()
    }
  });

  if (!destinationsResponse.ok) return;

  destinationIds = await destinationsResponse.json();

  const destinationList = document.getElementById('destination-list');
  destinationList.innerHTML = '';

  for (const id of destinationIds) {
    const destinationResponse = await fetch(`${API_URL}/destinations/id/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token()
      }
    });

    if (!destinationResponse.ok) continue;

    const destination = await destinationResponse.json();
    const li = document.createElement('li');
    li.textContent = destination.city;
    state[destination.city] = id;
    li.dataset.destinationId = id;
    li.addEventListener('click', () => { id = li.dataset.destinationId; });
    destinationList.appendChild(li);
  }
}

function getInputValue(id) {
  return document.getElementById(id).value;
}

async function sendRequest(url, method, body = {}) {
  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token()
    },
    body: JSON.stringify(body)
  });
}

document.getElementById('register-btn').addEventListener('click', async () => {
  const response = await sendRequest(`${API_URL}/users/register`, 'POST', {
    name: getInputValue('register-name'),
    email: getInputValue('register-email'),
    password: getInputValue('register-password')
  });

  alert(response.ok ? 'Registered successfully' : 'Error in registration');
});

document.getElementById('login-btn').addEventListener('click', async () => {
  const response = await sendRequest(`${API_URL}/users/login`, 'POST', {
    email: getInputValue('login-email'),
    password: getInputValue('login-password')
  });

  if (!response.ok) {
    alert('Error in login');
    return;
  }

  const data = await response.json();
  const payload = JSON.parse(atob(data.token.split('.')[1]));
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', payload.name);
  user = payload.name;
  alert('Logged in successfully');

  ['register', 'login', 'update'].forEach(id => document.getElementById(id).style.display = 'none');
  ['city-div', 'destination-div'].forEach(id => document.getElementById(id).style.display = 'block');

  fetchAndDisplayDestinations();
});

document.getElementById('update-password-btn').addEventListener('click', async () => {
  const response = await sendRequest(`${API_URL}/users/${getInputValue('update-name')}/updatePassword`, 'PUT', {
    newPassword: getInputValue('update-password')
  });

  alert(response.ok ? 'Password updated successfully' : 'Error updating password');
});

document.getElementById('add-city-btn').addEventListener('click', async () => {
  const response = await sendRequest(`${API_URL}/destinations/${user}`, 'POST', {
    city: getInputValue('city-name')
  });

  if (response.ok) {
    alert('City added successfully');
    fetchAndDisplayDestinations();
  } else {
    alert('Error adding city');
  }
});

document.getElementById('delete-city-btn').addEventListener('click', async () => {
  const cityName = getInputValue('city-name');
  const response = await fetch(`${API_URL}/destinations/${user}/${state[cityName]}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token()
    }
  });

  if (response.ok) {
    alert('City deleted successfully');
    fetchAndDisplayDestinations();
  } else {
    alert('Error deleting city');
  }
});

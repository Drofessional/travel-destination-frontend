const API_URL = 'https://destination-project-backend.herokuapp.com';
let user;
let id;
let destinationIds;
let state = {};

// Get the authorization token
const token = () => `Bearer ${localStorage.getItem('token')}`;

// Fetch and display the user's destinations
async function fetchAndDisplayDestinations() {
  // Send GET request to retrieve the user's destinations
  const destinationsResponse = await fetch(`${API_URL}/destinations/${user}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token()
    }
  });

  if (!destinationsResponse.ok) return;

  // Get the destination IDs from the response
  destinationIds = await destinationsResponse.json();

  const destinationList = document.getElementById('destination-list');
  destinationList.innerHTML = '';

  // Iterate through the destination IDs and fetch the details for each destination
  for (const id of destinationIds) {
    // Send GET request to retrieve the details of a specific destination
    const destinationResponse = await fetch(`${API_URL}/destinations/id/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token()
      }
    });

    if (!destinationResponse.ok) continue;

    // Get the destination details from the response
    const destination = await destinationResponse.json();

    // Create a list item element for each destination
    const li = document.createElement('li');
    li.textContent = destination.city;
    state[destination.city] = id;
    li.dataset.destinationId = id;
    li.addEventListener('click', () => { id = li.dataset.destinationId; });
    destinationList.appendChild(li);
  }
}

// Get the value of an input field by its ID
function getInputValue(id) {
  return document.getElementById(id).value;
}

// Send a request to the API
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

// Event listener for the register button
document.getElementById('register-btn').addEventListener('click', async () => {
  // Send POST request to register a new user
  const response = await sendRequest(`${API_URL}/users/register`, 'POST', {
    name: getInputValue('register-name'),
    email: getInputValue('register-email'),
    password: getInputValue('register-password')
  });

  alert(response.ok ? 'Registered successfully' : 'Error in registration');
});

// Event listener for the login button
document.getElementById('login-btn').addEventListener('click', async () => {
  // Send POST request to authenticate and login a user
  const response = await sendRequest(`${API_URL}/users/login`, 'POST', {
    email: getInputValue('login-email'),
    password: getInputValue('login-password')
  });

  if (!response.ok) {
    alert('Error in login');
    return;
  }

  // Retrieve the token and user data from the response
  const data = await response.json();
  const payload = JSON.parse(atob(data.token.split('.')[1]));

  // Store the token and user in local storage
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', payload.name);
  user = payload.name;
  alert('Logged in successfully');

  // Hide the login and register forms, show the city and destination forms
  ['register', 'login', 'update'].forEach(id => document.getElementById(id).style.display = 'none');
  ['city-div', 'destination-div'].forEach(id => document.getElementById(id).style.display = 'block');

  fetchAndDisplayDestinations();
});

// Event listener for the update password button
document.getElementById('update-password-btn').addEventListener('click', async () => {
  // Send PUT request to update the password for a specific user
  const response = await sendRequest(`${API_URL}/users/${getInputValue('update-name')}/updatePassword`, 'PUT', {
    newPassword: getInputValue('update-password')
  });

  alert(response.ok ? 'Password updated successfully' : 'Error updating password');
});

// Event listener for the add city button
document.getElementById('add-city-btn').addEventListener('click', async () => {
  // Send POST request to add a destination for a specific user
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

// Event listener for the delete city button
document.getElementById('delete-city-btn').addEventListener('click', async () => {
  // Get the city name from the input field
  const cityName = getInputValue('city-name');

  // Send DELETE request to delete a specific destination for a user
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
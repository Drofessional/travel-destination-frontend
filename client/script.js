// Store the base URL for your API
const apiBaseUrl = 'http://localhost:3000';

function login() {
  let username = document.getElementById('login-username').value;
  let password = document.getElementById('login-password').value;

  fetch(apiBaseUrl + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: username, password: password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      currentUser = { name: username };
      document.getElementById('login-register-container').style.display = 'none';
      document.getElementById('user-dashboard').style.display = 'block';
      document.getElementById('name').textContent = currentUser.name;
    } else {
      alert('Login failed');
    }
  });
}

function register() {
  let username = document.getElementById('register-username').value;
  let password = document.getElementById('register-password').value;

  fetch(apiBaseUrl + '/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: username, email: username, password: password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.name) {
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  });
}

function addCity() {
  let city = document.getElementById('city-input').value;

  fetch(apiBaseUrl + '/destinations/' + currentUser.name, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city: city }),
  })
  .then(response => response.json())
  .then(data => {
    if (data) {
      getDestinations();
    } else {
      alert('Failed to add city');
    }
  });
}

function deleteCity() {
  let city = document.getElementById('city-input').value;

  fetch(apiBaseUrl + '/destinations/' + currentUser.name + '/' + city, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Destination deleted successfully') {
      getDestinations();
    } else {
      alert('Failed to delete city');
    }
  });
}

function getDestinations() {
  fetch(apiBaseUrl + '/destinations/' + currentUser.name)
  .then(response => response.json())
  .then(data => {
    let destinationList = document.getElementById('destination-list');
    destinationList.innerHTML = '';

    data.forEach(destination => {
      let cityElement = document.createElement('div');
      cityElement.classList.add('destination-list-item');
      cityElement.textContent = destination.city + ', ' + destination.country + ' (' + destination.lat + ', ' + destination.lon + ') - ' + destination.attractions.join(', ');

      destinationList.appendChild(cityElement);
    });
  });
}

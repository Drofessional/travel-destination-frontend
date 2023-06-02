const API_URL = 'http://localhost:3000'; // Replace with your server's URL

document.getElementById('register-btn').addEventListener('click', async () => {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  if (response.ok) {
    alert('Registered successfully');
  } else {
    alert('Error in registration');
  }
});

document.getElementById('login-btn').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  console.log('email  ', email)
  console.log('password  ', password)

  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    const payload = await JSON.parse(atob(data.token.split('.')[1]));
    console.log('payload we need to get our user credentials from    ', payload)
    console.log('data this should be the token ', data)
    console.log('data this should be the token ', data.token)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', payload.name);
    alert('Logged in successfully');

    // Hide register, login, and update information elements
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('update').style.display = 'none';

    // Show city and destination elements
    document.getElementById('city-div').style.display = 'block';
    document.getElementById('destination-div').style.display = 'block';
  } else {
    alert('Error in login');
  }
});

document.getElementById('update-name-btn').addEventListener('click', async () => {
  const name = document.getElementById('update-name').value;

  const response = await fetch(`${API_URL}/users/updateName`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ newName: name })
  });

  if (response.ok) {
    localStorage.setItem('user', name);
    alert('Name updated successfully');
  } else {
    alert('Error updating name');
  }
});

document.getElementById('update-email-btn').addEventListener('click', async () => {
  const email = document.getElementById('update-email').value;

  const response = await fetch(`${API_URL}/users/updateEmail`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ newEmail: email })
  });

  if (response.ok) {
    alert('Email updated successfully');
  } else {
    alert('Error updating email');
  }
});

document.getElementById('update-password-btn').addEventListener('click', async () => {
  const password = document.getElementById('update-password').value;

  const response = await fetch(`${API_URL}/users/updatePassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ newPassword: password })
  });

  if (response.ok) {
    alert('Password updated successfully');
  } else {
    alert('Error updating password');
  }
});

document.getElementById('add-city-btn').addEventListener('click', async () => {
    const cityName = document.getElementById('city-name').value;
  // const countryName = document.getElementById('country-name').value;
    // const lon = document.getElementById('longitude').value;
    // const lat = document.getElementById('latitude').value;
  
    const response = await fetch(`${API_URL}/destinations/${localStorage.getItem('user')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        city: cityName
        // Add any other necessary data here
      })
    });
  
    if (response.ok) {
      const data = await response.json();
      alert('City added successfully');
      // Here, you can also update the user's list of destinations in the UI
    } else {
      alert('Error adding city');
    }
  });
  

document.getElementById('delete-city-btn').addEventListener('click', async () => {
  const cityName = document.getElementById('city-name').value;

  const response = await fetch(`${API_URL}/users/deleteCity`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ cityName })
  });

  if (response.ok) {
    alert('City deleted successfully');
    // You may want to update the destination list here
  } else {
    alert('Error deleting city');
  }
});
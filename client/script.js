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

  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    alert('Logged in successfully');
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

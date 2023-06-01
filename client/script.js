const apiBaseUrl = 'http://localhost:3000';

document.getElementById('register-btn').addEventListener('click', function() {
    let name = document.getElementById('register-name').value;
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;

    let data = {
        name: name,
        email: email,
        password: password
    };

    fetch(apiBaseUrl + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('login-btn').addEventListener('click', function() {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let data = {
        email: email,
        password: password
    };

    fetch(apiBaseUrl + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Login successful, do something
        } else {
            // Login failed, show error message
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

['name', 'email', 'password'].forEach(field => {
    document.getElementById(`update-${field}-btn`).addEventListener('click', function() {
        let value = document.getElementById(`update-${field}`).value;

        let data = {
            [field]: value
        };

        fetch(apiBaseUrl + `/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

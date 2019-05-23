async function login(event) {
    event.preventDefault();
    console.log('trying to login');
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;

    // in es6 enhanced object literals
    // same as doing username: username
    const credentials = {
        username,
        password
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(credentials),
            headers: {
                'content-type': 'application/json'
            }
        });

        console.log(response);

        if (response.status === 401) {
            document.getElementById('error-message').innerText = 'Invalid Credentials';
        } else if (response.status === 200) {
            const user = response.json();
            console.log(user);
        }else {
            document.getElementById('error-message').innerText = 'You can\'t log in right now';
        }
    } catch(err) {
        console.log(err);
    }
}
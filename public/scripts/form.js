// ------------ Form Submission ----------- //
// Signup form submission
document.getElementById('signupForm') && document.getElementById('signupForm').addEventListener('submit', (event) => {
    let formIsValid = true;
    const userData = {};
    event.preventDefault();

    [...document.getElementById('signupForm').elements].forEach(input =>  {
        if (input.type !== 'submit' && input.value === '') {
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

        } else if (input.type === 'password' && input.value.length < 4) {
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            $('.password-feedback').text(`Password must be at least 4 characters`);

        // Password check
        } else if (document.getElementById('signupPassword').value !== document.getElementById('signupPassword2').value) {
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            $('.password-feedback').text(`Passwords do not match`);
        

        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
        if (input.type !== 'submit' && formIsValid) {
            userData[input.name] = input.value;
        }
    });
    // Signup form submission
    if (formIsValid) {
        fetch('/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userData)
        })
        .then(dataStream => dataStream.json())
        .then($('#signupForm').empty().append(`
        <p>Thank you for signing up.</p>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" value="dummyValue">Close</button>
            <button type="button" data-toggle="modal" data-target="#loginModal">Login</button>
        </div>
        `))
        .catch(error => console.log('Error'));
    }
});

// Login form
document.getElementById('loginForm') && document.getElementById('loginForm').addEventListener('submit', (event) => {
    let formIsValid = true;
    const userData = {};
    event.preventDefault();


    [...document.getElementById('loginForm').elements].forEach(input =>  {
        if (input.type !== 'submit' && input.value === '') {
            formIsValid = false;
            $('.login-email-feedback').text(`Please enter your email`);
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

        } else if (input.type === 'password' && input.value.length < 4) {
            formIsValid = false;
            $('.login-password-feedback').text(`Password must be at least 4 characters`);
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
        if (input.type !== 'submit' && formIsValid) {
            userData[input.name] = input.value;
        }
    });
// Handle Login
if (formIsValid) {
    fetch('/api/v1/login', {
        method: 'POST', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(dataStream => dataStream.json())
    .then(res => {
        console.log('login successful')
        if(res.status=== 400) {
            $('.login-password-feedback').text(`Something went wrong. Please try again`);
            $('.login-email-feedback').text(`Something went wrong. Please try again`);
            $('.form-control').removeClass('is-valid');
            $('.form-control').addClass('is-invalid');
        } else if (res.status === 201) return window.location = `/profile/${res.data.id}`
    })
    .catch(error => console.log('Error'))
}
});
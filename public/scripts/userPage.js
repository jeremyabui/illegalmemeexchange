const form = document.querySelector('form');
const userId = window.location.pathname.split('/')[2];

//--------------------Nav Functions--------------------------
//Home Page Nav Button
$('.go-home').on('click', () => {
    return window.location = `/profile/${userId}`
})
//New Meme Nav Button
$('.newMemeLink').on('click', () => {
    return window.location = `/newMeme/${userId}`
})
//My Memes Nav Button
$('.myMemes').on('click', () => {
    return window.location = `myMemes/${userId}`
})
//Log Out Button
const logoutSuccess = () => {
    return window.location = `/`
}
const logoutError = () => {
    console.log('logout failed')
}
$('.logout').on('click', () => {
    $.ajax({
        method: 'DELETE',
        url: '/api/v1/logout',
        credentials: 'include',
        success: logoutSuccess,
        error: logoutError,
    })
})
//-------------------------------------------------------------

//Meme Posting Function
const postMeme = () => { 
    fetch(`/api/v1/memes`, {
        method: 'GET', 
        header: {
            'Content-Type': 'application/json',
        }
    })
    .then(dataStream=> dataStream.json())
    .then(res => {
        const memeArray = res.data;
        memeArray.forEach(function(meme) {
            $('.cardSection').prepend(`
            <div class="card">
                <div class="card-header bg-transparent">
                    <h2 class="memeTitle">${meme.title}</h2>
                </div>
                <div class="card-body">
                        <img class="memeImg" src="${meme.link}">
                </div>
                <div class="card-footer bg-transparent">${meme.tags.val()}</div>
            </div>
            `);
        });
    })
    .catch(error => console.log('Error'))
}

postMeme();

// ------------ Form Submission ----------- //
// Signup form submission
document.getElementById('signupForm') && document.getElementById('signupForm').addEventListener('submit', (event) => {
    let formIsValid = true;
    const userData = {};
    event.preventDefault();

    [...document.getElementById('signupForm').elements].forEach(input =>  {
        if (input.type !== 'submit' && input.value === '') {
            formIsValid = false;
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
            <div class='alert ${input.id}-message'>
              Please enter your ${input.id}
            </div>
        `);
        } else if (input.type === 'password' && input.value.length < 4) {
            formIsValid = false;
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
            <div class='alert ${input.id}-message'>
              Password must be at least 4 characters
            </div>
        `);
        }
        if (input.type !== 'submit' && formIsValid) {
            userData[input.name] = input.value;
        }
    });
    // Signup form submission
    if (form.id === 'signupForm' && formIsValid) {
        fetch('/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userData)
        })
        .then(dataStream => dataStream.json())
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
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
            <div class='alert ${input.id}-message'>
              Please enter your ${input.id}
            </div>
        `);
        } else if (input.type === 'password' && input.value.length < 4) {
            formIsValid = false;
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
            <div class='alert ${input.id}-message'>
              Password must be at least 4 characters
            </div>
        `);
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
        if (res.status === 201) return window.location = `/profile/${res.data.id}`
    })
    .catch(error => console.log('Error'))
}
});
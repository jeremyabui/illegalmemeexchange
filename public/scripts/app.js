console.log('Hi Jeremy');
const form = document.querySelector('form');

// const postMeme = (newMeme) => {
//     document.getElementsByClassName('card').append(`
//     <div class="card">
//         <div class="card-header bg-transparent">
//             <h2 class="${newMeme.title}">Meme Title</h2>
//         </div>
//         <div class="card-body">
//                 <img src="${newMeme.link}">
//         </div>
//         <div class="card-footer bg-transparent">Add like button</div>
//     </div>
//     `)
// }

// const postMeme = () => {
//     fetch(`http://localhost:3000/api/v1/memes`, {
//         method: 'GET',
//         body: JSON.stringify(data),
//     })
//     console.log(body)
// }

const postMeme = () => { 
    fetch(`/api/v1/memes`, {
        method: 'GET', 
        header: {
            'Content-Type': 'applicaion/json',
        }
    })
    .then(dataStream=> dataStream.json())
    .then(res => {
        const memeArray = res.data;
        console.log(memeArray)
        memeArray.forEach(function(meme) {
            $('.cardSection').append(`
            <div class="card">
                <div class="card-header bg-transparent">
                    <h2 class="memeTitle">${meme.title}</h2>
                </div>
                <div class="card-body">
                        <img class="memeImg" src="${meme.link}">
                </div>
                <div class="card-footer bg-transparent">Add like button</div>
            </div>
            `);
        });
    })
    .catch(error => console.log(error))
}

postMeme();







// ------------ Form Submission ----------- //
form && form.addEventListener('submit', (event) => {
    console.log('click')
    let formIsValid = true;
    const userData = {};
    event.preventDefault();

    [...form.elements].forEach(input =>  {
        if (input.type !== 'submit' && input.value === '') {
            console.log('changing form to false');
            console.log(`${input.type} and value is ${input.value}`);
            formIsValid = false;
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
            <div class='alert ${input.id}-message'>
              Please enter your ${input.id}
            </div>
        `);
        } else if (input.type === 'password' && input.value.length < 4) {
            console.log('changing form to false2');
            formIsValid = false;
            input.classList.add('input-error');
            input.insertAdjacentHTML('afterend', `
            <div class='alert ${input.id}-message'>
              Password must be at least 4 characters
            </div>
        `);
        }
        // console.log('first statement')
        if (input.type !== 'submit' && formIsValid) {
            userData[input.name] = input.value;
        }
        console.log(userData)
    });
    console.log(formIsValid);
    // Signup form submission
    if (form.id === 'signupForm' && formIsValid) {
        fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userData)
        })
        .then(dataStream => dataStream.json())
        .then(res => {
            console.log(res);
        })
        .catch(error => console.log(error));
    }

    console.log('click before login form func')

    // Handle Login
    if (form.id === 'loginForm' && formIsValid) {
        console.log('login submit button');
        console.log('submitting user login ---->', userData);
        fetch('/api/v1/users', {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(dataStream => dataStream.json())
        .then(res => {
            console.log(res);
            console.log('login successful')
            if (res.status === 201) return window.location = `/successful.html`
            // May need to update window location on login
        })
        .catch(error => console.log(error))
    }
});

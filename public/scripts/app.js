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
        memeArray.forEach(function(meme) {
            $('.card').append(`
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
    console.log(event)
    let formIsValid = true;
    const userData = {};
    event.preventDefault();

    [...form].forEach(input =>  {
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
    if (document.getElementById('signupForm').id === 'signupForm' && formIsValid) {
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

    // Handle Login
    // if (form.id === 'loginForm' && formIsValid) {
    //     console.log('submitting user login ---->', userData);
    //     fetch('/api/v1/login', {
    //         method: 'POST', 
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(userData)
    //     })
    //     .then(dataStream => dataStream.json())
    //     .then(res => {
    //         console.log(res);
    //         if (res.status === 201) return window.location = `/`
    //         // May need to update window location on login
    //     })
    //     .catch(error => console.log(error))
    // }
});
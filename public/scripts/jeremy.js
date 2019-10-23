console.log('Hi Jeremy');
const form = document.querySelector('form');
const userId = window.location.pathname.split('/')[2];
console.log(userId);
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
// Signup form submission
document.getElementById('signupForm') && document.getElementById('signupForm').addEventListener('submit', (event) => {
    console.log('click')
    let formIsValid = true;
    const userData = {};
    event.preventDefault();

    [...document.getElementById('signupForm').elements].forEach(input =>  {
        if (input.type !== 'submit' && input.value === '') {
            console.log('changing form to false');
            console.log(`${input.type} and value is ${input.value}`);
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            // console.log($(`.${input.id}-message`).html())
            // const $alertID = $(`.${input.id}-message`);
            // console.log($alertID);
        //     input.insertAdjacentHTML('afterend', `
        //     <div class='alert ${input.id}-message'>
        //       Please enter your ${input.name}
        //     </div>
        // `);

        } else if (input.type === 'password' && input.value.length < 4) {
            console.log('changing form to false2');
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        //     input.insertAdjacentHTML('afterend', `
        //     <div class='alert ${input.id}-message'>
        //       Password must be at least 4 characters
        //     </div>
        // `);
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
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
        fetch('/api/v1/signup', {
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
        .then($('#signupForm').empty().append(`
        <p>Thank you for signing up.</p>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" value="dummyValue">Close</button>
            <button type="button" data-toggle="modal" data-target="#loginModal">Login</button>
        </div>
        `))
        .catch(error => console.log(error));
    }
});

// Login form
document.getElementById('loginForm') && document.getElementById('loginForm').addEventListener('submit', (event) => {
    console.log('click')
    let formIsValid = true;
    const userData = {};
    event.preventDefault();

    [...document.getElementById('loginForm').elements].forEach(input =>  {
        const $input = input;
        if (input.type !== 'submit' && input.value === '') {
            console.log('changing form to false');
            console.log(`${input.type} and value is ${input.value}`);
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            // input.insertAdjacentHTML('afterend', `
            // <div class='alert ${input.id}-message'>
            //   Please enter your ${input.id}
            // </div>
        // `);
        } else if (input.type === 'password' && input.value.length < 4) {
            console.log('changing form to false2');
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            
        //     input.insertAdjacentHTML('afterend', `
        //     <div class='alert ${input.id}-message'>
        //       Password must be at least 4 characters
        //     </div>
        // `);
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
        if (input.type !== 'submit' && formIsValid) {
            userData[input.name] = input.value;
        }
        console.log(userData)
    });
    console.log(formIsValid);
// Handle Login
if (formIsValid) {
    console.log('login submit button');
    console.log('submitting user login ---->', userData);
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
        console.log(res);
        console.log('login successful')
        if (res.status === 201) return window.location = `/profile/${res.data.id}`
        // May need to update window location on login
    })
    .catch(error => console.log(error))
}
});


$('.newMemeLink').on('click', () => {
    return window.location = `/newMeme/${userId}`
})
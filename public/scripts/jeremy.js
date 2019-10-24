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

// const postMeme = () => { 
//     fetch(`/api/v1/memes`, {
//         method: 'GET', 
//         header: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(dataStream=> dataStream.json())
//     .then(res => {
//         const memeArray = res.data;
//         console.log(memeArray)
//         memeArray.forEach(function(meme) {
//             $('.cardSection').prepend(`
//             <div class="card">
//                 <div class="card-header bg-transparent">
//                     <h2 class="memeTitle">${meme.title}</h2>
//                 </div>
//                 <div class="card-body">
//                         <img class="memeImg" src="${meme.link}">
//                 </div>
//                 <div class="card-footer bg-transparent">Add like button</div>
//             </div>
//             `);
//         });
//     })
//     .catch(error => console.log(error))
// }

// postMeme();







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
            $('.password-feedback').text(`Password must be at least 4 characters`);
        //     input.insertAdjacentHTML('afterend', `
        //     <div class='alert ${input.id}-message'>
        //       Password must be at least 4 characters
        //     </div>
        // `);

        // Password check
        } else if (document.getElementById('signupPassword').value !== document.getElementById('signupPassword2').value) {
            formIsValid = false;
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            console.log(`password 1 = ` + document.getElementById('signupPassword').value);
            console.log(`password 2 = ` + document.getElementById('signupPassword2').value);
            $('.password-feedback').text(`Passwords do not match`);
        

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


// Infinite scrolling
// https://codepen.io/wernight/pen/YyvNoW
let scrollCounter= 0;
const loadMore = function() {
    fetch(`/api/v1/memes`, {
        method: 'GET', 
        header: {
            'Content-Type': 'application/json',
        }
    })
    .then(dataStream=> dataStream.json())
    .then(res => {
        const memeArray = res.data;
        console.log(memeArray);
        let scrollIndex = memeArray.length-1;
        
            for (let i = 0; i < 10; i++) {
                scrollIndex = scrollIndex - scrollCounter;
                console.log(scrollIndex);
                $('.cardSection').append(`
                <div class="card">
                    <div class="card-header bg-transparent">
                        <h2 class="memeTitle">${memeArray[scrollIndex].title}</h2>
                    </div>
                    <div class="card-body">
                            <img class="memeImg" src="${memeArray[scrollIndex].link}">
                    </div>
                    <div class="card-footer bg-transparent">Add like button</div>
                </div>
                `);
                scrollCounter++;
            };
    })
    .catch(error => console.log(error))
}

// Working load more with append
/* const loadMore = function() {
    fetch(`/api/v1/memes`, {
        method: 'GET', 
        header: {
            'Content-Type': 'application/json',
        }
    })
    .then(dataStream=> dataStream.json())
    .then(res => {
        const memeArray = res.data;
        console.log(memeArray)
            for (let i = 0; i < 10; i++) {
                // console.log(index);
                $('.cardSection').append(`
                <div class="card">
                    <div class="card-header bg-transparent">
                        <h2 class="memeTitle">${memeArray[index].title}</h2>
                    </div>
                    <div class="card-body">
                            <img class="memeImg" src="${memeArray[index].link}">
                    </div>
                    <div class="card-footer bg-transparent">Add like button</div>
                </div>
                `);
                index++;
            };
    })
    .catch(error => console.log(error))
} */
loadMore();

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        // console.log('hit rock bottom')
        loadMore();
    }
});

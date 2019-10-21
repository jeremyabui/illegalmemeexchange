console.log('Hi Jeremy');

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
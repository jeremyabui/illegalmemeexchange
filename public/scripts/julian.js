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

const handleSignup = () => {
    console.log('click')
}

$('.btn').on('submit', handleSignup)

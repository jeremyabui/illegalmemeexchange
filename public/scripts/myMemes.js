console.log('memelyfe');
const userId = window.location.pathname.split('/')[3];
console.log(userId);

//Home Page Nav Button
$('.go-home').on('click', () => {
    return window.location = `/profile/${userId}`
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
        url: 'http://localhost:3000/api/v1/logout',
        credentials: 'include',
        success: logoutSuccess,
        error: logoutError,
    })
})

//Meme Posting to DOM
const onError = () => {
    console.log('error')
}

const postMemes = (res) => {
    console.log(res)
    const meme = res.data;
    $('.cardSection').prepend(`
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
};

const onSuccess = (res) => {
    console.log(res.data.memes)
    res.data.memes.forEach((meme) => {
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/api/v1/memes/${meme}`,
            success: postMemes,
            error: onError,
        })
    })
}

const findMyMemes = () => { 
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/api/v1/users/profile/${userId}`,
        success: onSuccess,
        error: onError,
    })
}

findMyMemes(); 


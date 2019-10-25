const userId = window.location.pathname.split('/')[2];
let memeId = "";

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
    return window.location = `/myMemes/${userId}`
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

const onSuccess = (res) => {
    memeId = res.data._id;
    updateOwner();
};

const someSuccess = () => {
    return window.location = `/profile/${userId}`
}

const onError = () => {
    console.log('Error');
}

const newMeme = () => {
    $.ajax({
        method: 'POST',
        url: '/api/v1/memes',
        data: {
            title: $('#title').val(),
            link: $('#link').val(),
            tags: $('#tags').val().split(' ')
        },
        success: onSuccess,
        error: onError,
    })
}

const updateOwner = () => {
    $.ajax({
        method: 'PUT',
        url: `/api/v1/users/${userId}`,
        data: {
            memes: [memeId]
        },
        success: someSuccess,
        error: onError,
    })
}

const postNewMeme = (event) => {
    event.preventDefault();
    newMeme();
}

//Event listener
$('form').on('submit', postNewMeme);

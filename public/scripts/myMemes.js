const userId = window.location.pathname.split('/')[2];

// Toggle Sidebar
$('#toggleSidebar').on('click', () => {
    $('#sidebarNav').toggleClass('d-none');
    $('#sidebarNav').toggleClass('d-block');
})

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

//Delete Meme
const deleteEntry = (res) => {
    findMyMemes();
}

const errDeleteEntry = () => {
    console.log('Something went wrong, the meme was not deleted.')
}

const deleteMeme = (memeId) => {
    $.ajax({
        method: 'DELETE',
        url: `/api/v1/memes/${memeId}`,
        success: deleteEntry,
        error: errDeleteEntry,
    })
}

const updateUserSuccess = (res) => {
    console.log(`deleted user`)
}

const updateError = () => {
    console.log('failed to update user')
}


updateUser = (memeId) => {
    $.ajax({
        method: 'PUT',
        url: `/api/v1/users/${userId}/${memeId}`,
        success: updateUserSuccess,
        error: updateError,
    })
}
//User Update and Delete Meme
$('.cardSection').on('click', '.delete-btn', () => {
    let memeId = $(event.target).parent().parent().attr('id');;
    updateUser(memeId);
    deleteMeme(memeId);
})

//Meme Posting to DOM
const onError = () => {
    console.log('error')
}

const postMemes = (res) => {
    const meme = res.data;
    $('.cardSection').prepend(`
    <div class="card" id="${meme._id}">
        <div class="card-header bg-transparent">
            <h2 class="memeTitle">${meme.title}</h2>
        </div>
        <div class="card-body">
                <img class="memeImg" src="${meme.link}">
        </div>
        <div class="card-footer bg-transparent">
            <input type="button" class="btn btn-primary delete-btn" value="Delete"/>
        </div>
    </div>
    `);
};

const onSuccess = (res) => {
    $('.cardSection').empty();
    res.data.memes.forEach((meme) => {
        $.ajax({
            method: 'GET',
            url: `/api/v1/memes/${meme}`,
            success: postMemes,
            error: onError,
        })
    })
}

const findMyMemes = () => { 
    $.ajax({
        method: 'GET',
        url: `/api/v1/users/profile/${userId}`,
        success: onSuccess,
        error: onError,
    })
}

findMyMemes(); 


const userId = window.location.pathname.split('/')[2];
let memeId = "";

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

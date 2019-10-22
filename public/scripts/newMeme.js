console.log('new meme form')

const onSuccess = (event) => {
    console.log('Success')
    return window.location = `/`
    
};

const onError = (event) => {
    console.log('Error');
}

const newMeme = () => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/memes',
        data: {
            title: $('#title').val(),
            link: $('#link').val(),
            tags: $('#tags').val().split(' ')
        },
        success: onSuccess,
        error: onError,
    })
}

const postNewMeme = (event) => {
    event.preventDefault();
    newMeme();
}

//Event listener
$('form').on('submit', postNewMeme);

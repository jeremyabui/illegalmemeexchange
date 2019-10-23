console.log('memelyfe');
const userId = window.location.pathname.split('/')[3];
console.log(userId);

const onSuccess = (res) => {
    console.log(res)
}

const onError = () => {
    console.log('error')
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
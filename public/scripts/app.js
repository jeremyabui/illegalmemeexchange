// --------- Global Variables ---------- //
// Variable for infinite scrolling
let scrollCounter= 0;

// Infinite scrolling
// https://codepen.io/wernight/pen/YyvNoW
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
        let scrollIndex = memeArray.length-1;
        
            for (let i = 0; i < 10; i++) {
                scrollIndex = scrollIndex - scrollCounter;
                $('.cardSection').append(`
                <div class="card">
                    <div class="card-header bg-transparent">
                        <h2 class="memeTitle">${memeArray[scrollIndex].title}</h2>
                    </div>
                    <div class="card-body">
                            <img class="memeImg" src="${memeArray[scrollIndex].link}">
                    </div>
                </div>
                `);
                scrollCounter++;
            };
    })
    .catch(error => console.log('Error!'))
}

loadMore();

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        loadMore();
    }
});

// Toggle Sidebar
$('#toggleSidebar').on('click', () => {
    $('#sidebarNav').toggleClass('d-none');
    $('#sidebarNav').toggleClass('d-block');
})
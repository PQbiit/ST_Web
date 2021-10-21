let coverPhoto = document.querySelector('#cover-photo');
let showTitle = document.querySelector('#show-title');
let typeText = document.querySelector('#type');
let durationText = document.querySelector('#duration');
let contentRatingText = document.querySelector('#content-rating');
let showLengthText = document.querySelector('#show-length');
let showRating = document.querySelector('#rating');
let showPopularity = document.querySelector('#popularity');
let genreContainer = document.querySelector('#genre-container');
let showPlot = document.querySelector('#plot');
let youtubeVideo = document.querySelector('#youtube-video');

let userInstance = null;
let currentShow = {};

function getUserInstance(){
    axios.get('/user').then(res =>{
        userInstance = res.data;
        updateNavBar();
        setUIWithData();
    }).catch(err =>{
        console.log(err);
    })
}

function updateNavBar(){
    let profileIcon = document.querySelector('#profile-pic-icon');
    let profileButton = document.querySelector('#profile-link');
    if(userInstance){
        profileIcon.setAttribute('src',userInstance.profile_img);
        profileButton.setAttribute('href',`/user/${userInstance.id}/dashboard`);
    }
}

async function getShowData(){
    const [show] = await Promise.all([
        axios.get(`/showData/${userInstance.currentShow.imdbID}`).catch(err =>{
            console.log(err);
        })
    ]);
    return show.data.results;
}

async function setUIWithData(){
    let genres = "";

    currentShow = await getShowData();
    console.log(currentShow);
    coverPhoto.setAttribute('src',currentShow.image_url);
    showTitle.innerText = currentShow.title;
    typeText.innerText = currentShow.type;
    durationText.innerText = currentShow.start_year;
    contentRatingText.innerText = currentShow.content_rating;
    showLengthText.innerText = `${currentShow.movie_length} min`;
    showRating.innerText = currentShow.rating;
    showPopularity.innerText = currentShow.popularity;
    for (let i = 0; i < currentShow.gen.length; i++) {
        let genrePTag = document.createElement('p');
        genrePTag.innerText = currentShow.gen[i].genre;
        genreContainer.appendChild(genrePTag);
    }
    showPlot.innerHTML = currentShow.plot;
    youtubeVideo.setAttribute('src',currentShow.trailer);
}

getUserInstance();
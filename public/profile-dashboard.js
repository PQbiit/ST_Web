const profilePicture = document.querySelector('#profile-picture');
const userNameTag = document.querySelector('h1');
const profileIcon = document.querySelector('#profile-pic-icon');
const favShowsContainer = document.querySelector('#fav-shows-container');

let userInstance = null;

function setUserData(){
    axios.get('/user').then(res =>{
        userInstance = res.data;
        profilePicture.setAttribute('src',userInstance.profile_img);
        userNameTag.textContent = userInstance.name;
        profileIcon.setAttribute('src',userInstance.profile_img);
        setFavShows();
    }).catch(err =>{
        console.log(err);
    });
}

function setFavShows(){
    let favShows = userInstance.fav_shows;
    for (let i = 0; i < favShows.length; i++) {
        let cardContainer = document.createElement('div');
        cardContainer.innerHTML = `
            <div class="show-card" onclick="goToShowPage(\'${favShows[i].imbd_id}\')">
                <div id="show-cover">
                    <img id="image" src="${favShows[i].image_url}">
                </div>
                <div id="lower-container">
                    <h3>${favShows[i].title}</h3>
                    <p>${favShows[i].start_year}</p>
                </div>
            </div>
        `
        //cardContainer.addEventListener('click',goToShowPage(i))
        favShowsContainer.appendChild(cardContainer);
    }
}

function goToShowPage(imdbID){
    axios.post('/showData',{imdbID}).then(res =>{
        if(res.status === 200){
            window.location = `/series/${imdbID}/`;
        }
    }).catch(err=>{
        console.log(err);
    });
}

setUserData();
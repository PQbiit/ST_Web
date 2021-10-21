const showsList = document.querySelector('#shows-list');
const showTitle = document.querySelector('#show-title');
const showDateOfIssue = document.querySelector('#show-doi');
const showCountry = document.querySelector('#show-country');
const showGenre = document.querySelector('#show-genre');
const showDesc = document.querySelector('#show-description');
const favButton = document.querySelector('#add-favorite');
const backShowsButton = document.querySelector('#back-shows');
const nextShowsButton = document.querySelector('#next-shows');

const glider = new Glide('.shows-glide',{
    perView: 2
});
let userInstance = null;
let series = [];
let activeCardIndex = 0;

backShowsButton.addEventListener('click',()=>{
    if (activeCardIndex-1 < 0) {
        activeCardIndex = series.length-1;
    }else{
        activeCardIndex -=1;
    }
    glider.go(`=${activeCardIndex}`);
    updateInfoCard();
});

nextShowsButton.addEventListener('click',()=>{
    if (activeCardIndex+1 > series.length-1) {
        activeCardIndex = 0;
    }else{
        activeCardIndex +=1;
    }
    glider.go(`=${activeCardIndex}`);
    updateInfoCard();
});

favButton.addEventListener('click',()=>{
    console.log(userInstance);
    axios.post(`/user/${userInstance.id}/fav`,series[activeCardIndex]).then(res =>{
        userInstance = res.data;
        favButton.disabled = true;
        console.log(userInstance);
    }).catch(err =>{
        console.log(err);
    });
});

function getUserInstance(){
    axios.get('/user').then(res =>{
        userInstance = res.data;
        updateNavBar();
    }).catch(err =>{
        console.log(err);
    })
}

async function setShowsData() {
    let showsIDs = [];
    let seriesArr = [];
    let idsRequest = {
        method: 'GET',
        url: 'https://data-imdb1.p.rapidapi.com/series/byYear/2021/',
        params: {page_size: '10'},
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': '96173490famshc276e9f918d36a4p19c4b5jsn04ad17110523'
        }
    };
    const [seriesIDs] = await Promise.all([
        axios.request(idsRequest)
    ]);
    showsIDs = seriesIDs.data.results;

    for (let i = 0; i < showsIDs.length; i++) {
        var showDataRequest = {
            method: 'GET',
            url: `https://data-imdb1.p.rapidapi.com/series/id/${showsIDs[i].imdb_id}/`,
            params: {page_size: '10'},
            headers: {
                'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
                'x-rapidapi-key': '96173490famshc276e9f918d36a4p19c4b5jsn04ad17110523'
            }
        };

        let show = await axios.request(showDataRequest);
        seriesArr.push(show.data.results);
    }
    return seriesArr;
}

async function setupUI(){
    series = await setShowsData();
    let genresArr = series[0].gen;
    let seriesGenre = "";
    createSliderCard();
    glider.mount();
    for (let i = 0; i < genresArr.length; i++) {
        seriesGenre += `${genresArr[i].genre} `;
    }
    showTitle.innerText = series[0].title;
    showDateOfIssue.innerText = series[0].start_year;
    showGenre.innerText = seriesGenre
    showDesc.innerText = series[0].description;
}

function createSliderCard(){
    for (let i = 0; i < series.length; i++) {
        let cardContainer = document.createElement('li');
        cardContainer.classList.add('glide__slide');
        cardContainer.innerHTML = `
            <div id="show-card">
                <div id="show-cover">
                    <img id="image" src="${series[i].image_url}">
                </div>
                <div id="lower-container">
                    <aside id="data">
                        <h3>${series[i].title}</h3>
                        <p>${series[i].start_year}</p>
                    </aside>
                    <aside id="fav-button-container">
                        <button class="fav-marked">Add to favorites</button>
                    </aside>
                </div>
            </div>
        `
        showsList.appendChild(cardContainer);
    }
}

function updateInfoCard(){
    resetText();
    let genresArr = series[activeCardIndex].gen;
    let seriesGenre = "";
    createSliderCard();
    for (let i = 0; i < genresArr.length; i++) {
        seriesGenre += `${genresArr[i].genre} `;
    }
    showTitle.innerText = series[activeCardIndex].title;
    showDateOfIssue.innerText = series[activeCardIndex].start_year;
    showGenre.innerText = seriesGenre
    showDesc.innerText = series[activeCardIndex].description;
}

function resetText(){
    showTitle.innerText = ""
    showDateOfIssue.innerText = ""
    showGenre.innerText = ""
    showDesc.innerText = ""
}

function updateNavBar(){
    let profileIcon = document.querySelector('#profile-pic-icon');
    let profileButton = document.querySelector('#profile-link');
    if(userInstance){
        profileIcon.setAttribute('src',userInstance.profile_img);
        profileButton.setAttribute('href',`/user/${userInstance.id}/dashboard`);
    }
}

getUserInstance();
setupUI();

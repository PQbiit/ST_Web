const showsList = document.querySelector('#shows-list');

let series = [];

function loadSeriesIDs(){
    var request = {
        method: 'GET',
        url: 'https://data-imdb1.p.rapidapi.com/series/byYear/2021/',
        params: {page_size: '10'},
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': '96173490famshc276e9f918d36a4p19c4b5jsn04ad17110523'
        }
    };
    axios.request(request).then(res =>{
        getSeriesFullData(res.data.results);
    }).catch(err =>{
        console.log(err);
    });
}

function getSeriesFullData(seriesArr){
    for (let i = 0; i < seriesArr.length; i++) {
        var request = {
            method: 'GET',
            url: `https://data-imdb1.p.rapidapi.com/series/id/${seriesArr[i].imdb_id}/`,
            headers: {
              'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
              'x-rapidapi-key': '96173490famshc276e9f918d36a4p19c4b5jsn04ad17110523'
            }
        };
        axios.request(request).then(res =>{
            // series.push(res.data.results);
            test(res.data.results)
        }).catch(err =>{
            console.log(err)
        }).then(()=>{
            setSeries();
        })
          
    }
}

function test(series){
    let cardContainer = document.createElement('li');
    cardContainer.classList.add('glide__slide');
    cardContainer.innerHTML = `
        <div id="show-card">
            <div id="show-cover">
                <img id="image" src="${series.image_url}">
            </div>
            <div id="lower-container">
                <aside id="data">
                    <h3>${series.title}</h3>
                    <p>${series.start_year}</p>
                </aside>
                <aside id="fav-button-container">
                    <button class="fav-marked">Add to favorites</button>
                </aside>
            </div>
        </div>
    `
    showsList.appendChild(cardContainer);
}

function setSeries(){
    // for (let i = 0; i < series.length; i++) {
    //     let cardContainer = document.createElement('li');
    //     cardContainer.classList.add('glide__slide');
    //     cardContainer.innerHTML = `
    //     <div id="show-card">
    //             <div id="show-cover">
    //                 <img id="image" src="${series[i].image_url}">
    //             </div>
    //             <div id="lower-container">
    //                 <aside id="data">
    //                     <h3>${series[i].title}</h3>
    //                     <p>${series[i].start_year}</p>
    //                 </aside>
    //                 <aside id="fav-button-container">
    //                     <button class="fav-marked">Add to favorites</button>
    //                 </aside>
    //             </div>
    //     </div>
    //     `
    //     showsList.appendChild(cardContainer);
    // }
    new Glide('.shows-glide',{
        perView: 2
    }).mount();
}

loadSeriesIDs();
const axios = require('axios');
const path = require('path');

const users = [{
    id: 1,
    name: 'Jhon Appleseed',
    email: 'test1@hotmail.com',
    username: 'test1',
    password: 'qwerty',
    profile_img: '/media/profile1.jpeg',
    fav_shows: [{
            imbd_id: "tt2467372",
            title: "Brooklyn Nine-Nine",
            start_year: 2013,
            end_year: 2022,
            popularity: 54,
            image_url: "https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
            plot: "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.",
            gen: [{id: 7, genre: "Crime"},{id: 9, genre: "Comedy"}]
        },
        {
            imbd_id: "tt2861424",
            title: "Rick and Morty",
            start_year: 2013,
            end_year: 0,
            popularity: 106,
            image_url: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
            plot: "An animated series that follows the exploits of a super scientist and his not-so-bright grandson.",
            gen: [{id: 4, genre: "Adventure"},{id: 9, genre: "Comedy"},{id: 10, genre: "Animation"},{id: 11, genre: "Sci-Fi"}]
        },
        {
            imbd_id: "tt4786824",
            title: "The Crown",
            start_year: 2016,
            end_year: 0,
            popularity: 12,
            image_url: "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njk3LWFjMzctMWQwZDAwMGJmY2MyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
            plot: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
            gen: [{id: 8, genre: "Drama"},{id: 27, genre: "Biography"},{id: 31, genre: "History"}]
        }
    ],
    fav_actors: [],
    currentShow: null
}];
let currentID = users[users.length-1].id;
let sessionUser = null;

module.exports = {
    home: (req,res) =>{
        res.sendFile(path.join(__dirname,'../public/home.html')); 
    },
    series: (req,res) =>{
        res.sendFile(path.join(__dirname,'../public/series.html'));
    },
    loginRegister: (req,res) =>{
        res.sendFile(path.join(__dirname,'../public/register-login.html'));
    },
    dashboardRedirect: (req,res) =>{
        res.sendFile(path.join(__dirname,'../public/profile-dashboard.html'));
    },
    showRedirect: (req,res) =>{
        res.sendFile(path.join(__dirname,'../public/show.html'));
    },
    setCurrentShow: (req,res) =>{
        console.log("incomming show id",req.body)
        let showID = req.body;
        sessionUser.currentShow = showID;
        res.sendStatus(200);
    },
    getShowWithID: (req,res) =>{
        console.log('getShowWithID Hit')
        let showID = req.params.id
        var showRequest = {
            method: 'GET',
            url: `https://data-imdb1.p.rapidapi.com/series/id/${showID}/`,
            headers: {
              'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
              'x-rapidapi-key': '27a7e1b670mshfb4a33a8b05805fp1b2b42jsn43a44ec3ad4b'
            }
        };
        axios.request(showRequest).then(show =>{
            res.status(200).send(show.data);
        });
    },
    login: (req,res) =>{
        const {username, password} = req.body;
        let targetIndex = users.findIndex(user => user.username === username);
        if(users[targetIndex].password === password){
            sessionUser = users[targetIndex];
            res.status(200).send(sessionUser);
        }else{
            res.sendStatus(400);
        }
    },
    register: (req,res) =>{
        const {name, email, username, password} = req.body;
        let newUser = {
            id: currentID,
            name,
            email,
            username,
            password,
            profile_img: '/media/profile2.jpeg',
            fav_shows: [],
            fav_actors: [],
            currentShow: null
        };
        users.push(newUser);
        currentID +=1;
        sessionUser = newUser;
        res.status(200).send(sessionUser);
    },
    addFavorite: (req,res) =>{
        let favSeries = req.body;
        let userID = req.params.id;
        let targetID = users.findIndex(user => user.id = userID);
        if (targetID !== -1) {
            users[targetID].fav_shows.push(favSeries);
            res.status(200).send(users[targetID]);
        }else{
            res.sendStatus(404);
        }
    },
    getUserInstance: (req,res) =>{
        res.status(200).send(sessionUser);
    },
}
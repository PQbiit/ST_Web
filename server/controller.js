const path = require('path');

const users = [{
    id: 1,
    name: 'Jhon Appleseed',
    email: 'test1@hotmail.com',
    username: 'test1',
    password: 'qwerty',
    profile_img: '/media/profile1.jpeg',
    fav_shows: [],
    fav_actors: []
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
            fav_actors: []
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
    }
}
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
    userDashboard: (req,res) =>{
        res.sendFile(path.join(__dirname,'../public/profile-dashboard.html'));
    },
    login: (req,res) =>{
        const {username, password} = req.body;
        let targetIndex = users.findIndex(user => user.username === username);
        if(users[targetIndex].password === password){
            sessionUser = users[targetIndex];
            res.sendStatus(200);
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
            profile_img: 'media/profile1.jpeg',
            fav_shows: [],
            fav_actors: []
        };
        console.log(newUser)
        users.push(newUser);
        currentID +=1;
        sessionUser = newUser;
        res.sendStatus(200);
    },
    fetchProfileData: (req,res) =>{
        res.status(200).send(sessionUser);
    }
}
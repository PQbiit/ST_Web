const profilePicture = document.querySelector('#profile-picture');
const userNameTag = document.querySelector('h1');
const profileIcon = document.querySelector('#profile-pic-icon');
let currentUser = null;

function setData(){
    axios.get('/data/dashboard').then(res =>{
        console.log(res.data);
        currentUser = res.data;
        console.log(currentUser);
        profilePicture.setAttribute('src',currentUser.profile_img);
        userNameTag.textContent = currentUser.name;
        profileIcon.setAttribute('src',currentUser.profile_img)
    }).catch(err =>{
        console.log(err);
    });
}

setData();
const profilePicture = document.querySelector('#profile-picture');
const userNameTag = document.querySelector('h1');
const profileIcon = document.querySelector('#profile-pic-icon');
let userInstance = null;

function setUserData(){
    axios.get('/user').then(res =>{
        userInstance = res.data;
        console.log(userInstance);
        profilePicture.setAttribute('src',userInstance.profile_img);
        userNameTag.textContent = userInstance.name;
        profileIcon.setAttribute('src',userInstance.profile_img)
    }).catch(err =>{
        console.log(err);
    });
}

setUserData();
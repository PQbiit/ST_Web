const loginFormView = document.querySelector('#log-in');
const registerFormView = document.querySelector('#register');
const createLink = document.querySelector('#create-link');
const loginLink = document.querySelector('#log-in-link');
const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#log-in-form');

let isCreate = false;

function changeForm(){
    if(isCreate){
        loginFormView.classList.add('hidden-form');
        loginFormView.classList.remove('form-container');
        registerFormView.classList.remove('hidden-form');
        registerFormView.classList.add('form-container')
    }else{
        registerFormView.classList.add('hidden-form');
        registerFormView.classList.remove('form-container');
        loginFormView.classList.remove('hidden-form');
        loginFormView.classList.add('form-container');
    }
}

createLink.addEventListener('click',()=>{
    isCreate = true;
    changeForm()
});

loginLink.addEventListener('click',()=>{
    isCreate = false;
    changeForm()
});

registerForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let user = {
        name,
        email,
        username,
        password
    };
    console.log(user)
    axios.post('/register',user);
});

loginForm.addEventListener('submit',e =>{
    e.preventDefault();
    let username = document.querySelector('#login-username').value;
    let password = document.querySelector('#login-password').value;
    let userCredentials = {
        username,
        password
    };
    axios.post('/login',userCredentials).then(
        window.location = '/user/dashboard'
    );
});
let userInstance = null
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

function getUserInstance(){
  axios.get('/user').then(res =>{
      userInstance = res.data;
      updateNavBar();
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

getUserInstance();
showSlides(slideIndex);

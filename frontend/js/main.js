$(document).ready(function(){
    $('.header').height($(window).height());
  });









// for testing
var getBtn = document.getElementById('getdata');
var postBtn = document.getElementById('postdata');
function createAccount(){
  document.getElementById("createAccountForm").submit(); 
}
var myForm = document.getElementById("createAccountForm");
myForm.addEventListener('submit', function(e){
  e.preventDefault();
  const formData = new FormData(this);
  
  console.log(formData)

  fetch('https://reqres.in/api/register', {
    method: 'post',
    body: "formData"
  }).then(function (response) {
    return response.text();
  }).then(function (text) {
    console.log(text);
  }).catch(function (error){
    console.error(error);
  })
});

const getData = () =>{
  axios.get('https://reqres.in/api/users').then(response =>{
    console.log(response);
  })
}

const postData = () =>{
  axios.post('https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol'
  }).then(response =>{
    console.log(response);
  })
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', postData);

// ---------for testing
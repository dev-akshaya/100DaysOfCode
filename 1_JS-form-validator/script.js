const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Error Message 
function showError(input, message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Success Message 
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success'
}

// Check Email 
function checkEmail(input){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value)){
    showSuccess(input);
  } else{
    showError(input, 'Email is not Valid');
  }
}

// Check All Required Fields
function checkRequired(inputArr){
  inputArr.forEach(function(input){
    if(input.value.trim() === ''){
      showError(input, `${idCap(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}

// Get the input.id with Capitalize
function idCap(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Input Length
function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, `${idCap(input)} must be atleast ${min} character`);
  } else if(input.value.length > max){
    showError(input, `${idCap(input)} must be less then ${max} character`)
  }
  else{
    showSuccess(input);
  }
}

// Event Listener
form.addEventListener('submit', function(e){
  e.preventDefault();

  checkRequired([username,email,password,password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
});
const github = new Github;
const ui = new UI;

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;
  if(!userText == '') {

    // console.log(userText);

    github.getUser(userText)
    .then(data => {

      if(data.profile.message === 'Not Found') {
        // Show Alert 
        ui.showAlert('User not Found', 'alert alert-danger');
      } else {
        // Show Profile
        ui.showProfile(data.profile);
      }

    })
  } else {

    // Clear Profile
    clearProfile();
  }
})
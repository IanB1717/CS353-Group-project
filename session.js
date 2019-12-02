function printUser() {
    console.log(auth.currentUser.uid);
}

function checkLogin() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
          document.getElementById("login-tab").innerHTML = "USER LOGGED IN: <button id='myBtn' class='button' id = 'logout'onclick = 'logOut()'>Sign Out</button>";
        } else {
            document.getElementById("login-tab").innerHTML = "<button id='myBtn' class='button'><a href='sign_up.html'>Login/Register</a></button>";			
        }
      });
}
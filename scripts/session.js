function printUser() {
    console.log(auth.currentUser.uid);
}

function checkLogin() {
    auth.onAuthStateChanged(function(user) {
        if (user) {

            document.getElementById("login-tab").innerHTML = "USER LOGGED IN: <button id='myBtn' class='btn btn-outline-danger' id = 'logout'onclick = 'signOut()'>Sign Out</button>";
            document.getElementById("profile-tab").innerHTML = "<h3> <button class='btn btn-outline-dark'><i class='glyphicon glyphicon-user'></i><a href='profile.html'>Profile</a> </button></h3>";
        } else {
            document.getElementById("profile-tab").innerHTML = "";
            document.getElementById("login-tab").innerHTML = "<button id='myBtn' class='btn btn-outline-dark'><a href='sign_up.html'>Login/Register</a></button>";			
        }
      });
}
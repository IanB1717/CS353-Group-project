
function logOut() {
    auth.signOut();
}

function login() {
    const loginForm = document.querySelector('#login-form');

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log("Signed in: " + email, password);
        console.log(cred.user);
        var _uid = auth.currentUser.uid;
        //console.log(_uid);

        window.location.href="index.html";

        return db.collection('Users').doc(cred.user.uid).set({
            lastLogin: datetime
        });

    });
}
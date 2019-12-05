function signOut() {
    auth.signOut();
}

function getCurrentDateAndTime() {
    var currentdate = new Date();
    var dateTime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return dateTime;
}

function signIn() {
    const loginForm = document.querySelector('#login-form');

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log("Signed in: " + email, password);
        //console.log(cred.user);
        return db.collection('Users').doc(cred.user.uid).set({
            lastLogin: getCurrentDateAndTime()
        }, { merge: true });
    }).then(cred => {
        return window.location.href = "index.html";
    }).catch(function (error) {
        alert(error.code, error.message);
        console.log(error);
    });
}

function signUp() {
    const registrationForm = document.querySelector('#registration');
    const name = registrationForm.name.value;
    const username = registrationForm.username.value;
    const email = registrationForm.email.value;
    const password = registrationForm.password.value;
    const repeat_password = registrationForm.repeat_password.value;

    if (password == repeat_password) {
        var userAggreement = document.getElementById("ckb1").checked;
        if (userAggreement) {

            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                //console.log("Created User: " + name, email, username);
                //console.log(cred.user);
                return db.collection('Users').doc(cred.user.uid).set({
                    name: name,
                    email: email,
                    username: username,
                    lastLogin: getCurrentDateAndTime()
                }).then(cred => {
                    return window.location.href = "index.html";
                })
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('Your password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
        } else {
            alert("You must agree with our user agreement to make an account");
        }
    } else {
        alert("Passwords do not match");
    }
}
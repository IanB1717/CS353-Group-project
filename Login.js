var loggedIn = false;

const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const signup = document.querySelector('#signup');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    })
    loggedIn = false;
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    console.log(email,password);

    var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        return db.collection('Users').doc(cred.user.uid).set({
            lastLogin: datetime
        });
        console.log(cred.user)
        
    });
});
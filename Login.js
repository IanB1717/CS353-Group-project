

const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const signup = document.querySelector('#signup');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    })
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    console.log(email,password);

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        console.log(cred.user)
    });
});
const supplierForm = document.querySelector('#add-supplier');
const supplierList = document.querySelector('#supplier-list');
const registrationForm = document.querySelector('#registration');

function renderSupplier(doc) {
    let name = document.createElement('span');
    let rep = document.createElement('span');
    let email = document.createElement('span');
    let account = document.createElement('span');

    name.textContent = doc.data().Name;
    rep.textContent = doc.data().RepName;
    email.textContent = doc.data().Email;
    account.textContent = doc.data().Account;

    $("#table tbody").append(
        "<tr>" +
        "<td>" + doc.data().Name + "</td>" +
        "<td>" + doc.data().RepName + "</td>" +
        "<td>" + doc.data().Email + "</td>" +
        "<td>" + doc.data().Account + "</td>" +
        "</tr>"
    );
}

db.collection('Suppliers').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderSupplier(doc);
    })
})

//saving data
supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Suppliers').add({
        Name: supplierForm.addName.value,
        RepName: supplierForm.addRep.value,
        Email: supplierForm.addEmail.value,
        Account: supplierForm.addAccount.value
    })
    supplierForm.addName.value = '';
    supplierForm.addRep.value = '';
    supplierForm.addEmail.value = '';
    supplierForm.addAccount.value = '';
})












function signup() {
    const registrationForm = document.querySelector('#registration');
    const name = registrationForm.name.value;
    const username = registrationForm.username.value;
    const email = registrationForm.email.value;
    const password = registrationForm.password.value;

    auth.createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('Your password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });

    db.collection('Users').add({
        name: name,
        email: email,
        username: username,
        lastLogin: getCurrentDateAndTime(),
    })

}
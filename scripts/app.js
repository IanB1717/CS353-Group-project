const supplierForm = document.querySelector('#add-supplier');
const registrationForm = document.querySelector('#registration');

function renderSupplier(doc){
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

//new realtime caller
db.collection('Suppliers').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach(change => {
        if(change.type == 'added'){
            renderSupplier(change.doc)
        }else if(change.type == 'remove'){
           //add removal code 
        }
    })
})

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



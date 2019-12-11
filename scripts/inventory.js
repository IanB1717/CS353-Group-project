const foodForm = document.querySelector('#addFood');
const foodList = document.querySelector('#listofInv');

function renderFood(doc){
    let Name = document.createElement('span');
    let Supplier = document.createElement('span');
    let Unit = document.createElement('span');
    let Id = document.createElement('span');

    Name.textContent = doc.data().Name;
    Supplier.textContent = doc.data().Supplier;
    Unit.textContent = doc.data().Unit;
    Id.textContent = doc.data().Id;

    $("#table tbody").append(
        "<tr>" +
        "<td>"+doc.data().Name+"</td>" +
        "<td>"+doc.data().Supplier+"</td>" +
        "<td>"+doc.data().Unit+"</td>" +
        "<td>"+doc.data().Id+"</td>" +
        "</tr>"
    );
}

db.collection('FoodItems').onSnapshot(snapshot => {
    let changes=snapshot.docChanges();
    var userId = auth.currentUser.uid;
    changes.forEach(change => {
        if(change.type=='added' && change.doc.data().User == userId){
            renderFood(change.doc);
        }
        else if(change.type=='remove'){

        }
    })
})

//saving data
foodForm.addEventListener('submit',(e) =>{
    var userId = auth.currentUser.uid;
    e.preventDefault();
    db.collection('FoodItems').add({
        Name: foodForm.addName.value,
        Supplier: foodForm.addSupplier.value,
        Unit: foodForm.addUnit.value,
        Id: foodForm.addId.value,
        User: userId
    })
    foodForm.addName.value = '';
    foodForm.addSupplier.value = '';
    foodForm.addUnit.value = '';
    foodForm.addId.value = '';
})
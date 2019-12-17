const foodForm = document.querySelector('#addFood');
const foodList = document.querySelector('#listofInv');

function renderFood(doc){
    let Name = document.createElement('span');
    let Supplier = document.createElement('span');
    let Unit = document.createElement('span');
    let Id = document.createElement('span');
    var del = document.createElement('div');
    
    var button = document.createElement("button");
    button.className = "delButton";
    button.setAttribute("value", doc.id);
    button.setAttribute("name", "X");
    button.setAttribute("onclick", "deleteFood(this.value)");
    button.innerHTML = "X";
    del.appendChild(button);
    
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
        "<td>"+del.innerHTML+"</td>" +
        "</tr>"
    );
}

function deleteFood(doc){
    //console.log(doc);
    db.collection('FoodItems').doc(doc).delete();
}

db.collection('FoodItems').onSnapshot(snapshot => {
    let changes=snapshot.docChanges();
    //console.log(changes);
    var userId = auth.currentUser.uid;
    changes.forEach(change => {
        if(change.type=='added' && change.doc.data().User == userId){
            renderFood(change.doc);
        }
        else if(change.type=='removed'){
            var toRemove = change.doc.data().Name;
            console.log(toRemove);
            var table = document.getElementById("table");
            for (var i = 0, row; row = table.rows[i]; i++) {
                //console.log(row.cells[0].innerHTML);
                if(toRemove == row.cells[0].innerHTML){
                    console.log(row.cells[0].innerHTML);
                    table.deleteRow(i);
                    //break;
               }
            }
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
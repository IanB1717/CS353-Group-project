var arr=[];
var num=0;

function Inventory(){
    item="";
    amount="";
}

function Inventory(item, amount) {
    this.item = item;
    this.amount = amount;
}

/*function validateForm(){
    var item=document.getElementById('ingredient').value;
    var amount=document.getElementById('quantity').value;
    var inventory=new Inventory(item, amount);
    if(item != "" && amount != "") {
        arr.push(inventory);
        num++;
    }
}

function deleteRow(){
    if(num>0) {
        document.getElementById("table").deleteRow(num);
        arr.pop();
        num--;
    }
}

function sendJSON(){
    document.getElementById("confirm").innerHTML = "";
    if(num>0) {
        var myJSON = JSON.stringify(arr);
        document.getElementById("confirm").innerHTML = myJSON;
    }
}*/

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
    changes.forEach(change => {
        if(change.type=='added'){
            renderFood(change.doc);
        }
        else if(change.type=='remove'){

        }
    })
})

//saving data
foodForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('FoodItems').add({
        Name: foodForm.addName.value,
        Supplier: foodForm.addSupplier.value,
        Unit: foodForm.addUnit.value,
        Id: foodForm.addId.value
    })
    foodForm.addName.value = '';
    foodForm.addSupplier.value = '';
    foodForm.addUnit.value = '';
    foodForm.addId.value = '';
})
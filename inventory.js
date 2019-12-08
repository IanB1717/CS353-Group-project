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

function validateForm(){
    var item=document.getElementById('ingredient').value;
    var amount=document.getElementById('quantity').value;
    var inventory=new Inventory(item, amount);
    if(item != "" && amount != "") {
        arr.push(inventory);
        $("#table tbody").append(
            "<tr>" +
            "<td>" + item + "</td>" +
            "<td>" + amount + "</td>" +
            "</tr>"
        );
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
}

const inventoryForm = document.querySelector('#add-item');
const inventoryList = document.querySelector('#inventory-list');
const registrationForm= document.querySelector('#registration');

function renderInventory(doc){
    let item = document.createElement('span');
    let amount = document.createElement('span');

    item.textContent = doc.data().Item;
    amount.textContent = doc.data().Amount;

    $("#table tbody").append(
        "<tr>" +
        "<td>"+doc.data().Item+"</td>" +
        "<td>"+doc.data().Amount+"</td>" +
        "</tr>"
    );
}

db.collection('Inventory').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        renderInventory(doc);
    })
})

//saving data
inventoryForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('Suppliers').add({
        Item: inventoryForm.addItem.value,
        Amount: inventoryForm.addAmount.value,
    })
    inventoryForm.addItem.value = '';
    inventoryForm.addAmount.value = '';
})
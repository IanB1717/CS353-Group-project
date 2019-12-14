var signed_in="test";
var arr=[];
var num=0;

function Order(){
	item="";
	amount="";
}

function Order(item, amount) {
	this.item = item;
	this.amount = amount;
}

function validateForm(){
	var item=document.getElementById('ingredient').value;
	var amount=document.getElementById('quantity').value;
	var order=new Order(item, amount);

	if(item != "" && amount != "") {
		arr.push(order);
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
	if(num>0) {
		var myJSON = JSON.stringify(arr);
		formatOrder(arr);
	}
}

function formatOrder(input){
	var userId = auth.currentUser.uid;
	var parentArray = [];
	db.collection("FoodItems").get().then((snapshot) => {
		snapshot.docs.forEach(doc =>{
			if(doc.data().User == userId){
				parentArray.push(doc.data());
			}
		})
		// console.log(parentArray);
		// console.log(input);
		var order = [];
		for(i=0; i<parentArray.length;i++){
			for(j=0; j<input.length;j++){
				// console.log(input[j].item);
				// console.log(parentArray[i]);
				if(parentArray[i].Name == input[j].item){
					var object = {
						"Name":parentArray[i].Name,
						"Supplier":parentArray[i].Supplier,
						"Unit":parentArray[i].Unit,
						"Id":parentArray[i].Id,
						"Quantity":input[j].amount
					}
					order.push(object);
				}
			}
		}
		//console.log(order);
		splitOrder(order);
	});
	
}

function splitOrder(input){
	var supplierArray =  [];
	var userId = auth.currentUser.uid;
	for(i = 0;i<input.length;i++){
		var bool = supplierArray.includes(input[i].Supplier);
		if(!bool){
			supplierArray.push(input[i].Supplier);
		}
	}
	//console.log(supplierArray);
	var orderArray = [];
	var temp = []
	db.collection("Suppliers").get().then((snapshot) => {
		snapshot.docs.forEach(doc =>{
			if(doc.data().User == userId){
				temp.push(doc.data());
			}
		})
		for(i = 0;i<supplierArray.length;i++){
			for(j=0;j<temp.length;j++){
				if(supplierArray[i] == temp[j].Name){
					supplierArray[i] = temp[j];
				}
			}
		}
		//console.log(supplierArray);
		
		for(i=0;i<supplierArray.length;i++){
			var string = "Hi "+supplierArray[i].RepName+" I'd like to place an order please for account number "+supplierArray[i].Account+"\n\n";
			var item;
			for(j=0;j<input.length;j++){
				if(supplierArray[i].Name == input[j].Supplier){
					string = string.concat(input[j].Quantity+" "+input[j].Unit+" "+input[j].Name+" "+input[j].Id+"\n");
				}
			}
			var order = {
				"reciever":supplierArray[i].Email,
				//"from":,
				"body":string
			}
			orderArray.push(order);
		}
		//console.log(orderArray);
		sendOrders(orderArray);
	});
}

function sendOrders(input){
	//console.log(input);
	for(i = 0;i<input.length;i++){
		data = input[i]
		console.log(input[i]);
		var userId = auth.currentUser.uid;
		db.collection('Orders').add({
			Order: input[i]
			//User: userId
    	});
	}
	while(num>0){
		deleteRow();
	}
	alert("Your order has been sent. Thank you for using Chef City");
}


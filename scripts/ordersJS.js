var signed_in="test";
var arr=[];
var num=0;

function Order(){
	supplier="";
	item="";
	amount="";
	measure="";
}

function Order(supplier, item, amount, measure) {
	this.supplier = supplier;
	this.item = item;
	this.amount = amount;
	this.measure = measure;
}

function validateForm(){
	var supplier=document.getElementById('supplier').value;
	var item=document.getElementById('ingredient').value;
	var amount=document.getElementById('quantity').value;
	var measure=document.getElementById('measure').value;
	var order=new Order(supplier, item, amount, measure);

	if(supplier != "" && item != "" && amount != "" && measure != "") {
		arr.push(order);
		$("#table tbody").append(
			"<tr>" +
			"<td>" + item + "</td>" +
			"<td>" + amount + "</td>" +
			"<td>" + measure + "</td>" +
			"<td>" + supplier + "</td>" +
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
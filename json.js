<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

var newJSON = new Object();
newJSON.email = "";
newJSON.subject = "";
newJSON.body = "";

var myString = JSON.stringify(newJSON);

window.onload = function() {
	document.getElementById("confirmOrder").onclick = function() {
		sendMail()
	};
}

function doWork() {
	$.post("receiver", newJSON, function(){
    });
 event.preventDefault();
}
// put these in head
<script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-firestore.js"></script>

//bottom of body
<script>
			const firebaseConfig = {
  				apiKey: "AIzaSyCyBxoZBwJHMMfDB5-XvfDETUaDHFAnXFc",
  				authDomain: "chefcity-ecbfb.firebaseapp.com",
  				databaseURL: "https://chefcity-ecbfb.firebaseio.com",
  				projectId: "chefcity-ecbfb",
  				storageBucket: "chefcity-ecbfb.appspot.com",
  				messagingSenderId: "583029024558",
				appId: "1:583029024558:web:44d2759fadb6350966bcbf",
				measurementId: "G-TTL2G91C3D"
			};

			firebase.initializeApp(firebaseConfig);
			
			const db = firebase.firestore()
			db.settings({
				timestampsInSnapshots: true
			});
		</script>
		<script src="app.js"></script>

//templates for adding and pulling to and from database inside app.js

const supplierForm = document.querySelector('#add-supplier');
const supplierList = document.querySelector('#supplier-list');

//create list entry and render it to page
function renderSupplier(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let rep = document.createElement('span');
    let email = document.createElement('span');
    let account = document.createElement('span');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().Name;
    rep.textContent = doc.data().RepName;
    email.textContent = doc.data().Email;
    account.textContent = doc.data().Account;

    li.appendChild(name);
    li.appendChild(rep);
    li.appendChild(email);
    li.appendChild(account);

    supplierList.appendChild(li);
}

db.collection('Suppliers').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
        renderSupplier(doc);
    })
})

//saving data
supplierForm.addEventListener('submit',(e) =>{
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
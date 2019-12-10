const supplierForm = document.querySelector('#add-supplier');
const supplierList = document.querySelector('#supplier-list');
const registrationForm= document.querySelector('#registration');

//create list entry and render it to page
// function renderSupplier(doc){
//     let li = document.createElement('li');
//     let name = document.createElement('span');
//     let rep = document.createElement('span');
//     let email = document.createElement('span');
//     let account = document.createElement('span');

//     li.setAttribute('data-id',doc.id);
//     name.textContent = doc.data().Name;
//     rep.textContent = doc.data().RepName;
//     email.textContent = doc.data().Email;
//     account.textContent = doc.data().Account;

//     li.appendChild(name);
//     li.appendChild(rep);
//     li.appendChild(email);
//     li.appendChild(account);

//     supplierList.appendChild(li);
// }

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
        "<td>"+doc.data().Name+"</td>" +
        "<td>"+doc.data().RepName+"</td>" +
        "<td>"+doc.data().Email+"</td>" +
        "<td>"+doc.data().Account+"</td>" +
        "</tr>"
    );
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

function signup(){
//saving registration details
    const registrationForm= document.querySelector('#registration');
    console.log("Registering...");
    db.collection('Users').add({
        Name: registrationForm.name.value,
        Email: registrationForm.email.value,
        Username: registrationForm.username.value,
        Password: registrationForm.pass.value
    })
   console.log("Complete.");

}
// onclick="location.href='./recipes.html'"

function addRecipe(){
//saving registration details
    const recipeForm= document.querySelector('#add-recipe');
    console.log("Storing...");
    db.collection('Recipes').add({
        Name: recipeForm.name.value,
        Meal: document.querySelector('input[name="Meal"]:checked').value,
        Method: recipeForm.method.value,
        Time: recipeForm.time.value,
        Tags: recipeForm.tags.value,
        Complexity: document.querySelector('input[name="Complexity"]:checked').value,
    })
   console.log("Complete.");

   //window.location.href='./recipes.html';
}


// create element & render cafe
function renderRecipes(doc){
    console.log('Rendering data...');
    let li = document.createElement('li');
    let name = document.createElement('span');
    let meal = document.createElement('span');
    let method = document.createElement('span');
    let time = document.createElement('span');
    let tags = document.createElement('span');
    let complex = document.createElement('span');


    li.setAttribute('id', doc.id);
    name.textContent = doc.data().Name;
    meal.textContent = doc.data().Meal;
    method.textContent = 'Method: ' + doc.data().Method;
    time.textContent = 'Time: '+ doc.data().Time + 'mins';
    tags.textContent = 'Tags: '+  doc.data().Tags;
    complex.textContent = 'Complexity: ' + doc.data().Complexity;

    li.appendChild(name);
    li.appendChild(meal);
    li.appendChild(method);
    li.appendChild(time);
    li.appendChild(tags);
    li.appendChild(complex);

    list.appendChild(li);
}

function loadRecipes(){
    const list = document.getElementById('#recipeList');
    // getting data
    console.log('Retrieving data...');
    db.collection('Recipes').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderRecipes(doc);
        });
    });
    console.log('Complete.');
}

function specificRecipes(a, b, c){
    removeRecipes();
    const list = document.getElementById('#recipeList');  

    // getting data
    console.log('Filtering data...');
    db.collection('Recipes').where(a, b, c).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderRecipes(doc);
        });
     });
    console.log('Complete.');
}

function removeRecipes(doc){

    console.log('Removing data...'); 
    db.collection('Recipes').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let x = document.getElementById(doc.id);
            if(x != null){
                x.parentNode.removeChild(x);
            }
        });
    });
;
    console.log('Removed'); 
}

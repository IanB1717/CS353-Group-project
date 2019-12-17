const supplierForm = document.querySelector('#add-supplier');
const registrationForm = document.querySelector('#registration');

function renderSupplier(doc){
    let name = document.createElement('span');
    let rep = document.createElement('span');
    let email = document.createElement('span');
    let account = document.createElement('span');
    var del = document.createElement('div');

    var button = document.createElement("button");
    button.className = "delButton";
    button.setAttribute("value", doc.id);
    button.setAttribute("name", "X");
    button.setAttribute("onclick", "deleteSupplier(this.value)");
    button.innerHTML = "X";
    del.appendChild(button);

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
        "<td>"+del.innerHTML+"</td>" +
        "</tr>"
    );
}

function deleteSupplier(doc){
    //console.log(doc);
    db.collection('Suppliers').doc(doc).delete();
}

//new realtime caller
db.collection('Suppliers').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    var userId = auth.currentUser.uid;
    console.log(changes);
    changes.forEach(change => {
        if(change.type == 'added' && change.doc.data().User == userId){
            renderSupplier(change.doc)
        }else if(change.type == 'removed'){
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

supplierForm.addEventListener('submit', (e) => {
    var userId = auth.currentUser.uid;
    console.log(userId);
    e.preventDefault();
    db.collection('Suppliers').add({
        Name: supplierForm.addName.value,
        RepName: supplierForm.addRep.value,
        Email: supplierForm.addEmail.value,
        Account: supplierForm.addAccount.value,
        User: userId
    })
    supplierForm.addName.value = '';
    supplierForm.addRep.value = '';
    supplierForm.addEmail.value = '';
    supplierForm.addAccount.value = '';
})

function addRecipe(){
    //saving registration details
        const recipeForm= document.querySelector('#add-recipe');
        console.log("Storing...");
        db.collection('Recipes').add({
            Name: recipeForm.name.value,
            Meal: document.querySelector('input[name="Meal"]:checked').value,
            Method: recipeForm.method.value,
            Time: recipeForm.time.value,
            Cuisine: document.querySelector('input[name="Cuisine"]:checked').value,
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
        let cuisine = document.createElement('span');
        let complex = document.createElement('span');
    
    
        li.setAttribute('id', doc.id);
        name.textContent = doc.data().Name;
        meal.textContent = doc.data().Meal;
        method.textContent = 'Method: ' + doc.data().Method;
        time.textContent = 'Time: '+ doc.data().Time + 'mins';
        cuisine.textContent = 'Cusine: '+  doc.data().Cuisine;
        complex.textContent = 'Complexity: ' + doc.data().Complexity;
    
        li.appendChild(name);
        li.appendChild(meal);
        li.appendChild(method);
        li.appendChild(time);
        li.appendChild(cuisine);
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



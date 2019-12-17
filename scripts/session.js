function printUser() {
    console.log(auth.currentUser.uid);
}

function checkLoginForTitleBar() {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("login-tab").innerHTML = "<button id='myBtn' class='btn btn-outline-danger' onclick = 'signOut()'>Sign Out</button>";
            document.getElementById("profile-tab").innerHTML = " <button  id='myBtn'class='btn btn-outline-danger' onclick='window.location.href = \"profile.html\"'><i class='glyphicon glyphicon-user'></i> Profile</button>";
        } else {
            document.getElementById("profile-tab").innerHTML = "";
            document.getElementById("login-tab").innerHTML = "<button id='myBtn' class='btn btn-outline-dark'><a href='sign_in.html'>Login/Register</a></button>";
        }
    });
}

function checkLoginForHomeButtons() {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("main").innerHTML = `
                <div id="main">
                <div id="inventory" onclick="window.location.href = 'inventory.html';">
                <img src="images/inventory.jpg" class="homeButtons">
                <div id="textover">Products</div>
                </div>
                <div id="recipes" onclick="window.location.href = 'recipes.html'">
                <img src="images/recipes.jpg" class="homeButtons">
                <div id="textover">Recipes</div>
                </div>
                <div id="orders" onclick="window.location.href = 'orders.html'">
                <img src="images/orders.jpg" class="homeButtons">
                <div id="textover">Orders</div>
                </div>
                <div id="suppliers" onclick="window.location.href = 'suppliers.html'">
                <img src="images/suppliers.jpg" class="homeButtons">
                <div id="textover">Suppliers</div>
                </div>
                </div>`;
        } else {
            document.getElementById("main").innerHTML = `
            <div id="main">
            <div id="inventory" onclick="window.location.href = 'sign_in.html';">
            <img src="images/inventory.jpg" class="homeButtons">
            <div id="textover">Products</div> 
            <div id="textover1"> Click To Sign In</div>
            </div>
            <div id="recipes" onclick="window.location.href = 'sign_in.html'">
            <img src="images/recipes.jpg" class="homeButtons">
            <div id="textover">Recipes</div>
            <div id="textover1"> Click To Sign In</div>
            </div>
            <div id="orders" onclick="window.location.href = 'sign_in.html'">
            <img src="images/orders.jpg" class="homeButtons">
            <div id="textover">Orders</div>
            <div id="textover1"> Click To Sign In</div>
            </div>
            <div id="suppliers" onclick="window.location.href = 'sign_in.html'">
            <img src="images/suppliers.jpg" class="homeButtons">
            <div id="textover">Suppliers</div>
            <div id="textover1"> Click To Sign In</div>
            </div>
            </div>`;
        }
    });
}

function checkLogin() {
    auth.onAuthStateChanged(function (user) {
        if (user) {
           
        } else {
            window.location.href = 'sign_in.html';
        }
    });
}
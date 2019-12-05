
const data = document.querySelector('#data');

function loadData() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            db.collection("Users").doc(auth.currentUser.uid)
            .get()
            .then(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //var num  = Math.floor((Math.random() * 100) + 1);
                    data.innerHTML +=
                        `          
                                   <img src='https://picsum.photos/100'
                                   style ='
                                   border-color:#c8f3f1;
                                   border-style: solid;
                                   border-width: 5px;
                                   border-radius: 50%;'>
    

                                   email: ` + doc.data().email + `
                                   username: ` + doc.data().username + `
                                   name: ` + doc.data().name + `
                                   LastLogin: ` + doc.data().lastLogin;
                    //console.log(doc.id, " => ", doc.data());
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        } else {
          // No user is signed in.
        }
      });
      
      
}
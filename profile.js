
const data = document.querySelector('#data');

function loadData() {
    db.collection("Users").where("email", "==", "test@test.test")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                data.innerHTML +=
                    `  
                               Email: ` + doc.data().email + `
                               Username: ` + doc.data().username + `
                               name: ` + doc.data().name + `
                               LastLogin: ` + doc.data().lastLogin;
                //console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
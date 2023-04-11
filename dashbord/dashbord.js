window.onload = function() {
    var loader = document.getElementById("loade");
    loader.style.display = "block";
    setTimeout(function() {
      loader.style.display = "none";
    }, 3000); // Remplacez 2000 par la durée de chargement de votre page en millisecondes
  }
  
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, addDoc, collection, updateDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn6PYE_7HYD1pATm1S6DBDjsYMigiBQ00",
    authDomain: "pointage-1c893.firebaseapp.com",
    projectId: "pointage-1c893",
    storageBucket: "pointage-1c893.appspot.com",
    messagingSenderId: "551841692809",
    appId: "1:551841692809:web:026a70f6b5880338785a58"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let recup = JSON.parse(localStorage.getItem("connected")) ;
console.log(recup);

// var selecteRow = null;
// nettoyer les champs

function clearFields() {
    document.getElementById("prenomProf").value = "";
    document.getElementById("nomProf").value = "";
    document.getElementById("naissanceProf").value = "";
    document.getElementById("lieuxProf").value = "";
    document.getElementById("numProf").value = "";
    document.getElementById("mailProf").value = "";
    document.getElementById("addresseProf").value = "";
    document.getElementById("matiereProf").value = "";
}

// Ajout de colonne
function myAdd() {
    document.getElementById("listProf-form").addEventListener("click", (e) => {
        e.preventDefault();

        // recupération des valeurs
        const prenomProf = document.getElementById("prenomProf").value;
        const nomProf = document.getElementById("nomProf").value;
        const naissanceProf = document.getElementById("naissanceProf").value;
        const lieuxProf = document.getElementById("lieuxProf").value;
        const numProf = Number(document.getElementById("numProf").value);
        const mailProf = document.getElementById("mailProf").value;
        const addresseProf = document.getElementById("addresseProf").value;
        const matiereProf = document.getElementById("matiereProf").value;
        const statut = 'professeur';

        addDoc(collection(db, "users"), {

            prenom: prenomProf,
            nom: nomProf,
            naissance: naissanceProf,
            lieux: lieuxProf,
            numero: numProf,
            mail: mailProf,
            addresse: addresseProf,
            matiere: matiereProf,
            statut: statut,
        });

        alert('utilisateur ajouter');

        // validation

        if (
            prenomProf == "" ||
            nomProf == "" ||
            naissanceProf == "" ||
            lieuxProf == "" ||
            numProf == "" ||
            mailProf == "" ||
            addresseProf == "" ||
            matiereProf == "") {
            alert("Veuillez remplir tous les champs");
        } else {
            clearFields();

        }

    })
}

let table = [];
let taker;
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    taker = doc.data();
    const data = { ...taker, id: doc.id }
    taker.id = doc.id;
    table.push(data);
});
myAdd();

// filtrer le statut proffesseur
let tableBis = table.filter((element, index) => element.statut === "professeur")

// afficher le tableau
const tbody = document.querySelector("tbody");
tableBis.forEach((membres) => {
    tbody.innerHTML += `
     <tr>
          <td>${membres.prenom}</td>
          <td>${membres.nom}</td>
          <td>${membres.numero}</td>
          <td>${membres.mail}</td>
          <td>${membres.addresse}</td>
          <td>${membres.matiere}</td>
          <td>
          <buton type="button" id="${membres.id}" class="btn btn-outline-info btn-sm m-1 fa-solid fa-eye affiche" data-bs-toggle="modal" data-bs-target="#exampleModal"> </buton>
          <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalBody1">
                    </div>
                </div>
            </div>
            </div>
          <button id="${membres.id}" class="btn btn-outline-info btn-sm m-1 fa-solid fa-pen update" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
          <button id="${membres.id}" class="btn btn-outline-danger btn-sm m-1 fa-solid fa-trash delete" ></button>
          </td>
     </tr>`
})

//  boutton supprimer
const btnDelete = document.querySelectorAll(".delete")
btnDelete.forEach(btn => {
    btn.addEventListener('click', () => {
        deleteDoc(doc(db, "users", btn.id)).then(() => {
            alert('utilisateur supprimer ')
            location.reload();
        })
            .catch(() => {
                console.log('erreur');
            })
    })
})

// boutton modifer
const btnUpdate = document.querySelectorAll('.update');
const modif = document.querySelector('.btnModif')
// console.log(modif);
btnUpdate.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        document.getElementById('listProf-form').style.display = "none";
        document.getElementById('modiffff').style.display = "block";

        const findData = table.find((element) => element.id == btn.id);

        document.getElementById("prenomProf").value = findData.prenom;
        document.getElementById("nomProf").value = findData.nom;
        document.getElementById("naissanceProf").value = findData.naissance;
        document.getElementById("lieuxProf").value = findData.lieux;
        document.getElementById("numProf").value = findData.numero;
        document.getElementById("mailProf").value = findData.mail;
        document.getElementById("addresseProf").value = findData.addresse;
        document.getElementById("matiereProf").value = findData.matiere;

        modif.addEventListener("click", (e) => {
            e.preventDefault();

            const prenomProf = document.getElementById("prenomProf").value;
            const nomProf = document.getElementById("nomProf").value;
            const naissanceProf = document.getElementById("naissanceProf").value;
            const lieuxProf = document.getElementById("lieuxProf").value;
            const numProf = Number(document.getElementById("numProf").value);
            const mailProf = document.getElementById("mailProf").value;
            const addresseProf = document.getElementById("addresseProf").value;
            const matiereProf = document.getElementById("matiereProf").value;

            const washingtonRef = doc(db, "users", findData.id);

            updateDoc(washingtonRef, {

                prenom: prenomProf,
                nom: nomProf,
                naissance: naissanceProf,
                lieux: lieuxProf,
                numero: numProf,
                mail: mailProf,
                addresse: addresseProf,
                matiere: matiereProf,

            }).then(() => {
                alert('utilisateur modifier')
                location.reload();
            })
                .catch(() => {
                    alert("erreur")
                })
        })

    })

})

// boutton afficher
const btnAffiche = document.querySelectorAll('.affiche');
const modalBody = document.getElementById('modalBody1');

btnAffiche.forEach((btn) => {

    btn.addEventListener('click', () => {

        document.getElementById('listProf-form').style.display = "none";
        document.getElementById('modiffff').style.display = "none";
        document.getElementById('titleModal').style.display = "none";

        const findData = table.find((element) => element.id == btn.id)

        modalBody.innerHTML = `<tr>
            <td ><i class="fa-solid fa-user m-3 fs-3"> </i>${findData.prenom}</td><br/>
            <td ><i class="fa-solid fa-user m-3 fs-3"></i>${findData.nom}</td><br/>
            <td ><i class="fa-solid fa-calendar-day m-3 fs-3"></i>${findData.naissance}</td><br/>
            <td ><i class="fa-solid fa-house-user m-3 fs-3"></i>${findData.lieux}</td><br/>
            <td ><i class="fa-solid fa-phone m-3 fs-3"></i>${findData.numero}</td><br/>
            <td ><i class="fa-solid fa-envelope m-3 fs-3"></i>${findData.mail}</td><br/>
            <td ><i class="fa-solid fa-house m-3 fs-3"></i>${findData.addresse}</td><br/>
            <td ><i class="fa-solid fa-table m-3 fs-3"></i>${findData.matiere}</td><br/>
            <td ><i class="fa-solid fa-signal m-3 fs-3"></i>${findData.statut}</td>
        </tr> `
        console.log(findData);
    })
})

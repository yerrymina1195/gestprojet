// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs,doc,getDoc,query,where, updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";


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


const usereleve = collection(db,'users');
let archiv = document.getElementById('archiv')
let Retour = document.getElementById('Retour')
let bajel= document.getElementById('bajel')
const depart="eleve"
ajout.addEventListener('click',async (e) => {
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    let Telephone = Number(document.getElementById('Telephone').value);
    let date = document.getElementById('date').value;
    let adresse = document.getElementById('adresse').value;
    let email = document.getElementById('mail').value;

   await addDoc(collection(db, "users"), {
        prenom: prenom,
        nom: nom,
        numero: Telephone,
        date: date,
        adresse: adresse,
        email: email,
        statut:depart,
        isarchived: false
    }); 
    alert('eleve ajouter');
afficher()
    
    });
    document.querySelector('#form').addEventListener('submit', (e) => {
        e.preventDefault();
    })


afficher()

    async function afficher(){
      // archiv.innerHTML="Voir archivage"

      bajel.classList.remove("d-none")

      archiv.addEventListener("click",test)
      archiv.classList.remove("d-none")
      Retour.classList.add("d-none")
      const tab = [];
      let con;
      const q = query(usereleve, where("statut", "==", "eleve"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        con= doc.data();
        const data ={...con, id: doc.id}
        con.id = doc.id;
          tab.push(data);
      });
      let tabnonarchived= tab.filter((element,index)=> element.isarchived=== false)
      console.log(tabnonarchived);
      
      let table1 = document.getElementById('tbody');
      table1.innerHTML =""
      tabnonarchived.map(element => (
          table1.innerHTML += `<tr>
                      <td class="align-middle" ><img src="./image/avatar.png" id="Profil" class="img-fluit rounded-circle" width="45px" alt=""></td>
                      <td class="align-middle">${element.prenom}</td>
                      <td class="align-middle">${element.nom}</td>
                      <td class="align-middle">${element.email}</td>
                      <td class="align-middle">${element.numero}</td>
                      <td class="align-middle">${element.date}</td>
                      <td class="align-middle">${element.adresse}</td>
                      <td id="${element.id}" class="align-middle">
                        <button type="button"  class="btn modifier btn-outline-secondary"
                        data-bs-toggle="modal" data-bs-target="#exampleModal2"
                        data-bs-whatever="@mdo">
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button  class="btn supprime btn-outline-danger">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                        <button  class="btn archived btn-outline-info">
                        <i class="fa-solid fa-box-archive"></i>
                      </button>
                        <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" 
                        data-bs-target="#exampleModalToggle1" id="modalbtn">
                          <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </td>
              </tr>`
      ));
      let btnsupprime= document.querySelectorAll(".supprime");
      btnsupprime.forEach(element => {
        element.addEventListener('click', async (e)=>{
          // ajout.onclick= function () {
          //   modal.classList.add("active");
          // };
        let cible = e.target.parentNode.parentNode.id;
        let colectDoc = await doc(usereleve,cible)
        console.log(colectDoc);
        const ly = await getDoc(colectDoc);
         deleteDoc(colectDoc)

          console.log(ly.data());
          afficher()
        }) 
    });
    let openmodalbulletin = document.querySelectorAll("#modalbtn");
    openmodalbulletin.forEach(element => {
      element.addEventListener('click', modifier)
    });
    
    let btnmodif= document.querySelectorAll(".modifier");
    btnmodif.forEach(element => {
      element.addEventListener('click', async (e)=>{
        let prenomam = document.getElementById('prenomam');
        let nomam = document.getElementById('nomam');
        let Telephoneam = document.getElementById('Telephoneam');
        let dateam = document.getElementById('dateam');
        let adresseam = document.getElementById('adresseam');
        let emailam = document.getElementById('mailam');
      let cible = e.target.parentNode.parentNode.id;
      let colectDoc = await doc(usereleve,cible)
      // console.log(colectDoc);
      const ly = await getDoc(colectDoc);
      console.log(ly.data().prenom);
      let container=ly.data()
      console.log(container.prenom);
      prenomam.value=container.prenom
      nomam.value=container.nom
      Telephoneam.value=container.numero
      dateam.value=container.date
      adresseam.value=container.adresse
      emailam.value=container.email
      modif.addEventListener('click', async(e) => {
      let prenomod = document.getElementById('prenomam').value;
      let nomod = document.getElementById('nomam').value;
      let Telephoneod = document.getElementById('Telephoneam').value;
      let dateod = document.getElementById('dateam').value;
      let adresseod = document.getElementById('adresseam').value;
      let emailod = document.getElementById('mailam').value;

        await updateDoc(colectDoc, {
          prenom: prenomod,
          nom: nomod,
          numero: Telephoneod,
          date: dateod,
          adresse: adresseod,
          email: emailod,
        })
        afficher()
      })


      


      form.addEventListener('submit',(e)=>{
        e.preventDefault();
      })
    
  }) 
  });


    
  let btnarchivage= document.querySelectorAll(".archived");
  btnarchivage.forEach(element => {
    element.addEventListener('click', async (e)=>{
    
    let cible = e.target.parentNode.parentNode.id;
    let colectDoc = await doc(usereleve,cible)
    // console.log(colectDoc);
    const ly = await getDoc(colectDoc);
    console.log(ly.data());
      await updateDoc(colectDoc, {
        isarchived: true
        
      })
      afficher()
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
    })
}) 
});


    }
Retour.addEventListener("click",afficher)
async function test(){
  const tab = [];
  let con;
  const q = query(usereleve, where("statut", "==", "eleve"));
      const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    con= doc.data();
    const data ={...con, id: doc.id}
    con.id = doc.id;
      tab.push(data);
  });
  let tabnonarchived= tab.filter((element,index)=> element.isarchived=== true)
  console.log(tabnonarchived);
  
  let table1 = document.getElementById('tbody');
  table1.innerHTML =""
  tabnonarchived.map(element => (
      table1.innerHTML += `<tr>
                  <td><img src="./image/avatar.png" id="Profil" class="img-fluit rounded-circle" width="45px" alt=""></td>
                  <td>${element.prenom}</td>
                  <td>${element.nom}</td>
                  <td>${element.email}</td>
                  <td>${element.numero}</td>
                  <td>${element.date}</td>
                  <td>${element.adresse}</td>
                  <td id="${element.id}">
                 
                   
                    <button  class="btn unarchived btn-outline-info">
                    <i class="fa-solid fa-box-archive"></i>
                  </button>
                  
                  </td>
          </tr>`
  ));
  bajel.classList.add("d-none")
  Retour.classList.remove("d-none")
  archiv.classList.add("d-none")
  let btnunarchivage= document.querySelectorAll(".unarchived");
  btnunarchivage.forEach(element => {
    element.addEventListener('click', async (e)=>{
    
    let cible = e.target.parentNode.parentNode.id;
    let colectDoc = await doc(usereleve,cible)
    // console.log(colectDoc);
    const ly = await getDoc(colectDoc);
    console.log(ly.data());
      await updateDoc(colectDoc, {
        isarchived: false
        
      })
      test()
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
    })
}) 
});
}
 



async function modifier() {
  let cible = this.parentNode.id;
  console.log(cible);
  let colectDoc = await doc(usereleve,cible)
  console.log(colectDoc);
  const ly = await getDoc(colectDoc);
  console.log(ly.data());
  let lydoc = ly.data();
    let ajouter = document.getElementById('ajouter')
    ajouter.addEventListener("click", (e) => {
      let matmatiere = document.getElementById("matmatiere").value;
      let matdevoir = Number(document.getElementById("matdevoir").value);
      let matcompo = Number(document.getElementById("matcompo").value);
      let matcoef = Number(document.getElementById("matcoef").value); 
      let matrang = Number(document.getElementById("matrang").value);
      let matappreciation = document.getElementById("matappreciation").value;
      
      let angmatiere = document.getElementById("angmatiere").value;
      let angdevoir = Number(document.getElementById("angdevoir").value);
      let angcompo = Number(document.getElementById("angcompo").value);
      let angcoef = Number(document.getElementById("angcoef").value); 
      let angrang = Number(document.getElementById("angrang").value);
      let angappreciation = document.getElementById("angappreciation").value;
      
      let hgmatiere = document.getElementById("hgmatiere").value;
      let hgdevoir = Number(document.getElementById("hgdevoir").value);
      let hgcompo = Number(document.getElementById("hgcompo").value);
      let hgcoef = Number(document.getElementById("hgcoef").value); 
      let hgrang = Number(document.getElementById("hgrang").value);
      let hgappreciation = document.getElementById("hgappreciation").value;
      
      let svtmatiere = document.getElementById("svtmatiere").value;
      let svtdevoir = Number(document.getElementById("svtdevoir").value);
      let svtcompo = Number(document.getElementById("svtcompo").value);
      let svtcoef = Number(document.getElementById("svtcoef").value); 
      let svtrang = Number(document.getElementById("svtrang").value);
      let svtappreciation = document.getElementById("svtappreciation").value;
      
      let pcmatiere = document.getElementById("pcmatiere").value;
      let pcdevoir = Number(document.getElementById("pcdevoir").value);
      let pccompo = Number(document.getElementById("pccompo").value);
      let pccoef = Number(document.getElementById("pccoef").value); 
      let pcrang = Number(document.getElementById("pcrang").value);
      let pcappreciation = document.getElementById("pcappreciation").value;
      
      let epsmatiere = document.getElementById("epsmatiere").value;
      let epsdevoir = Number(document.getElementById("epsdevoir").value);
      let epscompo = Number(document.getElementById("epscompo").value);
      let epscoef = Number(document.getElementById("epscoef").value); 
      let epsrang = Number(document.getElementById("epsrang").value);
      let epsappreciation = document.getElementById("epsappreciation").value;
      
      
      let frmatiere = document.getElementById("frmatiere").value;
      let frdevoir = Number(document.getElementById("frdevoir").value);
      let frcompo = Number(document.getElementById("frcompo").value);
      let frcoef = Number(document.getElementById("frcoef").value); 
      let frrang = Number(document.getElementById("frrang").value);
      let frappreciation = document.getElementById("frappreciation").value;
      
      // Vérifier si les champs sont vides
      if (matmatiere == "" || matdevoir == ""|| matcompo == ""||matcoef == ""||matrang == ""|| matappreciation == ""  ) {
      alert("Veuillez remplir tous les champs !"); 
      }
      else if (angmatiere == "" || angdevoir == ""|| angcompo == ""||angcoef == ""||angrang == ""|| angappreciation == ""  ) {
      alert("Veuillez remplir tous les champs !");
      }
      else if (hgmatiere == "" || hgdevoir == ""|| hgcompo == ""||hgcoef == ""||hgrang== ""|| hgappreciation == ""  ) {
      alert("Veuillez remplir tous les champs !");
      }
      else if (svtmatiere == "" || svtdevoir == ""|| svtcompo == ""||svtcoef == ""||svtrang == ""|| svtappreciation == ""  ) {
      alert("Veuillez remplir tous les champs !");
      }
      else if (pcmatiere == "" || pcdevoir == ""|| pccompo == ""||pccoef == ""||pcrang == ""|| pcappreciation == ""  ) {
      alert("Veuillez remplir tous les champs !");
      }
      else if (epsmatiere == "" || epsdevoir == ""|| epscompo == ""||epscoef == ""||epsrang == ""|| epsappreciation == ""  ) {
      alert("Veuillez remplir tous les champs !");
      }else if (frmatiere == "" || frdevoir == ""|| frcompo == ""||frcoef == ""||frrang == ""|| frappreciation == ""  ){
      alert("Veuillez remplir tous les champs !");
      } else {
        
      // Calculer la moyenne des deux nombres saisis
      let matmoyenne = (parseFloat(matdevoir) + parseFloat(matcompo)) / 2;
      matmoyenne = matmoyenne.toFixed(2);
      let angmoyenne = (parseFloat(angdevoir) + parseFloat(angcompo)) / 2;
      angmoyenne = angmoyenne.toFixed(2);
      let hgmoyenne = (parseFloat(hgdevoir) + parseFloat(hgcompo)) / 2;
      hgmoyenne = hgmoyenne.toFixed(2);
      let svtmoyenne = (parseFloat(svtdevoir) + parseFloat(svtcompo)) / 2;
      svtmoyenne = svtmoyenne.toFixed(2);
      let pcmoyenne = (parseFloat(pcdevoir) + parseFloat(pccompo)) / 2;
      pcmoyenne = pcmoyenne.toFixed(2);
      let epsmoyenne = (parseFloat(epsdevoir) + parseFloat(epscompo)) / 2;
      epsmoyenne = epsmoyenne.toFixed(2);
      let frmoyenne = (parseFloat(frdevoir) + parseFloat(frcompo)) / 2;
      frmoyenne = frmoyenne.toFixed(2);
      
      
      
      // Calculer la moyenneX
      let matmoyX = (parseFloat(matmoyenne) * parseFloat(matcoef));
      matmoyX = matmoyX.toFixed(2);
      let angmoyX = (parseFloat(angmoyenne) * parseFloat(angcoef));
      angmoyX = angmoyX.toFixed(2);
      let hgmoyX = (parseFloat(hgmoyenne) * parseFloat(hgcoef));
      hgmoyX = hgmoyX.toFixed(2);
      let svtmoyX = (parseFloat(svtmoyenne) * parseFloat(svtcoef));
      svtmoyX = svtmoyX.toFixed(2);
      let pcmoyX = (parseFloat(pcmoyenne) * parseFloat(pccoef));
      pcmoyX = pcmoyX.toFixed(2);
      let epsmoyX = (parseFloat(epsmoyenne) * parseFloat(epscoef));
      epsmoyX = epsmoyX.toFixed(2);
      let frmoyX = (parseFloat(frmoyenne) * parseFloat(frcoef));
      frmoyX = frmoyX.toFixed(2);
      let tcoef= matcoef + frcoef + epscoef + svtcoef + pccoef + hgcoef + angcoef ;
      let moy= Number(matmoyX) + Number(angmoyX) + Number(hgmoyX) + Number(svtmoyX) + Number(pcmoyX) + Number(epsmoyX) + Number(frmoyX);
      let tmoy1= moy / tcoef;
      let tmoy= tmoy1.toFixed(2)

      addDoc(collection(db, "bulletin"), {
      prenom:lydoc.prenom,
      nom:lydoc.nom,
      date:lydoc.date,
      maths: {
      matiere: matmatiere,
      devoir: matdevoir,
      compo: matcompo,
      moyenne: matmoyenne,
      coef: matcoef,
      moyX: Number(matmoyX),
      rang: matrang,
      appreciation: matappreciation,
      },
      anglais: {
      matiere: angmatiere,
      devoir: angdevoir,
      compo: angcompo,
      moyenne: angmoyenne,
      coef: angcoef,
      moyX: Number(angmoyX),
      rang: angrang,
      appreciation: angappreciation,
      },
      hg: {
      matiere: hgmatiere,
      devoir: hgdevoir,
      compo: hgcompo,
      moyenne: hgmoyenne,
      coef: hgcoef,
      moyX: Number(hgmoyX),
      rang: hgrang,
      appreciation: hgappreciation,
      },
      svt: {
      matiere: svtmatiere,
      devoir: svtdevoir,
      compo: svtcompo,
      moyenne: svtmoyenne,
      coef: svtcoef,
      moyX: Number(svtmoyX),
      rang: svtrang,
      appreciation: svtappreciation,
      },
      pc: {
      matiere: pcmatiere,
      devoir: pcdevoir,
      compo: pccompo,
      moyenne: pcmoyenne,
      coef: pccoef,
      moyX: Number(pcmoyX),
      rang: pcrang,
      appreciation: pcappreciation,
      },
      eps: {
      matiere: epsmatiere,
      devoir: epsdevoir,
      compo: epscompo,
      moyenne: epsmoyenne,
      coef: epscoef,
      moyX: Number(epsmoyX),
      rang: epsrang,
      appreciation: epsappreciation,
      },
      francais: {
      matiere: frmatiere,
      devoir: frdevoir,
      compo: frcompo,
      moyenne: frmoyenne,
      coef: frcoef,
      moyX: Number(frmoyX),
      rang: frrang,
      appreciation: frappreciation,
      },
      total:{
        moy:Number(tmoy),
        coef:tcoef,
        moyX:moy
      }
      });
      alert("Bulletin ajouté!");
      vider();
      
      // Vérifier si toutes les matières ont été ajoutées
      fermerModal();
      afficher()
      }     
      });
  } 


document.querySelector('#matTform').addEventListener('ajouter', (e) => {
  e.preventDefault();
  });





  //MAMA FIN


      // Pagination
const table= document.getElementById("tbody");
const rows = table.rows;
const rowsPerPage = 6;

let currentPage = 1;
let numberOfPages = Math.ceil(rows.length / rowsPerPage);

function nextPage() {
  currentPage += 1;
  loadPage(currentPage);
}

function previousPage() {
  currentPage -= 1;
  loadPage(currentPage);
}

function loadPage(page) {
  let startIndex = (page - 1) * rowsPerPage;
  let endIndex = startIndex + rowsPerPage;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    if (i >= startIndex && i < endIndex) {
      row.style.display = "";
    } 
    else {
      row.style.display = "none";
    }
  }

  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (currentPage > 1) {
    let previousButton = document.createElement("button");
    previousButton.innerHTML = "Previous";
    previousButton.addEventListener("click", previousPage);
    pagination.appendChild(previousButton);
  }

  for (let i = 1; i <= numberOfPages; i++) {
    let pageButton = document.createElement("button");
    pageButton.innerHTML = i;
    pageButton.addEventListener("click", function() {
      loadPage(i);
    });
    pagination.appendChild(pageButton);
  }

  if (currentPage < numberOfPages) {
    let nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.addEventListener("click", nextPage);
    pagination.appendChild(nextButton);
  }
}
  loadPage(1);

  //filter
  function filterTable(){
    // Récupérer l'input et la table
    var input = document.getElementById("myInput");
    var table = document.getElementById("myTable");
  
    // Récupérer les lignes de la table
    var rows = table.getElementsByTagName("tr");
  
    // Parcourir toutes les lignes de la table, en commençant par la deuxième ligne
    for (var i = 1; i < rows.length; i++) {
      var shouldHideRow = true;
  
      // Parcourir toutes les colonnes de la ligne
      var cells = rows[i].getElementsByTagName("td");
      for (var j = 0; j < cells.length; j++) {
        // Vérifier si la valeur de la cellule correspond à la saisie de l'utilisateur
        if (cells[j].innerHTML.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
          shouldHideRow = false;
          break;
        }
      }
  
      // Cacher ou afficher la ligne en fonction du résultat de la recherche
      if (shouldHideRow) {
        rows[i].style.display = "none";
      } else {
        rows[i].style.display = "";
      }
    }
  }

// Mama

        function fermerModal() {
        var modal = document.getElementById("exampleModal");
        var modalBootstrap = bootstrap.Modal.getInstance(modal);
        modalBootstrap.hide();
      }


//Vider les champs
function vider() {
document.getElementById("matmatiere").value = "";
document.getElementById("matdevoir").value = "";
document.getElementById("matcompo").value = "";
document.getElementById("matcoef").value = "";
document.getElementById("matrang").value = "";
document.getElementById("matappreciation").value = "";   

document.getElementById("angmatiere").value = "";
document.getElementById("angdevoir").value = "";
document.getElementById("angcompo").value = "";
document.getElementById("angcoef").value = "";
document.getElementById("angrang").value = "";
document.getElementById("angappreciation").value = "";

document.getElementById("hgmatiere").value = "";
document.getElementById("hgdevoir").value = "";
document.getElementById("hgcompo").value = "";
document.getElementById("hgcoef").value = "";
document.getElementById("hgrang").value = "";
document.getElementById("hgappreciation").value = "";

document.getElementById("svtmatiere").value = "";
document.getElementById("svtdevoir").value = "";
document.getElementById("svtcompo").value = "";
document.getElementById("svtcoef").value = "";
document.getElementById("svtrang").value = "";
document.getElementById("svtappreciation").value = "";

document.getElementById("pcmatiere").value = "";
document.getElementById("pcdevoir").value = "";
document.getElementById("pccompo").value = "";
document.getElementById("pccoef").value = "";
document.getElementById("pcrang").value = "";
document.getElementById("pcappreciation").value = "";

document.getElementById("epsmatiere").value = "";
document.getElementById("epsdevoir").value = "";
document.getElementById("epscompo").value = "";
document.getElementById("epscoef").value = "";
document.getElementById("epsrang").value = "";
document.getElementById("epsappreciation").value = "";

document.getElementById("frmatiere").value = "";
document.getElementById("frdevoir").value = "";
document.getElementById("frcompo").value = "";
document.getElementById("frcoef").value = "";
document.getElementById("frrang").value = "";
document.getElementById("frappreciation").value = "";
}

// Fin Mama
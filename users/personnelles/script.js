// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs,doc,getDoc, updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBApmRQEvhUbztpygJBab7_vFAQLCjVWE",
  authDomain: "ajout-4f796.firebaseapp.com",
  projectId: "ajout-4f796",
  storageBucket: "ajout-4f796.appspot.com",
  messagingSenderId: "1013523243494",
  appId: "1:1013523243494:web:9f8ddbf4f5d19e6e5db627"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const userperso = collection(db,'ajoutPersonnel');
let archiv = document.getElementById('archiv')
let Retour = document.getElementById('Retour')


ajout.addEventListener('click',async (e) => {
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    let Telephone = document.getElementById('Telephone').value;
    let adresse = document.getElementById('adresse').value;
    let email = document.getElementById('mail').value;

   await addDoc(collection(db, "ajoutPersonnel"), {
        prenom: prenom,
        nom: nom,
        Telephone: Telephone,
        adresse: adresse,
        email: email,
        isarchived: false
    }); 
    alert('Personnel ajouter');
afficher()
    
    });
    document.querySelector('#form').addEventListener('submit', (e) => {
        e.preventDefault();
    })


afficher()

    async function afficher(){
      // archiv.innerHTML="Voir archivage"
      archiv.addEventListener("click",test)
      archiv.classList.remove("d-none")
      Retour.classList.add("d-none")
      const tab = [];
      let con;
      const querySnapshot = await getDocs(collection(db, "ajoutPersonnel"));
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
                      <td>${element.prenom}</td>
                      <td>${element.nom}</td>
                      <td>${element.email}</td>
                      <td>${element.Telephone}</td>
                      <td>${element.adresse}</td>
                      <td id="${element.id}">
                        <button type="button"  class="btn modifier btn-outline-secondary"
                        data-bs-toggle="modal" data-bs-target="#exampleModal2"
                        data-bs-whatever="@mdo">
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button  class="btn supprime btn-outline-danger">
                        <i class="fas fa-trash fs-5 text-danger"></i>
                        </button>
                        <button  class="btn archived btn-outline-info">
                        <i class="fas fa-archive fs-5 text-info"></i>
                      </button>
                      </td>
              </tr>`
      ));

      let openmodalbulletin = document.querySelectorAll("#modalbtn");
      openmodalbulletin.forEach(element => {
        element.addEventListener('click', modifier)
      });
      console.log(openmodalbulletin);


      let btnsupprime= document.querySelectorAll(".supprime");
      btnsupprime.forEach(element => {
        element.addEventListener('click', async (e)=>{
          // ajout.onclick= function () {
          //   modal.classList.add("active");
          // };
        let cible = e.target.parentNode.parentNode.id;
        let colectDoc = await doc(userperso,cible)
        console.log(colectDoc);
        const ly = await getDoc(colectDoc);
         deleteDoc(colectDoc)

          console.log(ly.data());
          afficher()
        }) 
    });
    
    let btnmodif= document.querySelectorAll(".modifier");
    btnmodif.forEach(element => {
      element.addEventListener('click', async (e)=>{
        let prenomam = document.getElementById('prenomam');
        let nomam = document.getElementById('nomam');
        let Telephoneam = document.getElementById('Telephoneam');
        let adresseam = document.getElementById('adresseam');
        let emailam = document.getElementById('mailam');
      let cible = e.target.parentNode.parentNode.id;
      let colectDoc = await doc(userperso,cible)
      // console.log(colectDoc);
      const ly = await getDoc(colectDoc);
      console.log(ly.data().prenom);
      let container=ly.data()
      console.log(container.prenom);
      prenomam.value=container.prenom
      nomam.value=container.nom
      Telephoneam.value=container.Telephone
      adresseam.value=container.adresse
      emailam.value=container.email
      modif.addEventListener('click', async(e) => {
      let prenomod = document.getElementById('prenomam').value;
      let nomod = document.getElementById('nomam').value;
      let Telephoneod = document.getElementById('Telephoneam').value;
      let adresseod = document.getElementById('adresseam').value;
      let emailod = document.getElementById('mailam').value;

        await updateDoc(colectDoc, {
          prenom: prenomod,
          nom: nomod,
          Telephone: Telephoneod,
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
    let colectDoc = await doc(userperso,cible)
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
  const querySnapshot = await getDocs(collection(db, "ajoutPersonnel"));
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
                  <td>${element.prenom}</td>
                  <td>${element.nom}</td>
                  <td>${element.email}</td>
                  <td>${element.Telephone}</td>
                  <td>${element.adresse}</td>
                  <td id="${element.id}">
                 
                   
                    <button  class="btn unarchived btn-outline-info">
                    <i class="fas fa-archive fs-5 text-info"></i>
                  </button>
                  
                  </td>
          </tr>`
  ));
  Retour.classList.remove("d-none")
  archiv.classList.add("d-none")
  let btnunarchivage= document.querySelectorAll(".unarchived");
  btnunarchivage.forEach(element => {
    element.addEventListener('click', async (e)=>{
    
    let cible = e.target.parentNode.parentNode.id;
    let colectDoc = await doc(userperso,cible)
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
 


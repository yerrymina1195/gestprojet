
// **** Ibrahima Timera JS CODE ***

const tableauInStorage = JSON.parse(localStorage.getItem("tableauX")) || [];
console.log(tableauInStorage);
function onUpdate() {
  localStorage.setItem("tableauX", JSON.stringify(tableauInStorage));
  document.location.reload()
}

/*-------fonction ajouter qui va prendre les valeurs dans le input et le mettre dans l'objet personnel---------*/
function ajouter() {
let preno =document.getElementById("prenom").value;
let no =document.getElementById("nom").value;
let emai=document.getElementById("email").value;
let adress=document.getElementById("adresse").value;
let teleph=document.getElementById("Telephone").value;

if (preno === "" || no === "" ||emai === ""||teleph=== ""||adress=== "") {
  return  alert("veuillez saisir svp");
}else{

}
  const personnel = {
    firstName:preno,
    nom:no,
    mail:emai,
    moy:adress,
    tel: teleph,

    isblocked:false,
    id:new Date().getTime()
  };

  tableauInStorage.unshift(personnel);
  onUpdate();
  
}
/*------------fin du ajout--------*/


/*-----fonction affichage du tableau  ------------*/
function afficher (tableau){

  const tbody = document.getElementById("tableBody");
  tbody.innerHTML =""
  tableau.forEach((element,index) => {
    tbody.innerHTML += `<tr>
        <td>${element.firstName}</td>
        <td>${element.nom}</td>
        <td>${element.mail}</td>
        <td>${element.moy}</td>
        <td>${element.tel}</td>
       
        <td><button type="submit" ${element.isblocked === false ? `class="btn mb-3" onclick="vue(${index})" data-bs-toggle="modal" data-bs-target="#showmod"` : `class="btn btn-secondary mb-3" `}><i class="fa-solid fa-eye"></i></button></td>
        <td><button type="submit" ${element.isblocked === false ? `class="btn mb-3" onclick="edit(${index})" data-bs-toggle="modal" data-bs-target="#exampleModal"` : `class="btn btn-secondary mb-3" `}><i class="fa-solid fa-pen"></i></button></td>
        <td><button type="submit" ${element.isblocked === false ? `class="btn mb-3" onclick="supprimer(${index})"` : `class="btn btn-secondary mb-3"`} ><i class="fa-solid fa-trash"></i></button></td>
        <td><button type="submit" id="archis${index}" onclick="bloquage(${element.id})" class="btn  mb-3">${element.isblocked === false ? `<i class="fa-solid fa-box-archive"></i>` :` <i class="fa-solid fa-box-archive"></i>`} </button></td>
      </tr> `;
  });


}
afficher(tableauInStorage);
/*-----------fin du fonction affichage---------------*/
// Rechercher une personne dans le tableau 
const input = document.getElementById("search")
input.addEventListener("keyup", (e) => {
 
  const valeur = e.target.value
  const result = tableauInStorage.filter((item) => (item.firstName.toLowerCase().includes(valeur.toLowerCase())) || (item.nom.toLowerCase().includes(valeur.toLowerCase())) || (item.mail.toLowerCase().includes(valeur.toLowerCase())) || (item.tel.toLowerCase().includes(valeur.toLowerCase())))
  console.log(result);
  afficher(result)
}) 

function vue(index) {
  // console.log(tableauInStorage[index].firstName);
  document.getElementById("prenomShow").value = tableauInStorage[index].firstName;
  document.getElementById("nomShow").value = tableauInStorage[index].nom;
  document.getElementById("emailShow").value = tableauInStorage[index].mail;
  document.getElementById("adresseShow").value = tableauInStorage[index].moy;
  document.getElementById("TelephoneShow").value = tableauInStorage[index].tel;
}


/*---------fonction supprimer ------------*/

function supprimer(id) {
  tableauInStorage.splice(id, 1);
  onUpdate();
}
/*  fin du  fonction supprimer*/


  /* ---------------fonction pour Modifier l'élément dans le tableau----------------- */

function edit(index) {
  document.getElementById("prenom").value = tableauInStorage[index].firstName;
  document.getElementById("nom").value = tableauInStorage[index].nom;
  document.getElementById("email").value = tableauInStorage[index].mail;
  document.getElementById("adresse").value = tableauInStorage[index].moy;
  document.getElementById("Telephone").value = tableauInStorage[index].tel;

  let ajouterBouton = document.getElementById("adding");
  ajouterBouton.innerHTML = "Enregistrer";
  ajouterBouton.onclick = function() {
    tableauInStorage[index].firstName = document.getElementById("prenom").value;
    tableauInStorage[index].nom = document.getElementById("nom").value;
    tableauInStorage[index].mail = document.getElementById("email").value;
    tableauInStorage[index]. moy = document.getElementById("adresse").value;
    tableauInStorage[index]. tel = document.getElementById("Telephone").value;
     onUpdate();

      ajouterBouton.innerHTML = "Ajouter";
      ajouterBouton.onclick = ajouter;
      
    };
}

function bloquage(arc){
  let state= tableauInStorage.find(e => e.id === arc);
console.log(state);

if(state.isblocked === false){
  const index = tableauInStorage.findIndex(el => el.id === arc);

  tableauInStorage[index].isblocked = true;

}else{
  const index = tableauInStorage.findIndex(el => el.id === arc);

  tableauInStorage[index].isblocked = false;
}
onUpdate();
}







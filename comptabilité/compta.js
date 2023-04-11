// ====================function revenu===================================
let affiches = document.getElementById('affiche');
let afficher = document.getElementById('afficher');
let btnRevenu = document.getElementById('enregistrerrevenu');
    btnRevenu.addEventListener('click', function (e){
// =============recuperation des values input==============
    let typeRevenu = document.getElementById('typerevenu').value;
    let descriptionRevenu = document.getElementById('descriptionrevenu').value;
    let dateRevenu = document.getElementById('daterevenu').value;
    let montantRevenu = document.getElementById('montantrevenu').value;

    if (!typeRevenu || !descriptionRevenu || !dateRevenu || !montantRevenu) {
        alert("Veuillez remplir tous les champs!");
        return;
    }
  
      const  afficher = `
    <tr>
    <td>${typeRevenu}</td>
    <td>${descriptionRevenu}</td>
    <td>${dateRevenu}</td>
    <td>${montantRevenu}</td>
    </tr>`;
    affiches.innerHTML += afficher;
  
    // Vider le formulaire après l'ajout
    document.getElementById("typerevenu").value = "";
    document.getElementById("descriptionrevenu").value = "";
    document.getElementById("daterevenu").value = "";
    document.getElementById("montantrevenu").value = "";

    add();
   
    })

    // ========================fonction depense============================
    // let affiches = document.getElementById('affiche');
        let btnDepense = document.getElementById('enregistrerdepense');
            btnDepense.addEventListener('click', function (e){
              e.preventDefault();
          
        let typeDepense = document.getElementById('typedepense').value;
        let descriptionDepense = document.getElementById('descriptiondepense').value;
        let dateDepense = document.getElementById('datedepense').value;
        let montantDepense = document.getElementById('montantdepense').value;
    
        if (!typeDepense || !descriptionDepense || !dateDepense || !montantDepense) {
            alert("Veuillez remplir tous les champs!");
            return;
        }
      
          const  affiche = `
        <tr>
        <td>${typeDepense}</td>
        <td>${descriptionDepense}</td>
        <td>${dateDepense}</td>
        <td>${montantDepense}</td>
        </tr>`;
        afficher.innerHTML += affiche;
      
        // Vider le formulaire après l'ajout
        document.getElementById("typedepense").value = "";
        document.getElementById("descriptiondepense").value = "";
        document.getElementById("datedepense").value = "";
        document.getElementById("montantdepense").value = "";

        add();
       
        })
        console.log(btnDepense);

// ============================recuperer les btns et le modal pouir les masquer============================

let modalRevenu = document.getElementById('maskmodalr');
let tabRevenu = document.getElementById('maskrevenu');
let modalDepense = document.getElementById('maskmodalod');
let tabDepense = document.getElementById('maskdepense');
let titreRevenu = document.getElementById('titrerevenu');
let titreDepence = document.getElementById('titredepense');
// // ================================fonction pour masquer la partie depense==================================

function revenus(){

    modalDepense.style.display = 'none';
    // tabDepense.style.display = 'none';
    titreDepence.style.display = 'none';

}


// // ================================fonction pour masquer la partie revenu==================================
function depenses() {
    modalRevenu.style.display = 'none';
    tabRevenu.style.display = 'none';
    titreRevenu.style.display = 'none';
}
depenses()
// ========================pour ajouter dans la base de donnee========================

function add() {
  let typeRevenu = document.getElementById('typerevenu').value;
  let descriptionRevenu = document.getElementById('descriptionrevenu').value;
  let dateRevenu = document.getElementById('daterevenu').value;
  let montantRevenu = document.getElementById('montantrevenu').value;

  addDoc(collection(db, "gestion-scolaire"), {
    typeRevenu: typeRevenu.value,
    descriptionRevenu: descriptionRevenu.value,
    dateRevenu: dateRevenu.value,
    montantRevenu: montantRevenu.value,

  });
  
}
document.getElementById('saves').addEventListener('click', ()=> add());

// ==============================travail de serifou=====================================

function ajoutDepense() {
  // input

  let dateDepense = document.getElementById('datedepense').value;
  let montantDepense =parseInt(document.getElementById('montantdepense').value);

  // Mise a jour des despenses
  const totalDepense = document.getElementById('depense');
  const currentDepense = parseInt(totalDepense.innerText);
  totalDepense.innerText = `${(currentDepense + montantDepense)} FCFA`;

  // mise a jour de la date
  const dateDepenseElement = document.getElementById('dateDepense');
  dateDepenseElement.innerText = dateDepense;

  // vider le formulair
  
  document.getElementById('datedepense').value = '';
  document.getElementById('montantdepense').value = '';


  const totalRevenu = document.getElementById('revenu');
  const currentRevenu = parseInt(totalRevenu.innerText);
  totalRevenu.innerText = `${(currentRevenu - montant)} FCFA`;


  
  const dateRevenuEl = document.getElementById('dateRevenu');
  dateRevenuEl.innerText = date;

}





function ajoutRevenu() {
  // input
  const dateReve = document.getElementById('daterevenu').value;
  const montantReve = parseInt(document.getElementById('montantrevenu').value);

  // Mise a jour des Revenus
  const totalRevenu = document.getElementById('revenu');
  const currentRevenu = parseInt(totalRevenu.innerText);
  totalRevenu.innerText = `${(currentRevenu + montantReve)} FCFA`;

  // mise a jour de la dateReve
  const dateRevenuEl = document.getElementById('dateRevenu');
  dateRevenuEl.innerText = dateReve;

  // vider le formulair
  
  document.getElementById('daterevenu').value = '';
  document.getElementById('montantrevenu').value = '';

}

// 

function filterTable() {
    // Récupérer l'input et la table
    var input = document.getElementById("myInput");
    var tableFiltre = document.getElementById("table");
  
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
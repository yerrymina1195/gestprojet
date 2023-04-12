
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
<<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4__6_OqBEpVniMLLgrR9YzsoXqu4RSSA",
  authDomain: "authentic-app-c748b.firebaseapp.com",
  projectId: "authentic-app-c748b",
  storageBucket: "authentic-app-c748b.appspot.com",
  messagingSenderId: "936788752360",
  appId: "1:936788752360:web:f11516de5d6b74922cd65d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Pagination
const table = document.getElementById("tbody");
=======
// Pagination
const table = document.getElementById("tableBody");
>>>>>>> 1232c29605d1523d4f405573ceccb8cd9f0d162d
const rows = table.rows;
const rowsPerPage = 10;

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

<<<<<<< HEAD
loadPage(1);


/* <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end" id="pagination">
                       
                       
   </ul>
</nav> */
=======
loadPage(1);
>>>>>>> 1232c29605d1523d4f405573ceccb8cd9f0d162d

// Menu

const menuText = document.getElementById('menu-text');
const menu = document.getElementById('menu');

menuText.addEventListener('click', function() {
    menu.classList.toggle('active');
});


// gets current date
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentyear").innerHTML = year;

// last modified date

const date = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = date;
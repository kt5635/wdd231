// Menu

const menuText = document.getElementById('menu-text');
const menu = document.getElementById('menu');

menuText.addEventListener('click', function() {
    menu.classList.toggle('active');
});
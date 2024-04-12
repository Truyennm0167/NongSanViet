const toggle = document.querySelector('#button');
const menu = document.querySelector('.menu-filter');

toggle.addEventListener("click", ()=> menu.classList.toggle("active"));

function traicay_redirect() {
    window.location.href = "traicay.html";
}

function cu_redirect() {
    window.location.href = "cu.html";
}

function rau_redirect() {
    window.location.href = "rau.html";
}

function nam_redirect() {
    window.location.href = "nam.html";
}
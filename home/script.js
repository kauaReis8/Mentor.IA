AOS.init();
  /*carrosel*/
const slidesRect = document.querySelectorAll('.slide-retangulo');
const prevRect = document.querySelector('.prev-retangulo');
const nextRect = document.querySelector('.next-retangulo');
const wrapper = document.querySelector('.carrossel-wrapper');
let currentRect = 0;

// Mostra o slide correto
function showRect(index) {
if(index < 0) index = slidesRect.length - 1;
if(index >= slidesRect.length) index = 0;
currentRect = index;
wrapper.style.transform = `translateX(-${currentRect * 100}%)`;
}

// Botões
prevRect.addEventListener('click', () => showRect(currentRect - 1));
nextRect.addEventListener('click', () => showRect(currentRect + 1));

// Auto avanço
setInterval(() => {
showRect(currentRect + 1);
}, 6500);

// Inicializa
showRect(0);

/* MENU LATERAL */
const menuBtn2 = document.getElementById('menu-btn');
const menuLateral = document.getElementById('menu-lateral');
const overlay = document.getElementById('menu-overlay');

// Abrir menu
menuBtn2.addEventListener('click', () => {
  menuLateral.style.right = "0";
  overlay.style.display = "block";
});

// Fechar ao clicar fora
overlay.addEventListener('click', () => {
  menuLateral.style.right = "-300px";
  overlay.style.display = "none";
});

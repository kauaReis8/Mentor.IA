// MENU MOBILE
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu-lateral");
const overlay = document.getElementById("menu-overlay");

btn.addEventListener("click", () => {
  menu.style.right = "0";
  overlay.style.display = "block";
});

overlay.addEventListener("click", () => {
  menu.style.right = "-260px";
  overlay.style.display = "none";
});

// PARTÍCULAS
particlesJS("particles-container", {
  particles: {
    number: { value: 150 },
    color: { value: "#A80ABA" },
    shape: { type: "circle" },
    size: { value: 3, random: true },
    move: { enable: true, speed: 3 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" } },
    modes: { repulse: { distance: 200 } }
  }
});

document.addEventListener("scroll", function () {
  const timeline = document.querySelector(".timeline");
  const line = timeline.querySelector(":before"); // NÃO funciona direto, vamos contornar

  // SOLUÇÃO: criar a linha via CSS variável
});

document.addEventListener("scroll", () => {
  const timeline = document.querySelector(".timeline");

  const timelineTop = timeline.getBoundingClientRect().top;
  const timelineHeight = timeline.offsetHeight;
  const windowHeight = window.innerHeight;

  // Quanto da timeline já entrou na tela
  let visible = windowHeight - timelineTop;

  // Limites
  if (visible < 0) visible = 0;
  if (visible > timelineHeight) visible = timelineHeight;

  // Atualiza a variável CSS
  timeline.style.setProperty("--line-height", visible + "px");
});


/*acessibilidades*/
const aumentar = document.getElementById('aumentar');
const diminuir = document.getElementById('diminuir');
const resetar = document.getElementById('resetar');

let fator = 1; // tamanho base (1 = 100%)

// Seleciona todos os elementos que queremos afetar
const elementos = document.querySelectorAll(
'p, h1, h2, h3, h4, h5, h6, a, li, span, button, .botao, .botao-ia'
);

// Armazena o tamanho original de cada elemento
const tamanhosOriginais = new Map();
elementos.forEach(el => {
tamanhosOriginais.set(el, parseFloat(window.getComputedStyle(el).fontSize));
});

// Função para atualizar fontes
function atualizarFonte() {
elementos.forEach(el => {
  const tamanhoOriginal = tamanhosOriginais.get(el);
  el.style.fontSize = `${tamanhoOriginal * fator}px`;
});
}

// Eventos
aumentar.addEventListener('click', () => {
if (fator < 2) { // máximo 200%
  fator += 0.1;
  atualizarFonte();
}
});

diminuir.addEventListener('click', () => {
if (fator > 0.7) { // mínimo 70%
  fator -= 0.1;
  atualizarFonte();
}
});

resetar.addEventListener('click', () => {
fator = 1;
atualizarFonte();
});

  /*libras*/
  new window.VLibras.Widget('https://vlibras.gov.br/app');



  



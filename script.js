const secaoPaletaCores = document.getElementById('color-palette');
const divPaletaCores = document.getElementsByClassName('color');
const botaoCores = document.getElementById('button-random-color');
const divCor1 = document.getElementById('cor1');
const divCor2 = document.getElementById('cor2');
const divCor3 = document.getElementById('cor3');
const divCor4 = document.getElementById('cor4');
const quadroPixels = document.getElementById('pixel-board');
const pixelDoQuadro = document.getElementsByClassName('pixel');
let corComSelected = document.getElementsByClassName('selected');

// console.log(secaoPaletaCores);
// console.log(divPaletaCores);
// console.log(botaoCores);
// console.log(divCor2);
// console.log (pixelDoQuadro);

divCor1.style.backgroundColor = 'black';
divCor2.style.backgroundColor = 'deeppink';
divCor3.style.backgroundColor = 'deepskyblue';
divCor4.style.backgroundColor = 'lime';

function geradorDeCores() {
  const cor2 = parseInt(Math.random() * 255);
  const cor3 = parseInt(Math.random() * 255);
  const cor4 = parseInt(Math.random() * 255);
  const corFinal = 'rgb(' + cor2 + ', ' + cor3 + ', ' + cor4 + ')';
  return corFinal;
}

function coresAleatorias() {
  for (let index = 1; index < divPaletaCores.length; index += 1) {
    divPaletaCores[index].style.backgroundColor = geradorDeCores();
  }
  const paletaCompleta = {
    paleta2: divCor2.style.backgroundColor,
    paleta3: divCor3.style.backgroundColor,
    paleta4: divCor4.style.backgroundColor,
  };
  // console.log(paletaCompleta);
  localStorage.setItem('colorPalette', JSON.stringify(paletaCompleta));
}

const botaoDoClick = botaoCores.addEventListener('click', coresAleatorias);
const paletaSalva = JSON.parse(localStorage.getItem('colorPalette'));
// console.log (paletaSalva);

if (paletaSalva !== null) {
  divCor2.style.backgroundColor = paletaSalva.paleta2;
  divCor3.style.backgroundColor = paletaSalva.paleta3;
  divCor4.style.backgroundColor = paletaSalva.paleta4;
}

let divPixels; // Por que dá undefined quando coloco dentro do for?
for (let index2 = 1; index2 <= 20; index2 += 1) {
  divPixels = document.createElement('div');
  divPixels.className = 'pixel';
  quadroPixels.appendChild(divPixels);
}

function selecionandoCorDaPaleta(evento) {
  let cor = evento.target;
  // console.log (cor.tagName);
  if (cor.tagName === 'DIV') {
    cor.classList.add('selected');
  }
  // console.log(cor);
  for (let index3 = 0; index3 < divPaletaCores.length; index3 += 1) {
  // console.log (divPaletaCores[index3]);
    if (cor !== divPaletaCores[index3]) {
      divPaletaCores[index3].classList.remove('selected');
    }
  }
}

function pintandoQuadro(evento) {
  let quadroSelecionado = evento.target;
  // console.log(corComSelected[0])
  let corAtual = corComSelected[0].style.backgroundColor;
  // console.log (corAtual);
  quadroSelecionado.style.backgroundColor = corAtual;
}

let corSelecionada = secaoPaletaCores.addEventListener('click', selecionandoCorDaPaleta);

let pintar = quadroPixels.addEventListener('click', pintandoQuadro);

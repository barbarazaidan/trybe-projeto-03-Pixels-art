const secaoPaletaCores = document.getElementById('color-palette');
const divPaletaCores = document.getElementsByClassName('color');
const botaoCores = document.getElementById('button-random-color');
const divCor1 = document.getElementById('cor1');
const divCor2 = document.getElementById('cor2');
const divCor3 = document.getElementById('cor3');
const divCor4 = document.getElementById('cor4');
const quadroPixels = document.getElementById('pixel-board');
const corComSelected = document.getElementsByClassName('selected');
const botaoLimpar = document.getElementById('clear-board');
const quadrados = document.getElementsByClassName('pixel');
const inputBoard = document.getElementById('board-size');
const botaoVQV = document.getElementById('generate-board');

// const pixelDoQuadro = document.getElementsByClassName('pixel');
// console.log(secaoPaletaCores);
// console.log(divPaletaCores);
// console.log(botaoCores);
// console.log(divCor2);
// console.log (pixelDoQuadro);
// console.log(botaoLimpar);
// console.log(quadrados);

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

if (paletaSalva !== null) { // é aqui que eu, de fato, atribuo as cores aleatórias à paleta
  divCor2.style.backgroundColor = paletaSalva.paleta2;
  divCor3.style.backgroundColor = paletaSalva.paleta3;
  divCor4.style.backgroundColor = paletaSalva.paleta4;
}

let divPixels; // Por que dá undefined quando coloco dentro do for?
for (let index2 = 1; index2 <= 20; index2 += 1) {
  divPixels = document.createElement('div');
  divPixels.className = 'pixel';
  backgroundColor = 'white';
  quadroPixels.appendChild(divPixels);
}

function selecionandoCorDaPaleta(evento) {
  const cor = evento.target;
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
  const quadroSelecionado = evento.target;
  // console.log(corComSelected[0])
  let corAtual = corComSelected[0].style.backgroundColor;
  // console.log (corAtual);
  quadroSelecionado.style.backgroundColor = corAtual;
  const arrayDeCores = []; // criei um array para salvar as cores de cada quadrado
  for (let contar = 0; contar < quadrados.length; contar += 1) {
    // console.log(quadrados[contar].style.backgroundColor);
    // se eu colocar esse for fora da função, ela só vai ler uma vez e vai ler os quadrados com as cores iniciais, que é tudo branco. Ele precisa estar na função do pintar, porque assim a cada quadrado pintado, ele fará uma nova verificação nas cores.
    arrayDeCores.push(quadrados[contar].style.backgroundColor); // aqui a cada nova iteração, o for irá verificar todos os quadrados e recriar o array com as cores atualizadas
  }
  // console.log(arrayDeCores);
  localStorage.setItem('pixelBoard', JSON.stringify(arrayDeCores));
}

const boardColorido = JSON.parse(localStorage.getItem('pixelBoard'));
console.log(boardColorido);// só aparece quando atualizo a página

if (boardColorido !== null) {
  for (let cont = 0; cont < quadrados.length; cont += 1) {
    quadrados[cont].style.backgroundColor = boardColorido[cont];
  }
} //  aqui é onde eu, de fato, atribuo as cores salvas ao quadro, do contrário ela fica salva no localStorage, mas eu não atribuo a informação à nada quando atualizo a página

function limparQuadro() {
  for (let contador = 0; contador < quadrados.length; contador += 1) {
    quadrados[contador].style.backgroundColor = 'white';
    localStorage.removeItem('pixelBoard'); // aqui ele apaga o local storage que tem a chave pixelBoard e mantém o quadro limpo caso a pessoa recarregue
  }
}

function validaQuantidadeMinEMax() {
  let quantidade = inputBoard.value;
  if (quantidade < 5) {
    alert('O valor mínimo é 5');
    quantidade = 5;
  }
  if (quantidade > 50) {
    alert('O valor máximo é 50');
    quantidade = 50;
  }
  return quantidade;
}

function gridSecaoLinhas() {
  quadroPixels.style.display = 'block';
  const quantidade = validaQuantidadeMinEMax();
  for (let index = 1; index <= quantidade; index += 1) {
    const secaoLinha = document.createElement('secao');
    secaoLinha.style.display = 'flex';
    quadroPixels.appendChild(secaoLinha);  
    for (let index2 = 1; index2 <= quantidade; index2 += 1) {
      divPixels = document.createElement('div');
      divPixels.className = 'pixel';
      backgroundColor = 'white';
      secaoLinha.appendChild(divPixels);
    }
  }
}

function apagaPixels(array) {
  for (let index = array.length - 1; index >= 0; index -= 1) { // eu não sei direito por que só funciona decrementando, tem a ver com o que perguntei para o Fransuelio no Slack e com a explicação do course, mas ainda não entendi 100%, só sei que incrementando normalmente não apaga todos os pixels.
    quadroPixels.removeChild(array[index]);
    // console.log(array);
  }
}

function analisaInput() {
  const quantidade = inputBoard.value;
  if (quantidade === '') {
    alert('Board inválido!');
  } else {
    apagaPixels(quadrados);
    gridSecaoLinhas();
  }
  // console.log(typeof quantidade);
}

function gerandoBoardNovo(event) {
  event.preventDefault();
  analisaInput();
}

const corSelecionada = secaoPaletaCores.addEventListener('click', selecionandoCorDaPaleta);

const pintar = quadroPixels.addEventListener('click', pintandoQuadro);

const limpar = botaoLimpar.addEventListener('click', limparQuadro);

const gerarNovoBoard = botaoVQV.addEventListener('click', gerandoBoardNovo);

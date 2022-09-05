const secaoPaletaCores = document.getElementById('color-palette');
const divPaletaCores = document.getElementsByClassName('color');
const botaoCores = document.getElementById('button-random-color');

console.log(secaoPaletaCores);
console.log(divPaletaCores);
console.log(botaoCores);

function geradorDeCores() {
 let cor2 = parseInt(Math.random() * 255);
 let cor3 = parseInt(Math.random() * 255);
 let cor4 = parseInt(Math.random() * 255);
 let corFinal = 'rgb(' + cor2 + ', ' + cor3 + ', ' + cor4 + ')';
 return corFinal;
}

function coresAleatorias() {
 for (let index = 1; index < divPaletaCores.length; index += 1) {
  divPaletaCores[index].style.backgroundColor = geradorDeCores();
 }
}

botaoCores.addEventListener('click', coresAleatorias);
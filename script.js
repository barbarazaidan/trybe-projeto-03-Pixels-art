const secaoPaletaCores = document.getElementById('color-palette');
const divPaletaCores = document.getElementsByClassName('color');
const botaoCores = document.getElementById('button-random-color');
const divCor2 = document.getElementById('cor2');
const divCor3 = document.getElementById('cor3');
const divCor4 = document.getElementById('cor4');

// console.log(secaoPaletaCores);
// console.log(divPaletaCores);
// console.log(botaoCores);
// console.log(divCor2);


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
  let paletaCompleta = {
    paleta2: divCor2.style.backgroundColor,
    paleta3: divCor3.style.backgroundColor,
    paleta4: divCor4.style.backgroundColor
   };
  //console.log(paletaCompleta);
  localStorage.setItem('colorPalette', JSON.stringify(paletaCompleta));
}

const botaoDoClick = botaoCores.addEventListener('click', coresAleatorias);
let paletaSalva = JSON.parse(localStorage.getItem('colorPalette'));
//console.log (paletaSalva);
if (paletaSalva !== null) {
  divCor2.style.backgroundColor = paletaSalva.paleta2;
  divCor3.style.backgroundColor = paletaSalva.paleta3;
  divCor4.style.backgroundColor = paletaSalva.paleta4;
}




const mapeamentoTeclas = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    ".": ".",
    "(": "(",
    ")": ")",
    "p": "p",
    "=": "=",
    Backspace: "C",
    "%": "%",
    "!": "!",
    s: "s",
    c: "c",
    t: "t",
    r: "r",
  };

let equacao = "";
const entrada = document.getElementById('entrada');

document.addEventListener("keydown", function (event) {
    let teclaFisica = event.key;
    const textoTeclaVirtual = mapeamentoTeclas[teclaFisica];
    const teclasVirtuais = document.querySelectorAll(".tecla");
  
    if (teclaFisica == "Backspace") {
      equacao = equacao.slice(0, -1);
      const botaoApagar = teclasVirtuais[3];
      hoverTecla(botaoApagar);
  
    }
  
    else if (teclaFisica === "=") {
      calcularEquacao();
      event.preventDefault();
      const botaoIgual = teclasVirtuais.length - 1
      hoverTecla(teclasVirtuais[botaoIgual]);
      return;
    }
  
    else if (validarProximoCaractere(equacao, teclaFisica)) {
      adicionaEquacao(teclasVirtuais, textoTeclaVirtual, teclaFisica, event);
    }
  
    else {
      event.preventDefault();
    }
  
    atualizarDisplay();
  });


  function hoverTecla(tecla) {
    tecla.classList.add("pressionada");
    setTimeout(() => {
      tecla.classList.remove("pressionada");
    }, 200);
  }


  function validarProximoCaractere(equacaoAtual, novoCaractere) {
    equacaoAtual = String(equacaoAtual || "");
    const parentesesAbertos = (equacaoAtual.match(/\(/g) || []).length;
    const parentesesFechados = (equacaoAtual.match(/\)/g) || []).length;
    const ultimoChar = equacaoAtual.slice(-1);

    if (novoCaractere === '-') {
        return verificaPossibilidadeMenos(ultimoChar);
    }

    if (equacaoAtual === "") {
        return /^[0-9(\-stcr]$/.test(novoCaractere);
    }

    if (novoCaractere === ')') {
        return parentesesAbertos > parentesesFechados;
    }

    if (ultimoChar === '%') {
        return /^[+\-*\/p)]$/.test(novoCaractere); 
    }

    if (/[stcr]/.test(ultimoChar)) {
        return novoCaractere === '(';
    }

    if (novoCaractere === '.') {
        const partes = equacaoAtual.split(/[+\-*\/p%()]/);
        const ultimoNumero = partes[partes.length - 1];
        return !ultimoNumero.includes('.');
    }

    if (ultimoChar === '.') {
        return /^[0-9]$/.test(novoCaractere);
    }
    
    if (novoCaractere === '%') {
        return /[0-9)]/.test(ultimoChar); 
    }

    if (/[0-9]/.test(ultimoChar)) {
        return /^[0-9+\-*\/p%).!]$/.test(novoCaractere);
    }

    if (/[+\-*\/p%]/.test(ultimoChar)) {
        return /^[0-9(\-stcr]$/.test(novoCaractere);
    }

    if (ultimoChar === '(') {
        return /^[0-9(\-stcr]$/.test(novoCaractere);
    }

   
    if (ultimoChar === ')') {
        return /^[+\-*\/%!p]$/.test(novoCaractere);
    }

    if (ultimoChar === '!') {
        return /^[+\-*\/p)]$/.test(novoCaractere);
    }

    return false;
}

function verificaPossibilidadeMenos(ultimoChar) {
    if (/[\/*+p%]/.test(ultimoChar)) {
      return true;
    }
  
    if (ultimoChar === '(') {
      return true;
    }
  
    if (ultimoChar === '-') {
      return false;
    }
  
    return true; 
}
  
function atualizarDisplay() {
    const display = document.getElementById("entrada");
    if (display) {
      display.value = equacao;
    }
}


function porcentagem(n) {
    return n / 100;
  }

  function fatorial(n) {
    console.log(n);5
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * fatorial(n - 1);
  }  
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
  
    if (teclaFisica === "Backspace") {
      equacao = equacao.slice(0, -1);
      const botaoApagar = teclasVirtuais[3];
      hoverTecla(botaoApagar);
    } else if (teclaFisica === "=") {
      calcularEquacao();
      event.preventDefault();
      const botaoIgual = teclasVirtuais.length - 1;
      hoverTecla(teclasVirtuais[botaoIgual]);
      return;
    } else if (validarProximoCaractere(equacao, teclaFisica)) {
      adicionaEquacao(teclasVirtuais, textoTeclaVirtual, teclaFisica, event);
    } else {
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
  
  function adicionaEquacao(teclasVirtuais, textoTeclaVirtual, teclaFisica, event) {
    for (const tecla of teclasVirtuais) {
      if (tecla.textContent === textoTeclaVirtual) {
        equacao += mapeamentoTeclas[teclaFisica];
        hoverTecla(tecla);
        return;
      }
    }
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
      return podeComecarCom(novoCaractere);
    }
  
    if (verificaCaracterePorTipo(novoCaractere, equacaoAtual, ultimoChar, parentesesAbertos, parentesesFechados)) {
      return true;
    }
  
    if (verificaContextoUltimoCaractere(ultimoChar, novoCaractere)) {
      return true;
    }
  
    return false;
  }
  
  function podeComecarCom(caractere) {
    return /^[0-9(\-stcr]$/.test(caractere);
  }
  
  function verificaCaracterePorTipo(novoCaractere, equacaoAtual, ultimoChar, abertos, fechados) {
    switch (novoCaractere) {
      case ')':
        return abertos > fechados;
      case '%':
        return /[0-9)]/.test(ultimoChar);
      case '.':
        return podeAdicionarPonto(equacaoAtual);
      default:
        return false;
    }
  }
  
  function podeAdicionarPonto(equacaoAtual) {
    const partes = equacaoAtual.split(/[+\-*\/p%()]/);
    const ultimoNumero = partes[partes.length - 1];
    return !ultimoNumero.includes('.');
  }
  
  function verificaContextoUltimoCaractere(ultimoChar, novoCaractere) {
    switch (ultimoChar) {
      case '%':
        return /^[+\-*\/p)]$/.test(novoCaractere);
      case '.':
        return /^[0-9]$/.test(novoCaractere);
      case '!':
        return /^[+\-*\/p)]$/.test(novoCaractere);
      case '(':
        return /^[0-9(\-stcr]$/.test(novoCaractere);
      case ')':
        return /^[+\-*\/%!p]$/.test(novoCaractere);
      default:
        return verificaOutrosCasos(ultimoChar, novoCaractere);
    }
  }
  
  function verificaOutrosCasos(ultimoChar, novoCaractere) {
    if (/[stcr]/.test(ultimoChar)) {
      return novoCaractere === '(';
    }
  
    if (/[0-9]/.test(ultimoChar)) {
      return /^[0-9+\-*\/p%).!]$/.test(novoCaractere);
    }
  
    if (/[+\-*\/p%]/.test(ultimoChar)) {
      return /^[0-9(\-stcr]$/.test(novoCaractere);
    }
  
    return false;
  }
  
  function verificaPossibilidadeMenos(ultimoChar) {
    switch (ultimoChar) {
      case '/':
      case '*':
      case '+':
      case 'p':
      case '%':
      case '(':
        return true;
      case '-':
        return false;
      default:
        return true;
    }
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
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * fatorial(n - 1);
  }
  
  function calcularEquacao() {
    if (equacao === "") return;
  
    try {
      let expr = equacao
        .replace(/s\(/g, 'Math.sin(')
        .replace(/c\(/g, 'Math.cos(')
        .replace(/t\(/g, 'Math.tan(')
        .replace(/r\(/g, 'Math.sqrt(')
        .replace(/(\([\d\+\-\*\/\.]+\)|\d+)(\!)/g, 'fatorial($1)')
        .replace(/p/g, '**')
        .replace(/%/g, '/100');
  
      const resultado = new Function(`return ${expr}`)();
      equacao = resultado.toString();
      atualizarDisplay();
  
    } catch (error) {
      equacao = "Erro";
      atualizarDisplay();
      setTimeout(() => {
        equacao = "";
        atualizarDisplay();
      }, 1000);
    }
  }
  
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
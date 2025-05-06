export const mapeamentoTeclas = {
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
    "=": "=",
    Backspace: "C",
    "%": "%",
    "!": "!",
    s: "s",
    c: "c",
    t: "t",
    r: "r",
    p: "p"
  };
  
  export const displayMap = {
    's': 'sin(',
    'c': 'cos(',
    't': 'tan(',
    'p': '^',
    'r': '√'
  };
  
  export function hoverTecla(tecla) {
    tecla.classList.add("pressionada");
    setTimeout(() => {
      tecla.classList.remove("pressionada");
    }, 200);
  }
  
  export function atualizarDisplay(equacao) {
    const display = document.getElementById("entrada");
    if (display) {
      display.value = equacao;
    }
  }

  
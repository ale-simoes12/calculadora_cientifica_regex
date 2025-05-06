import { mapeamentoTeclas, displayMap, hoverTecla, atualizarDisplay } from './teclado.js';
import { validarProximoCaractere } from './validacao.js';
import { adicionaEquacao, calcularEquacao, getEquacao, setEquacao } from './calculadora.js';

document.addEventListener("keydown", function (event) {
  let teclaFisica = event.key;
  const textoTeclaVirtual = mapeamentoTeclas[teclaFisica];
  const teclasVirtuais = document.querySelectorAll(".tecla");
  
  if (teclaFisica === "Backspace") {
    setEquacao(getEquacao().slice(0, -1));
    const botaoApagar = teclasVirtuais[1];
    hoverTecla(botaoApagar);
  } 
  else if (teclaFisica === "a") {
    setEquacao("");
    const botaoApagarTudo = teclasVirtuais[0];
    hoverTecla(botaoApagarTudo);
  } 
  else if (teclaFisica === "=") {
    calcularEquacao();
    event.preventDefault();
    const botaoIgual = teclasVirtuais.length - 1;
    hoverTecla(teclasVirtuais[botaoIgual]);
    return;
  } else if (validarProximoCaractere(getEquacao(), teclaFisica)) {
    adicionaEquacao(teclasVirtuais, textoTeclaVirtual, teclaFisica);
  } else {
    event.preventDefault();
  }

  atualizarDisplay(getEquacao());
});
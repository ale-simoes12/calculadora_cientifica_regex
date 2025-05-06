import { mapeamentoTeclas, displayMap, hoverTecla, atualizarDisplay } from './teclado.js';
import { validarProximoCaractere } from './validacao.js';

let equacao = "";

export function adicionaEquacao(teclasVirtuais, textoTeclaVirtual, teclaFisica) {
  for (const tecla of teclasVirtuais) {
    if(tecla.textContent + "(" === displayMap[textoTeclaVirtual] || tecla.textContent === displayMap[textoTeclaVirtual]) {
      equacao += displayMap[textoTeclaVirtual];
    }  
    if (tecla.textContent === textoTeclaVirtual) {
      equacao += mapeamentoTeclas[teclaFisica];
      hoverTecla(tecla);
      return;
    }
  }
}

export function calcularEquacao() {
  if (equacao === "") return;

  try {
    let expr = equacao
      .replace(/sin\(/g, 'Math.sin(')  
      .replace(/cos\(/g, 'Math.cos(') 
      .replace(/tan\(/g, 'Math.tan(')  
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/(\([\d\+\-\*\/\.]+\)|\d+)(\!)/g, 'fatorial($1)')
      .replace(/\^/g, '**')
      .replace(/%/g, '/100');

    const resultado = new Function('fatorial', `return ${expr}`)(fatorial);
    equacao = resultado.toString();
    atualizarDisplay(equacao);

  } catch (error) {
    equacao = "Erro";
    atualizarDisplay(equacao);
    setTimeout(() => {
      equacao = "";
      atualizarDisplay(equacao);
    }, 1000);
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

export function getEquacao() {
  return equacao;
}

export function setEquacao(valor) {
  equacao = valor;
}
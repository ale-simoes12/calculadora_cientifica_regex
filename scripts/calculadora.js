import { mapeamentoTeclas, displayMap, hoverTecla, atualizarDisplay } from './teclado.js';
import { validarProximoCaractere } from './validacao.js';

let equacao = "";

function potencia(base, expoente) {
    if (expoente === 0) return 1;
    let resultado = 1;
    for (let i = 0; i < Math.abs(expoente); i++) {
        resultado *= base;
    }
    return expoente > 0 ? resultado : 1 / resultado;
}

function fatorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * fatorial(n - 1);
}


function meuSeno(x) {
    let resultado = 0;
    for (let n = 0; n < 10; n++) { 
        const termo = (potencia(-1, n) * potencia(x, 2 * n + 1) / fatorial(2 * n + 1));
        resultado += termo;
    }
    return resultado;
}

function meuCosseno(x) {
    let resultado = 0;
    for (let n = 0; n < 10; n++) {
        const termo = (potencia(-1, n) * potencia(x, 2 * n)) / fatorial(2 * n);
        resultado += termo;
    }
    return resultado;
}


function minhaTangente(x) {
    const seno = meuSeno(x);
    const cosseno = meuCosseno(x);
    if (cosseno === 0) throw new Error("Tangente indefinida");
    return seno / cosseno;
}

function minhaRaizQuadrada(x, iteracoes = 10) {
    if (x < 0) throw new Error("Raiz de número negativo");
    if (x === 0) return 0;
    let aproximacao = x / 2;
    for (let i = 0; i < iteracoes; i++) {
        aproximacao = 0.5 * (aproximacao + x / aproximacao);
    }
    return aproximacao;
}


export function adicionaEquacao(teclasVirtuais, textoTeclaVirtual, teclaFisica) {
    for (const tecla of teclasVirtuais) {
        if (tecla.textContent + "(" === displayMap[textoTeclaVirtual] || tecla.textContent === displayMap[textoTeclaVirtual]) {
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
            .replace(/sin\(/g, 'meuSeno(')
            .replace(/cos\(/g, 'meuCosseno(')
            .replace(/tan\(/g, 'minhaTangente(')
            .replace(/√\(/g, 'minhaRaizQuadrada(')
            .replace(/(\([\d\+\-\*\/\.]+\)|\d+)(\!)/g, 'fatorial($1)')
            .replace(/\^/g, '**');

        const resultado = new Function(
            'meuSeno', 'meuCosseno', 'minhaTangente', 'minhaRaizQuadrada', 'fatorial',
            `return ${expr}`
        )
        ( meuSeno, meuCosseno, minhaTangente, minhaRaizQuadrada, fatorial);

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

export function getEquacao() {
    return equacao;
}

export function setEquacao(valor) {
    equacao = valor;
}
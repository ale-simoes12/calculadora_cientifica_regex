export function validarProximoCaractere(equacaoAtual, novoCaractere) {
    equacaoAtual = String(equacaoAtual || "");
    const parentesesAbertos = (equacaoAtual.match(/\(/g) || []).length;
    const parentesesFechados = (equacaoAtual.match(/\)/g) || []).length;
    const ultimoChar = equacaoAtual.slice(-1);
    
    if(novoCaractere === ")"){
        return parentesesAbertos > parentesesFechados;
    }
  
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
    const partes = equacaoAtual.split(/[+\-*\/^%()]/);
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
    if (/[stc√]/.test(ultimoChar)) {
      return novoCaractere === '(';
    }
  
    if (/[0-9]/.test(ultimoChar)) {
      return /^[0-9+\-*\/p%).!]$/.test(novoCaractere);
    }
  
    if (/[+\-*\/^%]/.test(ultimoChar)) {
      return /^[0-9(\-stcr]$/.test(novoCaractere);
    }
  
    return false;
  }
  
  function verificaPossibilidadeMenos(ultimoChar) {
    switch (ultimoChar) {
      case '/':
      case '*':
      case '+':
      case '^':
      case '%':
      case '(':
        return true;
      case '-':
        return false;
      default:
        return true;
    }
  }
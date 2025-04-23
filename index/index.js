function validarCartao(numeroCartao) {
    const numero = numeroCartao.replace(/\s+/g, '');
    const comprimento = numero.length;

    if (!validarLuhn(numero)) {
        return "Cartão inválido - Falha na verificação Luhn";
    }

    const bandeiras = [
        { nome: "American Express", prefixos: ["34", "37"], comprimentos: [15] },
        { nome: "Diners Club - Carte Blanche", prefixos: ["300", "301", "302", "303", "304", "305"], comprimentos: [14] },
        { nome: "Diners Club - International", prefixos: ["36"], comprimentos: [14] },
        { nome: "MasterCard", prefixos: [...gerarFaixa(51, 55), ...gerarFaixa(222100, 272099)], comprimentos: [16] },
        { nome: "Visa", prefixos: ["4"], comprimentos: [13, 16, 19] },
        { nome: "Visa Electron", prefixos: ["4026", "417500", "4508", "4844", "4913", "4917"], comprimentos: [16] },
    ];

    for (let bandeira of bandeiras) {
        for (let prefixo of bandeira.prefixos) {
            if (numero.startsWith(prefixo) && bandeira.comprimentos.includes(comprimento)) {
                return `Cartão válido - Bandeira: ${bandeira.nome}`;
            }
        }
    }

    return "Cartão inválido ou bandeira não reconhecida";
}

// 🧮 Algoritmo de Luhn
function validarLuhn(numero) {
    let soma = 0;
    let alternar = false;

    for (let i = numero.length - 1; i >= 0; i--) {
        let n = parseInt(numero.charAt(i), 10);

        if (alternar) {
            n *= 2;
            if (n > 9) n -= 9;
        }

        soma += n;
        alternar = !alternar;
    }

    return soma % 10 === 0;
}

// 🔁 Geração de faixas de prefixo como string
function gerarFaixa(inicio, fim) {
    const faixa = [];
    for (let i = inicio; i <= fim; i++) {
        faixa.push(i.toString());
    }
    return faixa;
}

// 🔍 Testes
console.log(validarCartao("38584196623598")); // Visa
console.log(validarCartao("5500 0000 0000 0004")); // MasterCard
console.log(validarCartao("3400 0000 0000 009"));  // American Express
console.log(validarCartao("1234 5678 9012 3456")); // Inválido (Luhn falha)

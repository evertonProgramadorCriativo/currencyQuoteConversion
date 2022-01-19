const convert = (cotacao, quantidade) => {
    return cotacao * quantidade 
}

const toMoney = valor =>  {
    return parseFloat(valor).toFixed(2)
    /*
    error valor.toFixed is not a function (valor.toFixed não é uma função)
    pode ser que o valor não seja um numero
    esse erro e por que valor pode não ser um numero por isso dar esse erro 
    para solucina isso basta usa uma função que vai converte para numero , dar certeza que e um numero
     função parseFloat() analisa um argumento string e retorna um número de ponto flutuante.
    */
}

module.exports = {
    convert,
    toMoney
}
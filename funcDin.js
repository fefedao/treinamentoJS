/**
 * Created by fefedo on 20/06/17.
 */
var frutas = ["morango", "banana", "laranja", "abacaxi", "manga"];

var saladaDeFrutas = {};

for (var i= 0;i < (frutas.length - 1); i++){
    saladaDeFrutas[frutas[i]] = function () {
        console.log("Meu nome e " + frutas[i]);
    }
}

saladaDeFrutas.morango();
saladaDeFrutas.banana();
saladaDeFrutas.laranja();
saladaDeFrutas.abacaxi();

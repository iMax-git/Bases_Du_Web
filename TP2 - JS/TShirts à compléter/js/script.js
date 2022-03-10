console.log("Hello World!");

form = document.getElementById("commandeTS");

form.addEventListener("change", function(event) {
    FDP = 5;
    input = document.getElementById("saisieNbTS");
    if (input.value < 1) { input.value = 1; }
    if (input.value > 50) { FDP = 0; }
    if (input.value >= 2){
        document.getElementById("zoneRetourClient").innerHTML = `Vous avez choisi de commander ${input.value} t-shirts, pour un montant de ${input.value*13 + 5}€` ;
    } else {
        document.getElementById("zoneRetourClient").innerHTML = `Vous avez choisi de commander ${input.value} t-shirt, pour un montant de ${input.value*13 + 5}€` ;
    }

});
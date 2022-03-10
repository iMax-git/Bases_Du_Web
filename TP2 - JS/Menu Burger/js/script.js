console.log('Hello World!');

document.getElementById("fermeture_menu").addEventListener("click", function(){
    document.querySelectorAll(".menu-principal").item(0).classList.toggle("ouvert");
});

document.getElementById("ouverture_menu").addEventListener("click", function(){

    document.querySelectorAll(".menu-principal").item(0).classList.toggle("ouvert");
});
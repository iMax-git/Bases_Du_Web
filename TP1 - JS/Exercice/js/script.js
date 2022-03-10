console.log('Init javascript !');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded !');

    const ingredient =  document.querySelectorAll("#ingredients li");


    console.log(ingredient);
    console.log("J'ai trouvé "+ingredient.length+" ingrédients !");

    const e2 = document.getElementById("elemEx2");
    console.log(e2);
    e2.classList.remove("control")
    e2.classList.add("inverse");

    const e3 = document.getElementById("reussite");
    e3.innerText = "ha ok, j'ai compris !";
    const e4 = document.getElementById("dog");
    const alttext = e4.getAttribute("alt");
    document.getElementById("legendeDog").innerText = alttext;

    document.getElementById("boutonEffacerEx4").addEventListener("click", function() {
        console.log("Event click sur boutonEffacerEx4");
        document.getElementById("figureEx4").setAttribute("class","invisible")
    });

    document.getElementById("boutonAfficherEx4").addEventListener("click", function() {
        console.log("Event click sur boutonAfficherEx4");
        document.getElementById("figureEx4").setAttribute("class","visible")
    });

    document.getElementById("figureEx4").setAttribute("class","visible")
    document.getElementById("boutonDoubleEx4").addEventListener("click", function() {
        console.log("Event click sur boutonDoubleEx4");
        if (document.getElementById("figureEx4").getAttribute("class") == "visible") {
            document.getElementById("figureEx4").setAttribute("class","invisible")
        } else {
            document.getElementById("figureEx4").setAttribute("class","visible")
        }
    });


    const e5 = document.querySelectorAll(".liste_tetes li img")
    console.log(e5);
    /*
    e5.forEach(function(elem) {
        elem.setAttribute("class","penche");
    });

     */
    const e6 = document.querySelectorAll("h2");
    e6.forEach(function(elem) {
        elem.setAttribute("class","elargi");
    });

    const e7 = document.querySelectorAll("img");
    e7.forEach(function(elem) {
        elem.addEventListener("click", function() {
            console.log("Event click sur img");
            elem.setAttribute("class",elem.getAttribute("class")+" penche");
        });
    });

    const e8 = document.querySelectorAll(".liste_tetes li img");
    e8.forEach(function(elem) {
        /*
        elem.addEventListener("click", function() {
            console.log("Event click sur img");
            elem.setAttribute("class",elem.getAttribute("class")+" penche");
        });

         */
    });

    e8.forEach(function(elem) {
        elem.addEventListener("mouseover", function() {
            console.log("Event mouseover sur img");
            elem.setAttribute("class",elem.getAttribute("class")+" penche");
        });
        elem.addEventListener("mouseout", function() {
            console.log("Event mouseout sur img");
            elem.setAttribute("class",elem.getAttribute("class").replace("penche",""));
        });
    });
});



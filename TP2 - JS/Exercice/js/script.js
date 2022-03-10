console.log('Hello World!');
/*
document.getElementById('boutonSupprimerEx1').addEventListener('click', function() {

    document.querySelectorAll("#ex1 ul li").item(0).remove();
});

document.getElementById("boutonDeplacerEx2").addEventListener("click", function() {
    console.log("click");
    const li = document.querySelectorAll("#ex2 ul li");
    const ele = li[0];
    ele.parentNode.removeChild(ele);
    document.querySelector("#ex2 ul").appendChild(ele);


});

document.getElementById("boutonCreerEx2").addEventListener("click", function() {
    console.log("click");
    const newli = document.createElement("li");
    newli.innerHTML = "nouveau";
    document.querySelector("#ex2 ul").appendChild(newli);
});

id = 0;
document.getElementById("ingredients").addEventListener("click", function() {
    console.log("change");
    if (id >document.querySelectorAll("#ingredients li").length) {
        console.log("plus de li");
    } else {
        const ele = document.querySelectorAll("#ingredients li").item(id).setAttribute("class", "invisible");
        id++;
    }
});

document.getElementById("ex3").getElementsByTagName("span").item(0).addEventListener("click", function() {
    console.log("click");
    document.querySelectorAll("#ingredients li").forEach(function(element) {
        element.removeAttribute("class");
    });
    id = 0;
});



document.querySelectorAll("#lesPrenoms li").forEach(function(element) {
    element.addEventListener("click", function() {
        console.log("click");
        element.setAttribute("class", "invisible");
    });
});

document.getElementById("ex4").getElementsByTagName("span").item(0).addEventListener("click", function() {
    console.log("click");
    document.querySelectorAll("#lesPrenoms li").forEach(function(element) {
        element.removeAttribute("class");
    });
});





document.getElementById("ex5").querySelectorAll("ul li").forEach(function(element) {

    element.addEventListener("click", function() {
        const x = document.createElement("li");
        x.innerHTML = element.innerHTML;
        document.getElementById("ex5").getElementsByTagName("ul").item(0).appendChild(x)
        console.log("click");
        element.remove();
    });

});


*/

document.querySelectorAll("#lettresEtNombres li").forEach(function(element) {
    element.addEventListener("click", function() {
        console.log("click");
        const cl = element.getAttribute("class");
        document.querySelectorAll("#lettresEtNombres li").forEach(function(element2) {

            if (element2.getAttribute("class") == cl) {
                element2.setAttribute("class", element2.getAttribute("class") + " invisible");
            }
        });
    });
});

document.querySelectorAll("#ex6 span").forEach(function(element) {
    element.addEventListener("click", function() {
        console.log("click");
        document.querySelectorAll("#lettresEtNombres li").forEach(function(element2) {
            const cl = element2.getAttribute("class");
            const spcl = cl.split(" ");
            console.log(spcl);
            if ( spcl[2] =="invisible" || spcl[1] =="invisible") {
                element2.setAttribute("class", cl.replace(" 'invisible", ""));
            }
        });
    });
});

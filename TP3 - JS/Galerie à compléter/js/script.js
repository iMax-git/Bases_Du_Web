console.log('Hello World!');

document.getElementById('titreImage').innerHTML = document.querySelectorAll('#vignettes li img')[0].alt;
document.getElementById('grandeImage').src = document.querySelectorAll('#vignettes li img')[0].src;

document.querySelectorAll('#vignettes li').forEach(function(vignette) {
    vignette.addEventListener("mouseover", function() {
        document.querySelectorAll('#vignettes li').forEach(function(vignette) {
            vignette.classList.remove('selected');
        });
        vignette.classList.add('selected');
        document.getElementById('titreImage').innerHTML = vignette.querySelector('img').alt;
        document.getElementById('grandeImage').src = vignette.querySelector('img').src;
    });

});
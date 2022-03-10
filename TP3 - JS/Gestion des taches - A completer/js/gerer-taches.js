console.log("Hello World !");

document.querySelectorAll('.tache').forEach(function(tache) {
    tache.querySelectorAll('.tache__btn--suppression').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            tache.remove();
        });
    });

    tache.querySelectorAll('.tache__btn--validation').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            quoi = tache.querySelector('.tache__principal .tache__quoi').innerHTML;
            qui = tache.querySelector('footer .tache__qui').innerHTML;
            CreateNewCard(quoi,qui,true);
            tache.remove();
        });
    });
});

document.querySelectorAll('.tache__formulaire').forEach(function(formulaire) {
    formulaire.addEventListener('submit', function(e) {
        e.preventDefault();
        quoi = formulaire.querySelector('.tache__quoi').value;
        qui = formulaire.querySelector('.tache__qui').value;
        CreateNewCard(quoi, qui, false);

    });
});

function CreateNewCard(quoi,qui,accomplie) {
    var tache = document.createElement('li');
    tache.classList.add('tache');

    tache.innerHTML = '' +
        '<header class="tache__controles">' +
        '<span class="tache__btn tache__btn--validation">V</span>' +
        '<span class="tache__btn tache__btn--suppression">X</span>' +
        '</header>' +
        '<section class="tache__principal">' +
        '<p class="tache__quoi">'+quoi+'</p>' +
        '</section>' +
        '<footer>' +
        '<p class="tache__qui">'+qui+'</p>' +
        '</footer>' +
        '';
    tache.querySelector('.tache__btn--suppression').addEventListener('click', function(e) {
        e.preventDefault();
        tache.remove();
    });
    if(!accomplie){
        tache.querySelector('.tache__btn--validation').addEventListener('click', function(e) {
            e.preventDefault();
            CreateNewCard(quoi,qui,true);
            tache.remove();
        });

        document.querySelector('.a_effectuer').appendChild(tache);
    } else {
        tache.classList.add('tache--accomplie');
        document.querySelector('.accomplies').appendChild(tache);
    }
}
    console.log("Exécution du programme comportement.js");

    document.querySelector("#recupObjet .bouton").addEventListener('click', recupererUnObjet);

    function recupererUnObjet() {
        // Tentative de récupération d'une donnée externe 
        const promesseRecupUnePersonne = axios.get('https://prodrigu.lpmiaw.univ-lr.fr/mineure-info-1/ajax/recupererUnePersAuHasard/');

        // Si la promesse est tenue, exécuter la fonction afficherPersonneAuHazard
        promesseRecupUnePersonne.then(afficherPersonneAuHasard);

        // Si la promesse n'est pas tenue, exécuter la fonction afficherErreurAjax
        promesseRecupUnePersonne.catch(afficherErreurAjax);
    }

    // Fonction de traitement de l'appel ajax à recupererUnePersAuHasard
    function afficherPersonneAuHasard(reponseAjax) {
        // le paramère reponseAjax contient à présent la réponse donnée par le serveur à l'appel Ajax.
        // Il faut donc placer ici les instructions permettant le traitement de cette donnée

        console.log("Réponse du serveur : " + reponseAjax.data.nom);
        document.getElementById("recupObjet").querySelector('.resultat').innerHTML = "Résultat: " + reponseAjax.data.nom;


    } //afficherPersonneAuHasard

    function afficherErreurAjax(erreur) {

    } //afficherErreurAjax

    document.querySelector("#recupTableau .bouton").addEventListener('click', recupererLesPersonnes);

    function recupererLesPersonnes(){
        const promesseRecupPersonnes = axios.get('https://prodrigu.lpmiaw.univ-lr.fr/mineure-info-1/ajax/recupererLesPers/');

        promesseRecupPersonnes.then(afficherPersonnes);

        promesseRecupPersonnes.catch(afficherErreurAjax);
    }

    function afficherPersonnes(reponseAjax){
        ul = document.createElement('ul');

        console.log("Réponse du serveur 2 : " + reponseAjax.data);
        for(let i = 0; i < Object.keys(reponseAjax.data).length; i++){
            li = document.createElement('li');
            li.innerHTML = reponseAjax.data[i].nom;
            ul.appendChild(li);
            //document.getElementById("recupTableau").innerHTML += reponseAjax.data[i].nom + " " + reponseAjax.data[i].prenom + "<br>";
        }
        document.getElementById("recupTableau").appendChild(ul);
        //document.getElementById("recupTableau").innerHTML = "Résultat: " + reponseAjax.data;
    }

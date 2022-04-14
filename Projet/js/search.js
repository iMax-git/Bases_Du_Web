const url_ArretdeBus = "https://opendata.agglo-larochelle.fr/api/records/2.0/downloadfile/format=json&resource_id=efc3e9e8-4c12-4aac-ba9d-fa1c93c2445c";
const url_emplacementVelo = "https://opendata.agglo-larochelle.fr/api/records/2.0/downloadfile/format=json&resource_id=1f124bea-d55f-457f-9eab-b7877d803435"

const liste = document.getElementById("info_liste").querySelector("ul");

const ArretDeBus = axios.get(url_ArretdeBus).then((response) => {
    var data = response.data;
    
    data.forEach(element => {
        ajouterBus(element.fields.stop_name,element.fields.stop_desc);
    });
    
});




function ajouterVelo(name,velo_dispo,velo_max){
    liste.innerHTML += '\
    <li>\
        <div class="icon">\
            <span class="material-icons">\
                pedal_bike\
            </span>     \
        </div>\
        <div class="info">\
            <p>Nom de la station: '+name+' </p>\
            <p>Velo disponible: '+velo_dispo+'/'+velo_max+'</p>\
        </div>\
    </li>\
    ';
}

function ajouterBus(name,desc){
    liste.innerHTML += '\
    <li>\
        <div class="icon">\
            <span class="material-icons">\
                bus\
            </span>     \
        </div>\
        <div class="info">\
            <p>Nom de l\'arret: '+name+' </p>\
            <p>Description: '+desc+'</p>\
        </div>\
    </li>\
    ';
}
const url_ArretdeBus = "https://opendata.agglo-larochelle.fr/api/records/2.0/downloadfile/format=json&resource_id=efc3e9e8-4c12-4aac-ba9d-fa1c93c2445c";
const url_ArretdeBus_Limited = "https://api.agglo-larochelle.fr/production/opendata/api/records/1.0/search/dataset=transport_yelo___gtfs_stop_des_bus&rows=600&facet=stop_id"
const url_emplacementVelo = "https://opendata.agglo-larochelle.fr/api/records/2.0/downloadfile/format=json&resource_id=1f124bea-d55f-457f-9eab-b7877d803435"

const liste = document.getElementById("info_liste").querySelector("ul");
const loading_screen = document.getElementById("loading_screen");
var bus_data = [];
var velo_data = [];

var bus_marker = [];
var velo_marker = [];
mapboxgl.accessToken = 'pk.eyJ1IjoiaW1heGxhcGluY2UiLCJhIjoiY2wxcWJhajl5MWo3aDNibzNwcXI2aGlrcyJ9.gR-uyStyPxznhXCo-DL7rA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-1.151139,46.160],
    zoom: 11,
});

var time = 1000

const API_LOADED_EVENT = new Event('api_loaded');
const LIST_LOADED_EVENT = new Event('list_loaded');
// const ArretDeBus = axios.get(url_ArretdeBus).then((response) => {
//     bus_data = response.data;
// });
const ArretDeBus = axios.get(url_ArretdeBus_Limited).then((response) => {
    bus_data = response.data.records;
});
const StationDeVelo = axios.get(url_emplacementVelo).then((response) => {
    velo_data = response.data;
});

    

async function Load() {
    await Promise.all([ArretDeBus, StationDeVelo]).then(() => {
        console.log(bus_data);
        console.log(velo_data);
        setTimeout(() =>{
            document.dispatchEvent(API_LOADED_EVENT);

        },5000)
    });
    
}

Load();

document.addEventListener('api_loaded', function(e) {
    console.log("api loaded");
    // console.log(bus_data);
    setTimeout(() =>{
        console.log("ajout des bus attente->",bus_data.length*10);
        bus_data.forEach(function(element){
            ajouterBus(element.fields.stop_name, element.fields.stop_desc, element.fields.stop_lon, element.fields.stop_lat);
        });
        document.dispatchEvent(LIST_LOADED_EVENT);
    },bus_data.length*10);
    setTimeout(() =>{
        console.log("ajout des velo attente->",velo_data.length*10);
        velo_data.forEach(function(element){
            ajouterVelo(element.fields.station_nom, element.fields.velos_disponibles, element.fields.nombre_emplacements, element.fields.station_longitude, element.fields.station_latitude);
        });
    },velo_data.length*10);


});

document.addEventListener('list_loaded', function(e) {

    initMap();
    addEventHandle();
    loading_screen.style.display = "none";
});


function ajouterVelo(name,velo_dispo,velo_max,longitude,latitude){
    liste.innerHTML += '\
    <li data-lon="'+longitude+'" data-lat="'+latitude+'" data-type="velo">\
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
    velo_marker.push({
        'type': 'Feature',
        'properties': {
            'description': name,
            "velos_disponibles": velo_dispo,
            "nombre_emplacements": velo_max,
            'icon': 'bicycle-share'
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [longitude, latitude]
        }
    })
}

function ajouterBus(name,desc, longitude, latitude){
    liste.innerHTML += '\
    <li data-lon="'+longitude+'" data-lat="'+latitude+'" data-type="bus">\
        <div class="icon">\
            <span class="material-icons">\
                directions_bus\
            </span>     \
        </div>\
        <div class="info">\
            <p>Nom de la station: '+name+' </p>\
            <p>Description: '+desc+'</p>\
        </div>\
    </li>\
    ';
    bus_marker.push({
        'type': 'Feature',
        'properties': {
            'nom': name,
            'description': desc,
            'icon': 'bus'
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [longitude, latitude]
        }
    })

}


function initMap(){
    
    // map.on("load", () => {
        map.addSource("bus", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features":bus_marker
            }
        });
        map.addSource("velo", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features":velo_marker
            }
        });
        map.addLayer({
            id: "bus",
            type: "symbol",
            source: "bus",
            layout: {
                "icon-image": "bus",
                "icon-size": 1.5,
                "icon-allow-overlap": true
            }
        });
        map.addLayer({
            id: "velo",
            type: "symbol",
            source: "velo",
            layout: {
                "icon-image": "bicycle-15",
                "icon-size": 1.5,
                "icon-allow-overlap": true
            }
        })

        map.on("click", 'bus', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            let description = ""
            if (e.features[0].properties.description === "") {
                description = "Arret de bus : "+ e.features[0].properties.nom +
                    "<br>" +
                    "Description:_''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' Aucune description" ;
            } else {
                description = "Arret de bus : " + e.features[0].properties.nom +
                    "<br>" +
                    "Description: " + e.features[0].properties.description;
            }
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        })

        map.on("click", 'velo', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = "Emplacement de velo" +
                "<br>" +
                "Description: " + e.features[0].properties.description +
                "<br>" +
                "Nombre de velo disponible: " + e.features[0].properties.velos_disponibles + " / " + e.features[0].properties.nombre_emplacements;


            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        })

        map.on('mouseenter', 'velo', () => {
            map.getCanvas().style.cursor = 'pointer';
        })

        map.on('mouseleave', 'velo', () => {
            map.getCanvas().style.cursor = '';
        })

        map.on('mouseenter', 'bus', () => {
            map.getCanvas().style.cursor = 'pointer';
        })

        map.on('mouseleave', 'bus', () => {
            map.getCanvas().style.cursor = '';
        })

    // });
}


function addEventHandle(){
    document.querySelectorAll('#info_liste ul li').forEach(function(element){
        element.addEventListener('click', function(){
            focus(element.dataset.lon,element.dataset.lat,element);
        })
    })
}

function focus(longitude, latitude,balise){
    map.jumpTo({
        center: [longitude, latitude],
        zoom: 17
    });
    document.querySelectorAll("li").forEach(function(element){
        element.classList.remove("selected");
    });

    balise.classList.add("selected");
    
}

document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();
    let form = document.getElementById("form");
    let input = document.getElementById("stop_name");
    let selector = document.getElementById("type");
    reset_filter();
    switch (selector.value) {
        case "":
            console.log("Any");
            reset_filter();
            break;
        default:
            console.log(selector.value);
            filter_selector(selector.value);
            break;
    }
    if (input.value != ""){
        filter(input.value);
    }

    
})

function reset_filter() {
    liste.querySelectorAll("li").forEach((e) =>{
        e.classList.remove("hidden");
    })
}


function filter(search){
    liste.querySelectorAll("li").forEach((element)=>{
        if(!(element.innerHTML.toLowerCase().includes(search.toLowerCase()))){
            element.classList.add("hidden");
        }
    })

}
function filter_selector(type){
    liste.querySelectorAll("li").forEach((element)=>{
        console.log(element.dataset.type == type);
        if(!(element.dataset.type == type)){
            element.classList.add("hidden");
        }
    })
}


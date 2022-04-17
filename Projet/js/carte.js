console.log('Exécution du programme carte.js');


mapboxgl.accessToken = 'pk.eyJ1IjoiaW1heGxhcGluY2UiLCJhIjoiY2wxcWJhajl5MWo3aDNibzNwcXI2aGlrcyJ9.gR-uyStyPxznhXCo-DL7rA';
const loading_screen = document.getElementById("loading_screen");
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-1.151139,46.160],
    zoom: 11,
});
points = []
velo = []
const url_ArretdeBus_Limited = "https://api.agglo-larochelle.fr/production/opendata/api/records/1.0/search/dataset=transport_yelo___gtfs_stop_des_bus&rows=600&facet=stop_id"
const url_ArretdeBus = "https://opendata.agglo-larochelle.fr/api/records/2.0/downloadfile/format=json&resource_id=efc3e9e8-4c12-4aac-ba9d-fa1c93c2445c";
const url_emplacementVelo = "https://opendata.agglo-larochelle.fr/api/records/2.0/downloadfile/format=json&resource_id=1f124bea-d55f-457f-9eab-b7877d803435"



const ArretDeBus = axios.get(url_ArretdeBus_Limited).then(
    function(response) {
        var data = response.data.records;
        console.log(data);
        points = [];
        data.forEach(function(element) {
            element = element.fields;
            points.push({
                'type': 'Feature',
                'properties': {
                    'nom': element.stop_name,
                    'description': element.stop_desc,
                    'icon': 'bus'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [element.stop_lon, element.stop_lat]
                }
            })
        });
        console.log(points);

        const EmplacementVelo = axios.get(url_emplacementVelo).then(
            function(response) {
                var data = response.data;
                console.log(data);
                velo = [];
                data.forEach(function(element) {
                    element = element.fields;
                    velo.push({
                        'type': 'Feature',
                        'properties': {
                            'description': element.station_nom,
                            "velos_disponibles": element.velos_disponibles,
                            "nombre_emplacements": element.nombre_emplacements,
                            'icon': 'bicycle-share'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [element.station_longitude, element.station_latitude]
                        }
                    })
                });
                console.log(velo);
                loadMap();
            }
        );

    }
);



function loadMap() {
    map.on('load', () => {
        map.addSource('places', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': points
            }
        });
        map.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
                'icon-image': '{icon}',
                'icon-allow-overlap': true
            }
        });
        map.on('click', 'places', (e) => {
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
        });

        map.on('mouseenter', 'places', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
        });

        map.addSource('velo', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': velo
            }
        });

        map.addLayer({
            'id': 'velo',
            'type': 'symbol',
            'source': 'velo',
            'layout': {
                'icon-image': '{icon}',
                'icon-allow-overlap': true
            }
        });

        map.on('click', 'velo', (e) => {
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
        });

        map.on('mouseenter', 'velo', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'velo', () => {
            map.getCanvas().style.cursor = '';
        });


    });

    loading_screen.style.display = "none";

}
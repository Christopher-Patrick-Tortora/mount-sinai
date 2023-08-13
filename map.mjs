import { statesData } from "./us-states.mjs";

const createMap =  async () => {
    let map = L.map('map').setView([37.8, -96], 4);

    let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    tiles.addTo(map);


    L.geoJson(statesData, {style: style}).addTo(map); 
}

const getColor = (aqi) => {
    return aqi === 1 ? '#fef0d9' :
           aqi === 2 ? '#fdcc8a' :
           aqi === 3  ? '#fc8d59' :
           aqi === 4  ? '#e34a33' :
           aqi === 5   ? '#b30000' :
                        '#FFEDA0';
}

const style = (feature) => {
    return {
        fillColor: getColor(feature.properties.aqi),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}


export { createMap }
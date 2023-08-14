import { statesData } from "./us-states.mjs";

const createMap = async () => {
    let map = L.map('map').setView([37.8, -96], 4);

    let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    tiles.addTo(map);

    L.geoJson(statesData, { style: style }).addTo(map);

    interaction(map);

    legend(map);

}

const getColor = (aqi) => {
    return aqi === 1 ? '#fef0d9' :
        aqi === 2 ? '#fdcc8a' :
            aqi === 3 ? '#fc8d59' :
                aqi === 4 ? '#e34a33' :
                    aqi === 5 ? '#b30000' :
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

const interaction = (map) => {
    let geojson;
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = 
        '<h4>US Air Pollution</h4>' 
        + (props ? 
        '<b>' + props.name + '</b><br />' 
        + `<p>Air Quality Index: ${props.aqi}</p>`
        + `<p>SO<sub>2</sub>: ${props.components.so2}</p>`
        + `<p>NO<sub>2</sub>: ${props.components.no2}</p>`
        + `<p>PM<sub>10</sub>: ${props.components.pm10}</p>`
        + `<p>PM<sub>2.5</sub>: ${props.components.pm2_5}</p>`
        + `<p>O<sub>3</sub>: ${props.components.o3}</p>`
        + `<p>CO: ${props.components.co}</p>`
        + `<p>NH<sub>3</sub>: ${props.components.nh3}</p>`
        + `<p>NO: ${props.components.no}</p>`
        : 'Hover over a state');
    };

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

        info.update(layer.feature.properties);
        console.log(layer.feature.properties)
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    info.addTo(map);
}

const legend = (map) => {
    var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5]

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + '<br>';
    }

    return div;
};

legend.addTo(map);
}


export { createMap }
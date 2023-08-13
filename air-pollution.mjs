import { token } from "./config.mjs";

const fetchAP = async (lat, long) => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + long + '&appid=' + token + '', { mode: 'cors' })
    const data = await response.json();
    const aqi = data.list
    return aqi

  }

const returnAQI = async (lat, long) => {
    const aqi = await fetchAP(lat, long);
    return aqi[0].main.aqi
}

const returnComponents = async (lat, long) => {
    const aqi = await fetchAP(lat, long);
    return aqi[0].components
}

export { returnAQI, returnComponents }
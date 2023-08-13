const fetchAP = async (lat, long) => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + long + '&appid=d551fec40b9480c7f0b06104a6cad798', { mode: 'cors' })
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
function useApi() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let humidityResult = 0 
            result.hourly.relative_humidity_2m.forEach(element => humidityResult += element)
            humidityResult = Math.round(humidityResult / result.hourly.relative_humidity_2m.length)

            let windSpeed = 0
            result.hourly.wind_speed_10m.forEach(element => windSpeed += element)
            windSpeed = Math.round(windSpeed / result.hourly.wind_speed_10m.length)

            document.querySelector('.temperature-of-city').textContent = `${Math.round(result.current.temperature_2m)} ${result.current_units.temperature_2m}` 
            document.querySelector('.max-temperature').textContent = Math.round(Math.max(...result.hourly.temperature_2m))
            document.querySelector('.lowest-temperature').textContent = Math.min(...result.hourly.temperature_2m) 
            document.querySelector('.feels-like').textContent = `${result.elevation} ${result.current_units.temperature_2m}`
            document.querySelector('.humidity').textContent = `${humidityResult} ${result.hourly_units.relative_humidity_2m}`
            document.querySelector('.ene-wind').textContent = `${windSpeed} ${result.hourly_units.wind_speed_10m}`

        })
        .catch((error) => console.error(error));
}

useApi()
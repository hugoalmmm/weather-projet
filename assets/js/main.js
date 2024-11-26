function useApi() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.hourly.temperature_2m)
            document.querySelector('.temperature-of-city').textContent = `${result.elevation} ${result.current_units.temperature_2m}` 
            document.querySelector('.max-temperature').textContent = Math.max(...result.hourly.temperature_2m)


        })
        .catch((error) => console.error(error));
}

useApi()
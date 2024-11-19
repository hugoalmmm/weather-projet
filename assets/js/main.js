function useApi() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            console.log(result.latitude)


        })
        .catch((error) => console.error(error));
}

useApi()
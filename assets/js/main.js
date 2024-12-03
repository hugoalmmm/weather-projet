function useApiLocation() {
  const input = document.querySelector('input')
  const header = document.querySelector('header')
  input.addEventListener('input', function () {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input.value}&apiKey=8cda840cac8b4d1ea0eda406ba5c6019`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        for (let i = 0; i < result.features.length; i++) {
          const divCity = document.createElement('div')
          divCity.classList.add('divCity')
          // divCity.addEventListener('click', () => useApiLocation(result.features[i].lon, result.features[i].lat), console.log('a'))
          divCity.addEventListener('click', function() {
            useApiWeather(result.features[i].lon, result.features[i].lat)
            console.log(useApiWeather)
          })
          const cityAuto = document.createElement('p')
          cityAuto.textContent = result.features[i].properties.city
          header.appendChild(divCity)
          divCity.appendChild(cityAuto)
        }
      })
      .catch(error => console.log('error', error));
  })
}
function useApiWeather(lon, lat) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}lat&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`, requestOptions)
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
      document.querySelector('.feel-like-number').textContent = `${result.elevation} ${result.current_units.temperature_2m}`
      document.querySelector('.humidity-number').textContent = `${humidityResult} ${result.hourly_units.relative_humidity_2m}`
      document.querySelector('.wind-number').textContent = `${windSpeed} ${result.hourly_units.wind_speed_10m}`
    })
}
useApiLocation()


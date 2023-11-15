window.addEventListener('load', () => {
  let longitude;
  let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const location = data.name;
          const temperature = Math.round(data.main.temp - 273.15);
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;

          document.getElementById('location').textContent = location;
          document.getElementById('temperature').textContent = temperature + '°C';
          document.getElementById('description').textContent = description;
          document.getElementById('icon').style.backgroundImage = `url(http://openweathermap.org/img/w/${icon}.png)`;
        });
    });
  } else {
    alert('Geolocation is not supported by your browser');
  }
});
const _temperatureValue = document.getElementById('temperature-value');
const _temperatureDescription = document.getElementById('temperature-description');
const _location = document.getElementById('location');
const _animatedIcon = document.getElementById('animated-icon');
const _windSpeed = document.getElementById('wind-speed');

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            getCityById(position.coords.latitude,position.coords.longitude);
        });
    }
});

function getCityById(latitud, longitud) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&lang=es&units=metric&appid=80ce93998ab5376be190ef8500e2cf8e`)

        .then(res => {
            return res.json();
        })
        .then(data => {

            let iconURL = `http://openweathermap.org/img/wn/${Object.values(data.weather)[0].icon}.png`;

            _temperatureValue.innerHTML = Math.round(data.main.temp);
            _temperatureDescription.innerHTML = Object.values(data.weather)[0].description;
            _location.innerHTML = data.name;
            // _animatedIcon.innerHTML = Object.values(data.weather)[0].icon;
            _animatedIcon.setAttribute('src', iconURL);
            _windSpeed.innerHTML = data.wind.speed;

            // document.write(data.sys.country + '<br>');

        })
        .catch(err => {
            console.log(err);
        })
}
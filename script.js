window.addEventListener('load', function() {

    var storage = localStorage.getItem('location');
    document.getElementById('location').placeholder = storage;
    checkLocation(storage);
});


function checkLocation(location = document.querySelector("#location").value) {
    let location_info = document.querySelector("#location_info");
    let temperature = document.querySelector("#temperature");
    let weather_type = document.querySelector("#weather-type");

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const apikey = "c8c88273a962db564d2b9888e60c598b";
    const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=${ location }&lang=pt_br&appid=${apikey}`;
    console.log(api);
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.cod != 404) {

                temperature.innerHTML = Math.round((data.main.temp) - 273) + '°C';
                weather_type.innerHTML = data.weather[0].description;
                location_info.innerHTML = data.name;

                localStorage.removeItem('location');
                localStorage.setItem('location', `${ location }`);


            } else {
                weather_type.innerHTML = 'Cidade não encontrada!';
            }
        });
}
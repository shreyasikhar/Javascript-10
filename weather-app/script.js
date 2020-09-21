const key = "2578b1e2ff8040952d157845bdf8b919";
const APIURL = "https://api.openweathermap.org/data/2.5/weather?q=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherByLocation(city) {
    const resp = await fetch(APIURL + city + "&appid=" + key);
    const respData = await resp.json();

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    // cleaning up main
    main.innerHTML = "";

    if(data) {
        const temp = KtoC(data.main.temp);
        

        const weather = document.createElement('div');
        weather.classList.add('weather');
        weather.innerHTML = `
            <h2>
                <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" alt=""/>
                &nbsp; ${temp}°C &nbsp;
                <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" alt=""/>
            </h2>
            <p>${data.weather[0].description}</p>
            <small>Humidity : ${data.main.humidity}%</small>
            <small>Pressure : ${data.main.pressure} hPa</small>
            <small>Wind Speed : ${(data.wind.speed * 1.60934).toFixed(2)} km/hr</small>
        `;
        main.appendChild(weather);
    }
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm) {
        getWeatherByLocation(searchTerm);
    }
    else {
        main.innerHTML = "";
        main.innerHTML = `<p class="msg">Not Found</p>`;
    }
});
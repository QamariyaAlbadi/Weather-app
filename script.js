const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {getWeather();});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim();

    const apiKey = "b74879d03adda29a17732b0f673d590c";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const condition = data.weather[0].main;
    const icon = data.weather[0].icon;
    const isNight = icon.includes("n");

    const weatherImage = document.getElementById("weather-image");
    
    if (condition === "Clear") {
        weatherImage.src = "images/clear.png";
    }

    else if (condition === "Rain") {
        weatherImage.src = "images/rain.png";
    }

    else if (condition === "Clouds") {
        weatherImage.src = "images/clouds.png";
    }

    else if (condition === "Snow") {
        weatherImage.src = "images/snow.png";
    }

    else if (condition === "Thunderstorm") {
        weatherImage.src = "images/thunderstorm.png";
    }

    else {
        weatherImage.src = "images/mist.png";
    }


    document.getElementById("city").innerText = data.name;
    document.getElementById("temperature").innerText = temperature;
    document.getElementById("weather-condition").innerText = condition;
    document.getElementById("wind-speed").innerText = windSpeed;

    updateBackground(condition, isNight);

}

window.addEventListener("load", getLocationWeather);
function getLocationWeather() { 
    navigator.geolocation.getCurrentPosition(async (position) => { 
        const lat = position.coords.latitude; 
        const lon = position.coords.longitude; 
        const apiKey = "b74879d03adda29a17732b0f673d590c"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; 
        const response = await fetch(url); 
        const data = await response.json(); 
        updateUI(data); 
    }); 
}


function updateBackground(condition, isNight) {

    const body = document.body;

    if (isNight) {
        // 🌙 NIGHT THEMES
        if (condition === "Clear") {
            body.style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
        }
        else if (condition === "Clouds") {
            body.style.background = "linear-gradient(to right, #232526, #414345)";
        }
        else if (condition === "Rain") {
            body.style.background = "linear-gradient(to right, #141e30, #243b55)";
        }
        else {
            body.style.background = "linear-gradient(to right, #141e30, #243b55)";
        }
    }

    else {
        // ☀️ DAY THEMES
        if (condition === "Clear") {
            body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
        }
        else if (condition === "Clouds") {
            body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        }
        else if (condition === "Rain") {
            body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
        }
        else if (condition === "Snow") {
            body.style.background = "linear-gradient(to right, #e6dada, #274046)";
        }
        else {
            body.style.background = "linear-gradient(to right, #74ebd5, #ACB6E5)";
        }
    }
}

function updateUI(data) {

    const city = data.name;
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const condition = data.weather[0].main;
    const icon = data.weather[0].icon;

    document.getElementById("city").innerText = city;
    document.getElementById("temperature").innerText = temperature;
    document.getElementById("weather-condition").innerText = condition;
    document.getElementById("wind-speed").innerText = windSpeed;

    const isNight = icon.includes("n");

    updateBackground(condition, isNight);

}


const apiKey = "44d5686adca5804b4770bb25a76260c8";
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

// 1. Initial Load
window.onload = () => refreshData("Regina");

// 2. Event Listeners (Button & Enter Key)
searchBtn.addEventListener('click', () => refreshData(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') refreshData(cityInput.value);
});

async function refreshData(city) {
    if (!city) return;
    document.getElementById('loading-text').classList.remove('hidden');
    
    await getWeather(city);
    await getForecast(city);
    
    document.getElementById('loading-text').classList.add('hidden');
}

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        document.getElementById('current-city').innerText = data.name;
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('condition').innerText = data.weather[0].main;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        updateBackground(data.weather[0].main);
    } catch (err) {
        alert("City not found!");
    }
}

async function getForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const list = document.getElementById('forecast-list');
    list.innerHTML = ""; // Clear old data

    // Get next 6 intervals
    data.list.slice(0, 6).forEach(item => {
        const time = new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;

        list.innerHTML += `
            <div class="forecast-item">
                <span>${time}</span>
                <img src="https://openweathermap.org/img/wn/${icon}.png" width="30">
                <span>${item.weather[0].main}</span>
                <b>${temp}°C</b>
            </div>`;
    });
}

function updateBackground(condition) {
    const body = document.getElementById('weather-bg');
    let color = "#f0f0f0"; // default

    if (condition.includes("Rain")) color = "#778899";
    else if (condition.includes("Clear")) color = "#87CEEB";
    else if (condition.includes("Clouds")) color = "#D3D3D3";
    else if (condition.includes("Snow")) color = "#F0F8FF";

    body.style.backgroundColor = color;
}

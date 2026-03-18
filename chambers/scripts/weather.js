document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4a304f6298ccb93ca85f7bf3a7af63a6';
    const city = 'Kampala';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=kampala&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=kampala&appid=${apiKey}&units=imperial`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('current-weather').innerHTML = `
                <p>${Math.round(data.main.temp)}°F</p>
                <p>${data.weather.map(event => capitalizeWords(event.description)).join(', ')}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            `;
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            let forecastHTML = '<p>3-Day Forecast:</p>';
            for (let i = 0; i < 3; i++) {
                const dayData = data.list[i * 8]; // 8 * 3 = 24 hours, i.e., next day at the same time
                forecastHTML += `
                    <p>${new Date(dayData.dt_txt).toLocaleDateString()}: ${Math.round(dayData.main.temp)}°F</p>
                `;
            }
            document.getElementById('weather-forecast').innerHTML = forecastHTML;
        });

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    document.getElementById('year').textContent = new Date().getFullYear();

    // Display last modified date in footer
    document.getElementById('last-modified').textContent = document.lastModified;
});

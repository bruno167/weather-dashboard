const apiKey = '7bf14ef63c41e9b526d937f74be80505';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp} °C`;
                document.getElementById('description').textContent = `Condição: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Umidade: ${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `Velocidade do Vento: ${data.wind.speed} m/s`;
            } else {
                alert('Cidade não encontrada.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

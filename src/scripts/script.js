const apiKey = '7bf14ef63c41e9b526d937f74be80505';
const apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather';
const units = 'metric';
const lang = 'pt_br';

// Evento do botão de busca por cidade manual
document.getElementById('searchBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    fetchWeatherDataByCity(city);
});

// Função para buscar clima por cidade
function fetchWeatherDataByCity(city) {
    fetch(`${apiUrlWeather}?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Erro:', error));
}

// Função para buscar clima por geolocalização automática
function fetchWeatherDataByCoords(lat, lon) {
    fetch(`${apiUrlWeather}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Erro:', error));
}

// Função para exibir dados do clima na interface
function displayWeatherData(data) {
    if (data.cod === 200) {
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp} °C`;
        document.getElementById('description').textContent = `Condição: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Umidade: ${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `Velocidade do Vento: ${data.wind.speed} m/s`;
    } else {
        alert('Localização/clima não encontrados.');
    }
}

// Função para obter a localização do navegador
function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherDataByCoords(latitude, longitude);
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
                alert('Não foi possível obter sua localização. Use a busca manual.');
            }
        );
    } else {
        alert('Geolocalização não é suportada pelo navegador.');
    }
}

// Chamar a geolocalização automática ao carregar a página
window.onload = getGeolocation;

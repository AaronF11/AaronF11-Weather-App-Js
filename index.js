// require("dotenv").config();
// console.log("Starting " + process.env.WEATHER_API_KEY)

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {    
    const API_KEY = 'feb0ff4ba0fa1d67207fc219c0674151';
    const city = document.querySelector('.search-box input').value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    if (city === '') {
        alert("Please, enter a valid location 😢")
        return;
    }
    
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'src/img/clear.png'
                    break;
                case 'Rain':
                    image.src = 'src/img/rain.png'
                    break;
                case 'Snow':
                    image.src = 'src/img/snow.png'
                    break;
                case 'Clouds':
                    image.src = 'src/img/cloud.png'
                    break;
                case 'Haze':
                    image.src = 'src/img/haze.png'
                    break;
                default:
                    image.src = ''
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => console.error('Error:', error));
});

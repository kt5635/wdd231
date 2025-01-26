// Weather API

// display current weather

const apiKey = '26e0ef7019866c2db3aaaa429f55dfc0';
const city = 'Saratoga Springs';  
const units = 'imperial';  


const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&cnt=24&appid=${apiKey}`;

// Fetch current weather data
async function fetchWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const weather = {
            temperature: data.main.temp,
            temperatureHigh: data.main.temp_max,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon, 
        };
        
        displayWeather(weather);
        fetchForecast();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const forecast = [];
        let lastDate = null;

        data.list.forEach(day => {
            const forecastDate = getDayOfWeek(day.dt * 1000);
            if (forecastDate !== lastDate) {
                forecast.push({
                    day: forecastDate,
                    temperature: day.main.temp,
                    description: day.weather[0].description,
                    icon: day.weather[0].icon,
                });
                lastDate = forecastDate;
            }

            if (forecast.length === 3) return;
        });
        
        displayForecast(forecast.slice(0, 3));
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

// display the current weather
function displayWeather(weather) {
    const weatherContainer = document.getElementById('current-weather');
    weatherContainer.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">
        <p>${weather.temperature}°F</p>
        <p>${weather.description}</p>
        <p>High: ${weather.temperatureHigh}°F</p>
        <p>Humidity: ${weather.humidity}%</p>
    `;
}

// display the 3-day weather forecast
function displayForecast(forecast) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = '';  

    forecast.forEach(day => {
        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <p>${day.day}:</p>
                <p>${day.temperature}°F</p>
                <p>Description: ${day.description}</p>
                <img src="http://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}">
            </div>
        `;
    });

}

// Shuffling member list cards

function shuffleArray(arr) {
    for (let i = arr.length -1; i> 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// creating member spotlight cards

function createSpotlightCards(members) {
    const membersList = document.getElementById('spotlight-cards');

    membersList.innerHTML = '';

    const limitedMembers = members.slice(0, 3);

    limitedMembers.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');

        let membershipText = '';
        if (member.membership === 2) {
            membershipText = 'Silver';
        }
        else if (member.membership === 3) {
            membershipText = 'Gold';
        }
    
        spotlightCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}'s image" class="member-image" loading="lazy" />
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${membershipText}            
        `;
        
        membersList.appendChild(spotlightCard);
    });

}

async function loadMembers() {
    const members = await fetchMemberData();

    const filteredMembers = members.filter(member => member.membership === 2 || member.membership ===3);

    if (filteredMembers.length > 0) {
        const shuffledMembers = shuffleArray(filteredMembers);
        createSpotlightCards(shuffledMembers);
    }

    else {
        console.log("No members with silver or Gold membership");
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchForecast();
    loadMembers();
});

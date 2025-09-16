// Hamburger

const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});


///////////////////////////////////////////////////////////////////////////////

// weather

const weatherContainer = document.querySelector('.weatherContainer');
const forecastContainer = document.querySelector('.forecastContainer');

const myKey = "54df925aaec9daef97bdedddf452b08f";
const myLat = 14.5995;
const myLong = 120.9842;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function fetchAPIs() {
    try {
        const weatherResponse = await fetch(weatherUrl);
        const forecastResponse = await fetch(forecastUrl);
        if (weatherResponse.ok && forecastResponse.ok) {
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
            console.log(weatherData); // testing only
            console.log(forecastData);
            displayWeather(weatherData); // uncomment when ready
            displayForecast(weatherData, forecastData);
        } else {
            throw new Error(`Weather API Error: ${weatherResponse.status}, Forecast API Error: ${forecastResponse.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

fetchAPIs();

function displayWeather(data) {
    const icon = document.createElement("img");
    const weatherInfo = document.createElement("div");
    const temp = document.createElement("h3");
    const desc = document.createElement("p");
    const high = document.createElement("p");
    const low = document.createElement("p");
    const humidity = document.createElement("p");
    const sunrise = document.createElement("p");
    const sunset = document.createElement("p");

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', desc);
    icon.setAttribute('width', 130);
    icon.setAttribute('height', 130);

    temp.textContent = `${Math.round(data.main.temp)}°C`;
    desc.textContent = capitalizeWords(data.weather[0].description);
    high.innerHTML = `<span>High:</span> ${Math.round(data.main.temp_max)}°C`;
    low.innerHTML = `<span>Low:</span> ${Math.round(data.main.temp_min)}°C`;
    humidity.innerHTML = `<span>Humidity</span>: ${data.main.humidity}%`;

    unixSunrise = data.sys.sunrise;
    unixSunset = data.sys.sunset;

    sunrise.innerHTML = `<span>Sunrise:</span> ${formatUnixTimestamp(unixSunrise)}`;
    sunset.innerHTML = `<span>Sunset:</span> ${formatUnixTimestamp(unixSunset)}`;

    weatherInfo.classList.add("weatherInfo");

    weatherInfo.appendChild(temp);
    weatherInfo.appendChild(desc);
    weatherInfo.appendChild(high);
    weatherInfo.appendChild(low);
    weatherInfo.appendChild(humidity);
    weatherInfo.appendChild(sunrise);
    weatherInfo.appendChild(sunset);

    weatherContainer.appendChild(icon);
    weatherContainer.appendChild(weatherInfo);
}

function displayForecast(weatherData, forecastData) {
    const today = document.createElement("p");
    const tomorrow = document.createElement("p");
    const dayAfter = document.createElement("p");

    const averageTemp = Math.round((weatherData.main.temp_max + weatherData.main.temp_min) / 2);
    today.innerHTML = `<span>Today:</span> ${averageTemp}°C`;

    tomorrow.innerHTML = `<span>Tomorrow:</span> ${Math.round(forecastData.list[12].main.temp)}°C`;
    dayAfter.innerHTML = `<span>Day After:</span> ${Math.round(forecastData.list[20].main.temp)}°C`;

    forecastContainer.appendChild(today);
    forecastContainer.appendChild(tomorrow);
    forecastContainer.appendChild(dayAfter);
}

function formatUnixTimestamp(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: "Asia/Manila" // Philippines Time
    });
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}


///////////////////////////////////////////////////////////////////////////////

// Spotlight

document.addEventListener('DOMContentLoaded', () => {
    loadSpotlights();
});

async function loadSpotlights() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) throw new Error('Could not load members.json');
        const members = await response.json();

        // Filter for Silver (2) and Gold (3) members
        const goldSilver = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        const selected = [];

        // Randomly select up to 3 unique members
        while (selected.length < 3 && goldSilver.length > 0) {
            const randIndex = Math.floor(Math.random() * goldSilver.length);
            selected.push(goldSilver.splice(randIndex, 1)[0]);
        }

        const container = document.querySelector('.spotlight-container');
        if (!container) return; // Exit if container is missing
        container.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            card.innerHTML = `
                <h3>${member.name}</h3>
                <h4>"${member.tagline}"</h4>
                <div class="member-info">
                    <section id="logo">
                        <img src="${member.image}" alt="${member.name} logo">
                    </section>
                    
                    <section id="info">
                        <p><b>Email: </b>${member.email}</p>
                        <p><b>Phone: </b>${member.phone}</p>
                        <p><b>URL: </b><a href="${member.website}">${member.website}</a></p>
                        <p class="membership"><b>Level: </b>${member.membershipLevel === 3 ? 'Gold' : 'Silver'} Member</p>
                    </section>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Spotlight error:', error);
        const container = document.querySelector('.spotlight-container');
        if (container) {
            container.innerHTML = "<p>Unable to load member spotlights at this time.</p>";
        }
    }
}


///////////////////////////////////////////////////////////////////////////////

// Hero Slideshow

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}


///////////////////////////////////////////////////////////////////////////////

// Footer

document.getElementById("currentyear").textContent =
    new Date().getFullYear();
document.getElementById(
    "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;

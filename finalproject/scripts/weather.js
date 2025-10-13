const API_KEY = "54df925aaec9daef97bdedddf452b08f";
const CITY_NAME = "Manila";
const UNITS = "metric"; // Celsius
const CURRENT_ELEMENT = document.querySelector('.weatherContainer');
const FORECAST_ELEMENT = document.querySelector('.forecastContainer');

async function fetchFearWeather() {
    if (!CURRENT_ELEMENT || !FORECAST_ELEMENT) {
        console.error("CRITICAL ERROR: One or both target HTML elements not found.");
        return;
    }

    // Set up minimum display time (5000ms = 5 seconds) for the glitch animation
    const minDisplayTimePromise = new Promise(resolve => setTimeout(resolve, 5000));

    try {
        // Display loading messages to start the glitch animation
        CURRENT_ELEMENT.innerHTML = '<p class="loading-message">[INITIATING DATA EXCHANGE: CURRENT STATUS...]</p>';
        FORECAST_ELEMENT.innerHTML = '<p class="loading-message">[FETCHING THREAT PROJECTION FILES...]</p>';

        // --- 1. Fetch Current Weather ---
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=${UNITS}&appid=${API_KEY}`;
        const currentFetchPromise = fetch(currentUrl).then(response => {
            if (!response.ok) throw new Error(`Current Status HTTP ${response.status}`);
            return response.json();
        });

        // --- 2. Fetch 3-Day Forecast ---
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&units=${UNITS}&appid=${API_KEY}`;
        const forecastFetchPromise = fetch(forecastUrl).then(response => {
            if (!response.ok) throw new Error(`Threat Projection HTTP ${response.status}`);
            return response.json();
        });

        // Wait for all data fetches AND the minimum display time to complete
        const [currentData, forecastData] = await Promise.all([
            currentFetchPromise,
            forecastFetchPromise,
            minDisplayTimePromise
        ]);

        // Process and display the data after the minimum time has elapsed
        const currentReport = generateCurrentWeatherReport(currentData);
        CURRENT_ELEMENT.innerHTML = `<div class="current-report">${currentReport}</pre>`;

        const forecastHtml = generateForecastReport(forecastData);
        FORECAST_ELEMENT.innerHTML = `<div class="forecast-grid">${forecastHtml}</div>`;

    } 
    
    catch (error) {
        const errorMessage = `[ERROR LOG: CONNECTION SEVERED] Could not retrieve data. Code: ${error.message}`;
        CURRENT_ELEMENT.innerHTML = `<p class="error-message">${errorMessage}</p>`;
        FORECAST_ELEMENT.innerHTML = '';
        console.error(`[ERROR LOG]: ${error.message}`);
    }
}


// Current Weather
function generateCurrentWeatherReport(weatherData) {
    const tempCelsius = weatherData.main.temp;
    const conditionMain = weatherData.weather[0].main;
    const windSpeedKmh = weatherData.wind.speed * 3.6;
    const windDirectionDeg = weatherData.wind.deg;

    // --- Status Message Mapping (Condition) ---
    let statusMessage;
    switch (conditionMain) {
        case 'Clear': statusMessage = "BASELINE DECEPTION: Absence of Anomalies is Itself a Warning."; break;
        case 'Clouds': statusMessage = "VISUAL OBFUSCATION: High Cloud Cover is Masking Airspace Scans."; break;
        case 'Rain': case 'Drizzle': statusMessage = "DATA CORRUPTION: High Bit Rate Instability Detected."; break;
        case 'Thunderstorm': statusMessage = "SYSTEM OVERRIDE: Extreme EMP Discharge Imminent. Seek Shelter."; break;
        case 'Snow': statusMessage = "THERMAL ANOMALY: Environment is Overcooling to Sub-Zero Degrees."; break;
        case 'Mist': case 'Fog': case 'Haze': statusMessage = "RENDER DISTANCE LOW: Entity Proximity Unverified. Visibility Below 5 Meters."; break;
        default: statusMessage = "STATUS UNKNOWN: Unforeseen Environmental Signature Detected. Proceed with Extreme Caution.";
    }

    // --- Temperature Warning Mapping ---
    let tempWarning;
    const roundedTemp = Math.round(tempCelsius);
    if (tempCelsius >= 30) {
        tempWarning = `CRITICAL: THERMAL RUNAWAY. System Core Overheating (${roundedTemp}°C). Prepare for Chaotic Failure.`;
    } 
    
    else if (tempCelsius >= 20) {
        tempWarning = `SYSTEM STABLE. Ambient Temperature is Sustained (${roundedTemp}°C). Threat Level Medium.`;
    } 
    
    else {
        tempWarning = `MILD CHILL. Environment is Conducive to Movement (${roundedTemp}°C). Use Caution.`;
    }

    // --- Wind Vector Mapping ---
    let windWarning;
    const direction = getCardinalDirection(windDirectionDeg);
    const speed = Math.round(windSpeedKmh);

    if (speed <= 5) {
        windWarning = "WIND SPEED NEGLIGIBLE. Infection Spread is Localized and Contained.";
    } 
    
    else if (speed <= 25) {
        windWarning = `VECTOR MILD. Anomalous Spread Confirmed to the ${direction} (${speed} km/h). Remain Indoors.`;
    } 
    
    else {
        windWarning = `DREAD HAZARD HIGH. Rapid Infection Expansion Confirmed to the ${direction} (${speed} km/h). Full System Lock Down.`;
    }

    // --- Final Report Assembly ---
    return `
<p>// LOCATION: ${weatherData.name.toUpperCase()}</p>
<p>// TIME STAMP: ${new Date().toLocaleTimeString()}</p>

<p>[FILE STATUS]: ${statusMessage}</p>

<p>[AMBIENT TEMP]: ${tempWarning}</p>

<p>[THREAT VECTOR]: ${windWarning}</p>

<p>// ACTION REQUIRED: MAINTAIN CIPHER KEYS (HIGH SECURITY PROTOCOL).</p>
`;
}


// Forecast 
function generateForecastReport(forecastData) {
    const dailyData = {};
    const htmlItems = [];

    // Filter the 3-hour data to get one entry per day (around noon)
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString();
        const hour = date.getHours();

        // Select the forecast closest to noon (10 AM to 2 PM) for consistency
        if (!dailyData[dayKey] && hour >= 10 && hour <= 14) {
            dailyData[dayKey] = item;
        }
    });

    const daysToProcess = Object.keys(dailyData).slice(0, 3);

    // Process the limited list of days
    daysToProcess.forEach(key => {
        const item = dailyData[key];
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        const conditionMain = item.weather[0].main;
        const temp = Math.round(item.main.temp);

        let projection;
        let icon;

        switch (conditionMain) {
            case 'Clear':
                projection = "UNSETTLING STILLNESS";
                icon = '👤';
                break;
            case 'Clouds':
                projection = "SHADOW ENTITY VISUALS";
                icon = '☁️';
                break;
            case 'Rain':
            case 'Drizzle':
                projection = "DATA CORRUPTION INITIATED";
                icon = '🌧️';
                break;
            case 'Thunderstorm':
                projection = "SYSTEM OVERRIDE INITIATED";
                icon = '⚡';
                break;
            case 'Snow':
                projection = "THERMAL ANOMALY EXTREME";
                icon = '❄️';
                break;
            case 'Mist':
            case 'Fog':
            case 'Haze':
                projection = "OPTICS FAIL: RENDER DISTANCE LOW";
                icon = '🌫️';
                break;
            default:
                projection = "ANOMALOUS UNKNOWN";
                icon = '❓';
        }

        htmlItems.push(`
                    <div class="forecast-item">
                        <p><strong>DAY: ${dayName}</strong> (${key.split('/').slice(0, 2).join('/')})</p>
                        <p class="emoji">${icon}</p>
                        <p><strong>ALERT:</strong> ${projection}</p>
                        <p><strong>TEMP:</strong> ${temp}°C</p>
                    </div>
                `);
    });

    // If less than 3 days were processed, show a warning
    if (htmlItems.length === 0) {
        return '<p class="error-message">WARNING: INSUFFICIENT DATA FOR THREAT PROJECTION. ARCHIVES INCOMPLETE.</p>';
    }

    return htmlItems.join('');
}


// --- Helper Function ---
function getCardinalDirection(deg) {
    if (deg === undefined) return 'UNKNOWN SECTOR';
    const directions = ['NORTH', 'NORTHEAST', 'EAST', 'SOUTHEAST', 'SOUTH', 'SOUTHWEST', 'WEST', 'NORTHWEST'];
    const index = Math.round(deg / 45) % 8;
    
    return directions[index];
}

document.addEventListener('DOMContentLoaded', fetchFearWeather);
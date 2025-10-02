const myKey = "54df925aaec9daef97bdedddf452b08f";
const city = "Manila";
const units = "metric";
const forecastSection = document.querySelector('section.forecast');

async function fetchAndDisplayFearForecast() {
    if (!forecastSection) {
        console.error("CRITICAL ERROR: Could not find HTML element with class 'forecast'.");
        return;
    }

    forecastSection.innerHTML = '<p class="loading-message">[INITIATING FETCH: TARGETING WEATHER DATA...]</p>';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${myKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`SYSTEM CRITICAL: HTTP Error ${response.status}. Access Denied or File Not Found.`);
        }

        const data = await response.json();

        // Generate the thematic report
        const fearForecast = generateFearForecast(data);

        forecastSection.innerHTML = `
            <div class="terminal-window">
                <pre class="fear-report">${fearForecast}</pre>
            </div>
        `;

    } catch (error) {
        forecastSection.innerHTML = `<p class="error-message">[ERROR LOG: CONNECTION SEVERED] Could not retrieve data. ${error.message}</p>`;
        console.error(`[ERROR LOG]: ${error.message}`);
    }
}

function generateFearForecast(weatherData) {
    const tempCelsius = weatherData.main.temp;
    const conditionMain = weatherData.weather[0].main;
    const windSpeedKmh = weatherData.wind.speed * 3.6;
    const windDirectionDeg = weatherData.wind.deg;

    // --- 1. Map Core Weather Condition ---
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

    // --- 2. Convert Temperature Warning ---
    let tempWarning;
    const roundedTemp = Math.round(tempCelsius);
    if (tempCelsius >= 30) {
        tempWarning = `CRITICAL: THERMAL RUNAWAY. System Core Overheating (${roundedTemp}°C). Prepare for Chaotic Failure.`;
    } else if (tempCelsius >= 20) {
        tempWarning = `SYSTEM STABLE. Ambient Temperature is Sustained (${roundedTemp}°C). Threat Level Medium.`;
    } else if (tempCelsius >= 10) {
        tempWarning = `MILD CHILL. Environment is Conducive to Movement (${roundedTemp}°C). Use Caution.`;
    } else {
        tempWarning = `DEEP FREEZE ALERT. A Chill That Penetrates the Bone (${roundedTemp}°C).`;
    }

    // --- 3. Interpret Wind Speed and Direction ---
    let windWarning;
    const direction = getCardinalDirection(windDirectionDeg);
    const speed = Math.round(windSpeedKmh);

    if (speed <= 5) {
        windWarning = "WIND SPEED NEGLIGIBLE. Infection Spread is Localized and Contained.";
    } else if (speed <= 25) {
        windWarning = `VECTOR MILD. Anomalous Spread Confirmed to the ${direction} (${speed} km/h). Remain Indoors.`;
    } else {
        windWarning = `DREAD HAZARD HIGH. Rapid Infection Expansion Confirmed to the ${direction} (${speed} km/h). Full System Lock Down.`;
    }

    // --- 4. Assemble the Final Report ---
    return `
---
[ENCRYPTED WARNING: HACKED WEATHER TERMINAL]

// LOCATION: ${weatherData.name.toUpperCase()}
// TIME STAMP: ${new Date().toLocaleTimeString()}

**FILE STATUS:** ${statusMessage}

**AMBIENT TEMP:** ${tempWarning}

**THREAT VECTOR:** ${windWarning}

// ACTION REQUIRED: INITIATE FULL SYSTEM REBOOT BEFORE MIDNIGHT.
---
`;
}

function getCardinalDirection(deg) {
    if (deg === undefined) return 'UNKNOWN SECTOR';
    const directions = ['NORTH', 'NORTHEAST', 'EAST', 'SOUTHEAST', 'SOUTH', 'SOUTHWEST', 'WEST', 'NORTHWEST'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
}

fetchAndDisplayFearForecast();
// Hamburger

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// Footer

document.getElementById("currentyear").textContent =
    new Date().getFullYear();
document.getElementById(
    "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;


// Review Cards
function toggleDossier(cardElement) {
    cardElement.classList.toggle('open');
}

let games = [];

async function init() {
    const listElement = document.getElementById('list');
    // Using existing custom class for loading message text
    listElement.innerHTML = '<p class="text-center">Loading classified data...</p>';

    try {
        // Fetch data from the external file path: data/games.json
        const response = await fetch('data/games.json');

        // Handle HTTP errors (e.g., 404 Not Found)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}. Please check if data/games.json exists.`);
        }

        // Parse the JSON data
        games = await response.json();

        // Render the cards once data is ready
        renderReviews();
    } catch (error) {
        console.error("Error fetching or initializing game data from data/games.json:", error);
        // Display error to the user
        listElement.innerHTML =
            '<p class="text-center">' +
            'ERROR: Could not load game data from data/games.json. Please ensure the file exists in the data/ folder and is valid JSON.' +
            '</p>';
    }
}

function renderReviews() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';

    games.forEach(game => {
        const clubEntryClass = `tier-${game.club_entry.toLowerCase()}`;

        const platformsList = game.platforms.map(p =>
            `<span class="platform-tag">${p}</span>`
        ).join(' ');

        const genresList = game.genres.map(g =>
            `<span class="genre-text">${g}</span>`
        ).join(' | ');

        let linkColor = '#ff0000'; // Default: Bright red
        if (game.club_entry === 'VAULT') {
            linkColor = '#ffff00'; // Yellow
        } else if (game.club_entry === 'INDEX') {
            linkColor = '#cccccc'; // Light gray for index links
        }

        let tierTagBg = '#B01124'; // Default: Deep red
        if (game.club_entry === 'VAULT') tierTagBg = '#ffff00'; // Yellow
        if (game.club_entry === 'CONFIG') tierTagBg = '#ff0000'; // Bright red
        if (game.club_entry === 'INDEX') tierTagBg = '#4A4A4A'; // Dark Gray (New)

        const imageUrl = game.image_url || `https://placehold.co/400x225/1A1A25/E6E6E6?text=IMAGE+MISSING`;

        const cardHTML = `
                    <div class="card ${clubEntryClass}">
                        
                        <div class="card-tab">
                            <span class="tier-label" style="background-color: ${tierTagBg}">${game.club_entry}</span>
                            <h2 class="text-base">${game.title}</h2>
                        </div>

                        <!-- Dossier Content (Hidden/Collapsed when closed) -->
                        <div class="card-content">
                            <div class="image-container">
                                <img src="${imageUrl}" alt="Game art for ${game.title}" class="game-image" onerror="this.onerror=null;this.src='https://placehold.co/400x225/1A1A25/E6E6E6?text=IMAGE+MISSING';">
                            </div>

                            <p class="desc-text">${game.description}</p>
                            <p class="genres">${genresList}</p>

                            <div class="meta-box">
                                <p><strong class="meta-label">Developer:</strong> ${game.developer}</p>
                                <p><strong class="meta-label">Release:</strong> ${game.release_date}</p>
                                <p><strong class="meta-label">Cost:</strong> <span class="${game.free_or_paid === 'Free' ? 'free-cost' : 'paid-cost'}">${game.free_or_paid}</span></p>
                                <div class="platform-wrapper">${platformsList}</div>
                            </div>

                            <div class="review_panel">
                                <h3 class="review-title" style="color:${linkColor}">File Review [LOG]</h3>
                                <p class="review-text">"${game.personal_review}"</p>
                            </div>
                            
                            <a href="${game.link_to_game}" target="_blank" class="link-action" style="color:${linkColor};">
                                >> Access Game Link
                            </a>
                        </div>

                    </div>
                `;
        listElement.innerHTML += cardHTML;
    });

    // Attach event listeners to cards after rendering
    const cards = listElement.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Prevent toggling when clicking the link
            if (e.target.closest('.link-action')) return;
            toggleDossier(card);
        });
    });
}

// Run the async initialization function when the page loads
document.addEventListener('DOMContentLoaded', init);
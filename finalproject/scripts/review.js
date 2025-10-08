function toggleDossier(cardElement) {
    cardElement.classList.toggle('open');
}

// Global variable to hold the game data
let games = [];

/**
 * Asynchronous initialization function. Fetches data from data/games.json.
 */
async function init() {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = '<p class="col-span-1 xl:col-span-3 text-center text-gray-500">Loading classified data...</p>';

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
        grid.innerHTML =
            '<p class="col-span-1 xl:col-span-3 text-center text-red-500 font-bold">' +
            'ERROR: Could not load game data from data/games.json. Please ensure the file exists in the data/ folder and is valid JSON.' +
            '</p>';
    }
}


/**
 * Renders the review cards based on the data in the 'games' array.
 */
function renderReviews() {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = ''; // Clear the loading/error message

    games.forEach(game => {
        const clubEntryClass = `tier-${game.club_entry.toLowerCase()}`;

        // Platforms list formatting
        const platformsList = game.platforms.map(p =>
            `<span class="bg-gray-700 text-xs px-2 py-0.5 rounded-full">${p}</span>`
        ).join(' ');

        // Genres list formatting
        const genresList = game.genres.map(g =>
            `<span class="text-gray-400 text-xs">${g}</span>`
        ).join(' | ');

        // Determine link color based on tier (using direct hex codes)
        let linkColor = '#ff0000'; // Default: --color-bright-red
        if (game.club_entry === 'VAULT') {
            linkColor = '#ffff00'; // --color-yellow
        }

        // Determine tier tag background (using direct hex codes)
        let tierTagBg = '#B01124'; // Default: --color-purge
        if (game.club_entry === 'VAULT') tierTagBg = '#ffff00'; // --color-vault
        if (game.club_entry === 'CONFIG') tierTagBg = '#ff0000'; // --color-config
        if (game.club_entry === 'INDEX') tierTagBg = '#ff0000'; // --color-index


        const cardHTML = `
                    <!-- The parent div that acts as the container and controls the open/closed state -->
                    <div class="dossier-card ${clubEntryClass}" onclick="toggleDossier(this)">
                        
                        <!-- File Tab (Always visible, absolute positioned over the top right) -->
                        <div class="dossier-tab">
                            <!-- Tier Tag and Title are now on the left -->
                            <span class="tier-tag" style="background-color: ${tierTagBg}">${game.club_entry}</span>
                            <h2 class="text-base font-bold">${game.title}</h2>
                        </div>

                        <!-- Dossier Content (Hidden/Collapsed when closed) -->
                        <div class="dossier-content">
                            <p class="description">${game.description}</p>
                            
                            <!-- Metadata -->
                            <div class="meta-text">
                                <p><strong class="text-gray-300">Developer:</strong> ${game.developer}</p>
                                <p><strong class="text-gray-300">Release:</strong> ${game.release_date}</p>
                                <p><strong class="text-gray-300">Cost:</strong> <span class="${game.free_or_paid === 'Free' ? 'text-green-400' : 'text-orange-400'}">${game.free_or_paid}</span></p>
                                <div class="flex flex-wrap gap-2 pt-2">${platformsList}</div>
                            </div>

                            <!-- Personal Review -->
                            <div class="review-box">
                                <h3 class="review-title" style="color:${linkColor}">File Review [LOG]</h3>
                                <p class="review-text">"${game.personal_review}"</p>
                            </div>
                            
                            <!-- Link -->
                            <a href="${game.link_to_game}" target="_blank" class="link"color:${linkColor};" onclick="event.stopPropagation();">
                                >> Access Game Link
                            </a>
                        </div>

                    </div>
                `;
        grid.innerHTML += cardHTML;
    });
}

// Run the async initialization function when the page loads
document.addEventListener('DOMContentLoaded', init);
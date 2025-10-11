import { youtubers } from '../data/youtubers.mjs';
import { platforms } from '../data/platforms.mjs';

function getRandomItems(arr, count = 3) {
    if (!arr || arr.length === 0) return [];

    const numToSelect = Math.min(count, arr.length);
    const shuffled = [...arr];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, numToSelect);
}

function renderSpotlight(containerId, title, items, isError = false) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`⚠️ Container with ID '${containerId}' not found.`);
        return;
    }

    let contentHTML = `<h3 class="section-title">${title}</h3><div class="spotlight-list">`;

    if (isError || !items || items.length === 0) {
        contentHTML += `<p class="item-desc text-red-500">
            ${isError ? 'Error loading data. Please check the console.' : 'No items available for this section.'}
        </p>`;
    } 
    
    else {
        items.forEach(item => {
            // Determine if the item has a special club tag (only for games)
            const tierTag = item.club_entry
                ? `<span class="tier-tag">${item.club_entry}</span>`
                : '';

            // Determine optional category or price
            const categoryText = item.category
                ? item.category
                : (item.price ? `Estimated Cost: ${item.price.split(';')[0]}` : '');

            // All images are in a single folder
            const imageUrl = item.image_url
                ? `images/${item.image_url}`
                : 'https://placehold.co/200x112/252535/FFFFFF?text=IMAGE+MISSING';

            // Main content structure
            contentHTML += `
                <div class="spotlight-item">
                    <img 
                        src="${imageUrl}" 
                        alt="${item.title || item.name}" 
                        class="item-image"
                        onerror="this.onerror=null;this.src='https://placehold.co/200x112/252535/FFFFFF?text=IMAGE+MISSING';"
                    >
                    <div class="content-area">
                        <h4 class="item-title">${item.title || item.name} ${tierTag}</h4>
                        <span class="item-category">${categoryText}</span>
                        <p class="item-desc">${item.description}</p>
                        <a href="${item.link || item.channel_link}" target="_blank" class="action-link">
                            >> View Details
                        </a>
                    </div>
                </div>
            `;
        });
    }

    contentHTML += `</div>`; // Close spotlight-list
    container.innerHTML = contentHTML;
}

async function animate() {
    let gamesData = [];

    // STEP 1: Load games.json
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        gamesData = await response.json();
        console.log("✅ Games data loaded successfully:", gamesData);
    } 
    
    catch (error) {
        console.error("❌ Could not load games data from games.json:", error);
        renderSpotlight('game-spotlight', 'Top 3 Games (VAULT & ELITE)', [], true);
        return;
    }

    // STEP 2: Filter for VAULT or ELITE
    const filteredGames = gamesData.filter(game =>
        game.club_entry === 'VAULT' || game.club_entry === 'ELITE'
    );

    // STEP 3: Randomize selections
    const spotlightGames = getRandomItems(filteredGames, 3);
    const spotlightYoutubers = getRandomItems(youtubers, 3);
    const spotlightPlatforms = getRandomItems(platforms, 3);

    // STEP 4: Render to sections
    renderSpotlight('game-spotlight', 'Top 3 Games (VAULT & ELITE)', spotlightGames);
    renderSpotlight('youtuber-spotlight', 'Top 3 Creator Channels', spotlightYoutubers);
    renderSpotlight('platform-spotlight', 'Top 3 Platforms for Horror', spotlightPlatforms);
}

document.addEventListener('DOMContentLoaded', animate);

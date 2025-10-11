import { youtubers } from '../data/youtubers.mjs';

function getRandomItems(arr, count = 3) {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function resolveImagePath(path) {
    if (!path) return 'https://placehold.co/200x112/252535/FFFFFF?text=IMAGE+MISSING';

    if (path.startsWith('images/') || path.startsWith('./images/')) {
        return path;
    }

    return `images/${path}`;
}

function renderSpotlight(containerId, title, items, isError = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let contentHTML = `<h3 class="section-title">${title}</h3><div class="spotlight-list">`;

    if (isError || !items || items.length === 0) {
        contentHTML += `<p class="item-desc">
            ${isError ? 'Error loading data. Please check the console.' : 'No items found.'}
        </p>`;
    } 
    
    else {
        items.forEach(item => {
            const imageUrl = resolveImagePath(item.image_url);

            console.log(`[DEBUG] Image path resolved for "${item.title || item.name}":`, imageUrl);

            const tierTag = item.club_entry
                ? `<span class="tier-tag">${item.club_entry}</span>`
                : '';

            const categoryText = item.category
                ? item.category
                : (item.price ? `Estimated Cost: ${item.price}` : '');

            const itemLink = item.link || item.channel_link || '#';
            const itemTitle = item.title || item.name || 'Untitled';

            const extraInfo = item.famous_horror_games_played
                ? `<p class="extra-info">Famous Games: ${item.famous_horror_games_played.join(', ')}</p>`
                : '';

            contentHTML += `
                <div class="spotlight-item">
                    <img 
                        src="${imageUrl}" 
                        alt="${itemTitle}" 
                        class="item-image"
                        onerror="this.onerror=null;this.src='https://placehold.co/200x112/252535/FFFFFF?text=IMAGE+MISSING';"
                    >
                    <div class="content-area">
                        <h4 class="item-title">${itemTitle} ${tierTag}</h4>
                        <span class="item-category">${categoryText}</span>
                        <p class="item-desc">${item.description || 'No description available.'}</p>
                        ${extraInfo}
                        <a href="${itemLink}" target="_blank" class="action-link">
                            >> View Details
                        </a>
                    </div>
                </div>
            `;
        });
    }

    contentHTML += `</div>`;
    container.innerHTML = contentHTML;
}

async function animate() {
    let gamesData = [];

    try {
        const response = await fetch('./data/games.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        gamesData = await response.json();
    } catch (error) {
        console.error("Could not load games data from games.json:", error);
        renderSpotlight('game-spotlight', 'Top 3 Games (VAULT & ELITE)', [], true);
        return;
    }

    const filteredGames = gamesData.filter(
        game => game.club_entry === 'VAULT' || game.club_entry === 'ELITE'
    );

    const spotlightGames = getRandomItems(filteredGames, 3);
    const spotlightYoutubers = getRandomItems(youtubers, 3);

    renderSpotlight('game-spotlight', 'Top 3 Horor Games (VAULT & ELITE)', spotlightGames);
    renderSpotlight('youtuber-spotlight', 'Top 3 Horror Youtubers', spotlightYoutubers);
}

document.addEventListener('DOMContentLoaded', animate);

// Review Cards

function toggleDossier(cardElement) {
    cardElement.classList.toggle('open');
}

let games = [];

async function init() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '<p class="text-center">Loading classified data...</p>';

    try {
        const response = await fetch('data/games.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        games = await response.json();
        renderReviews();
    } 
    
    catch (error) {
        console.error("Error fetching or initializing game data:", error);
        listElement.innerHTML =
            '<p class="text-center">ERROR: Could not load game data. Please ensure data/games.json exists and is valid.</p>';
    }
}

function renderReviews() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';

    const tierColors = {
        INDEX: {
            bg: "#D9D9D9",         // light gray
            text: "#0E0E0E",       // dark text
            border: "#9192a2ff",     // soft gray border
            glow: "#E6E6E988"
        },

        CONFIG: {
            bg: "#D2B55B",         // warm gold
            text: "#1C1B12",       // dark olive
            border: "#f7e1a1ff",
            glow: "#D2B55B99"
        },

        VAULT: {
            bg: "#FFB84C",         // amber
            text: "#1C1C1C",       // dark charcoal
            border: "#ffe4b1ff",
            glow: "#FFB84C99"
        },

        PURGE: {
            bg: "#B01124",         // blood red
            text: "#FFD6D6",       // light pink-white
            border: "#FF4655",
            glow: "#B0112499"
        }
    };

    games.forEach(game => {
        const clubEntry = game.club_entry.toUpperCase();
        const clubData = tierColors[clubEntry] || tierColors.PURGE;

        const clubEntryClass = `tier-${clubEntry.toLowerCase()}`;

        const platformsList = game.platforms.map(p =>
            `<span class="platform-tag">${p}</span>`
        ).join(' ');

        const genresList = game.genres.map(g =>
            `<span class="genre-text">${g}</span>`
        ).join(' | ');

        const imageUrl = game.image_url ||
            `https://placehold.co/400x225/1A1A25/E6E6E6?text=IMAGE+MISSING`;

        const cardHTML = `
            <div class="card ${clubEntryClass}">
                <div class="card-tab" 
                    style="background-color:${clubData.bg}; color:${clubData.text};">
                    
                    <span class="tier-label"
                        style="
                            background-color:${clubData.bg};
                            color:${clubData.text};
                            border:1.5px solid ${clubData.border};
                            box-shadow:0 0 12px ${clubData.glow};
                            padding:4px 10px;
                            border-radius:4px;
                            font-weight:700;
                            letter-spacing:1px;
                        ">
                        ${game.club_entry}
                    </span>
                    <h2 class="text-base">${game.title}</h2>
                </div>

                <div class="card-content">
                    <div class="image-container">
                        <img src="${imageUrl}" 
                            alt="Game art for ${game.title}" 
                            class="game-image"
                            onerror="this.onerror=null;this.src='https://placehold.co/400x225/1A1A25/E6E6E6?text=IMAGE+MISSING';">
                    </div>

                    <p class="desc-text">${game.description}</p>
                    <p class="genres">${genresList}</p>

                    <div class="meta-box">
                        <p><strong class="meta-label">Developer:</strong> ${game.developer}</p>
                        <p><strong class="meta-label">Release:</strong> ${game.release_date}</p>
                        <p><strong class="meta-label">Cost:</strong> 
                            <span class="${game.free_or_paid === 'Free' ? 'free-cost' : 'paid-cost'}">${game.free_or_paid}</span>
                        </p>
                        <div class="platform-wrapper">${platformsList}</div>
                    </div>

                    <div class="review_panel">
                        <h3 class="review-title" style="color:${clubData.bg}">File Review [LOG]</h3>
                        <p class="review-text">"${game.personal_review}"</p>
                    </div>
                    
                    <a href="${game.link_to_game}" target="_blank" class="link-action" style="color:${clubData.bg};">
                        >> Access Game Link
                    </a>
                </div>
            </div>
        `;

        listElement.innerHTML += cardHTML;
    });

    const cards = listElement.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.link-action')) return;
            toggleDossier(card);
        });
    });
}

document.addEventListener('DOMContentLoaded', init);

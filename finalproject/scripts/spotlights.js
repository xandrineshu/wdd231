import { youtubers } from "../data/youtubers.mjs";

function getRandomItems(arr, count = 5) {
    if (!arr || arr.length === 0) return [];
    const numToSelect = Math.min(count, arr.length);
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numToSelect);
}

const tierColors = {
    INDEX: "#D9D9D9",
    CONFIG: "#D2B55B",
    VAULT: "#FFB84C",
    PURGE: "#ff5e71ff"
};


function renderSpotlight(containerId, title, items, isError = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let contentHTML = `<h3 class="section-title">${title}</h3><div class="spotlight-list">`;

    if (isError || !items || items.length === 0) {
        contentHTML += `<p class="item-desc text-red-500">${isError
                ? "Error loading data. Please check the console."
                : "No eligible items found for this spotlight."
            }</p>`;
    } 
    
    else {
        items.forEach((item) => {
            // Ensure all images are read from "images/" folder
            let imageUrl = item.image_url
                ? item.image_url.startsWith("images/")
                    ? item.image_url
                    : `images/${item.image_url}`
                : "https://placehold.co/200x112/252535/FFFFFF?text=IMAGE+MISSING";

            const itemTitle = item.title || item.name || "Untitled";
            const itemLink = item.link || item.channel_link || "#";

            // Tier color logic
            let tierTag = "";
            if (item.club_entry) {
                const tier = item.club_entry.toUpperCase();
                const color = tierColors[tier] || "#999";
                tierTag = `<span class="tier-tag" 
                              style="
                                    padding: 2px 5px;
                                    border-radius: 5px;
                                    font-size: 1rem;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                    font-weight: bold;
                                    background-color:${color};
                                    color: black;
                                    margin-left: 5px;">
                              ${tier}
                           </span>`;
            }

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
                        <p class="item-desc">${item.description || "No description available."}</p>
                        <a href="${itemLink}" target="_blank" class="action-link">>> View Details</a>
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
        const response = await fetch("data/games.json");
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        gamesData = await response.json();
    } 
    
    catch (error) {
        console.error("Could not load games data from games.json:", error);
        renderSpotlight("game-spotlight", "Top Horror Games", [], true);
        
        return;
    }

    const filteredGames = gamesData.filter((game) =>
        ["CONFIG", "VAULT", "PURGE"].includes(game.club_entry?.toUpperCase())
    );

    const spotlightGames = getRandomItems(filteredGames, 5);
    const spotlightYoutubers = getRandomItems(youtubers, 5);

    renderSpotlight("game-spotlight", "> Top 5 Horror Games", spotlightGames);
    renderSpotlight("youtuber-spotlight", "> Top 5 Horror Gamers", spotlightYoutubers);
}

document.addEventListener("DOMContentLoaded", animate);

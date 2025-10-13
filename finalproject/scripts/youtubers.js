import { youtubers } from '../data/youtubers.mjs';

const showHere = document.querySelector("#allyoutubers");

function displayItems(youtubers) {
    youtubers.forEach(x => {
        const thecard = document.createElement('div');
        thecard.classList.add('platform_card');

        const thename = document.createElement('h2');
        thename.innerText = x.name;
        thecard.appendChild(thename);

        const thephoto = document.createElement('img');
        thephoto.src = `images/${x.image_url}`;
        thephoto.alt = `Image of ${x.title}`;
        thephoto.onerror = function () {
            this.src = `https://placehold.co/400x225/1A1A25/E6E6E6?text=IMAGE+MISSING`;
        };
        
        thecard.appendChild(thephoto);

        const thedesc = document.createElement('p');
        thedesc.innerText = x.description;
        thecard.appendChild(thedesc);

        const thegames = document.createElement('ul');
        thegames.innerText = `Popular Games Played: ${x.games_played}`;
        thecard.appendChild(thegames);

        const thelink = document.createElement('a');
        thelink.textContent = '// Visit Channel';
        thelink.href = x.channel_link;
        thelink.target = "_blank";
        thecard.appendChild(thelink);

        showHere.appendChild(thecard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (showHere) {
        displayItems(youtubers);
    } 
    
    else {
        console.error("Target element #allyoutubers not found.");
    }
});

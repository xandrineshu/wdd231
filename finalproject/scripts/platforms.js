import { platforms } from '../data/platforms.mjs';

const showHere = document.querySelector("#allplatforms");

function displayItems(platforms) {
    platforms.forEach(x => {
        const thecard = document.createElement('div');
        thecard.classList.add('platform_card');

        const thetitle = document.createElement('h2');
        thetitle.innerText = x.title;
        thecard.appendChild(thetitle);

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

        const theprice = document.createElement('span');
        theprice.innerText = `Estimated Cost: ${x.price}`;
        thecard.appendChild(theprice);

        const thelink = document.createElement('a');
        thelink.textContent = '// Visit Official Site';
        thelink.href = x.link;
        thelink.target = "_blank";
        thecard.appendChild(thelink);

        showHere.appendChild(thecard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (showHere) {
        displayItems(platforms);
    } 
    
    else {
        console.error("Target element #allplatforms not found.");
    }
});

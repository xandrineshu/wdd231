// Hamburger

const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});


// User Visit Info

function getDaysBetween(date1, date2) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInMs = Math.abs(date1 - date2);
    return Math.floor(diffInMs / millisecondsPerDay);
}

const messageDiv = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

let message = "";

if (!lastVisit) {
    message = " Welcome! Let us know if you have any questions. •ᴗ• ";
} 

else {
    const daysPassed = getDaysBetween(now, parseInt(lastVisit));

    if (daysPassed < 1) {
        message = " Back so soon! Awesome! ( ˶ˆᗜˆ˵ ) ";
    } 
    
    else if (daysPassed === 1) {
        message = " You last visited 1 day ago. (˶ᵔ ᵕ ᵔ˶) ";
    } 
    
    else {
        message = ` You last visited ${daysPassed} days ago. (..◜ᴗ◝..) `;
    }
}

messageDiv.textContent = message;
localStorage.setItem("lastVisit", now.toString());


// All places Cards

import {places} from '../data/places.mjs'
console.log(places)

const showHere = document.querySelector("#allplaces")

function displayItems(places) {
    places.forEach (x => {
        const thecard = document.createElement('div')

        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.photo_url}`
        thephoto.alt = x.name
        thecard.appendChild(thephoto)
        thephoto.setAttribute("loading", "lazy");

        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)

        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)

        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)

        const learnmore = document.createElement('button')
        learnmore.textContent = "Learn More"
        thecard.appendChild(learnmore)

        showHere.appendChild(thecard)
    })
}

displayItems (places)


// Footer

document.getElementById("currentyear").textContent =
    new Date().getFullYear();
document.getElementById(
    "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;


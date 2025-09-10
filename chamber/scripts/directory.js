// Hamburger

const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});


// Main

const membersContainer = document.getElementById("members-container");
const gridViewButton = document.getElementById("grid-view");
const listViewButton = document.getElementById("list-view");

let members = [];

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        members = await response.json();
        displayMembers(members, 'grid');  // Default to grid view
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members, viewType) {
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add('member', viewType);

        memberElement.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy" width="600" height="600">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>Membership Level: ${member.membershipLevel}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            `;

        membersContainer.appendChild(memberElement);
    });

    membersContainer.className = viewType === 'grid' ? 'grid-view' : 'list-view';
}

gridViewButton.addEventListener('click', () => {
    displayMembers(members, 'grid');
});

listViewButton.addEventListener('click', () => {
    displayMembers(members, 'list');
});

fetchMembers();


// Footer

document.getElementById("currentyear").textContent =
    new Date().getFullYear();
document.getElementById(
    "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;


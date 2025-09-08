
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const getProphetData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
};

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthdate.textContent = `Date Of Birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place Of Birth: ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Retrato de ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '240');
        portrait.setAttribute('height', '350');

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

getProphetData();
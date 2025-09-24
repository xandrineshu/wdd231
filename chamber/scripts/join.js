// Hamburger

const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});


///////////////////////////////////////////////////////////////////////////////

// Modals

const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

openButton0.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
    <h3>Non-Profit Member</h3>
    <p><strong>Elegibility: </strong>Non-Profit organizations only</p>
    <p><strong>Price: </strong>Free (for verified non-profit organizations)</p>
    <p><strong>Benefits: </strong></p>
    <ul>
        <li> Enhanced Credibility and Visibility </li>
        <li> Networking and Partnership Opportunities </li>
        <li> Advocacy and Government Relations </li>
        <li> Access to Resources and Training </li>
        <li> Quarterly Newsletters </li>
    </ul>
    `;
});

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
    <h3>Bronze Member</h3>
    <p><strong>Elegibility: </strong>Available to any type of organization</p>
    <p><strong>Price: </strong>1000₱ per year</p>
    <p><strong>Benefits: </strong></p>
    <ul>
        <li> Access to General Chamber Events and Meetings </li>
        <li> Opportunity to Post Job Openings </li>
        <li> Discounted Rates on Select Events and Training </li>
        <li> Use of the Chamber of Commerce Logo </li>
        <li> And have the benefits of a Non-Profit Level </li>
    </ul>
    `;
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
    <h3>Silver Member</h3>
    <p><strong>Elegibility: </strong>Available to any type of organization</p>
    <p><strong>Price: </strong>1500₱ per year</p>
    <p><strong>Benefits: </strong></p>
    <ul>
        <li> Increased Networking Opportunities </li>
        <li> Speaking and Content Opportunities </li>
        <li> 10% discount on event registrations </li>
        <li> Exclusive Access to Business Resources </li>
        <li> Advocacy and Committee Participation </li>
        <li> Spotlight in Chamber of Commerce Website </li>
        <li> And have the benefits of a Non-Profit Level & Bronze Level </li>
    </ul>
    `;
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
    <h3>Gold Member</h3>
    <p><strong>Elegibility: </strong>Available to any type of organization</p>
    <p><strong>Price: </strong>3000₱ per year</p>
    <p><strong>Benefits: </strong></p>
    <ul>

        <li> Access to High-Level Networking and Exclusive Events </li>
        <li> 4 free event tickets per year </li>
        <li> Speaking and Thought Leadership Opportunities </li>
        <li> Priority for Business Matching and Referrals </li>
        <li> Exclusive Advertising and Sponsorship Rights </li>
        <li> Direct Advocacy and Policy Participation </li>
        <li> Spotlight in Chamber of Commerce Website </li>
        <li> Exclusive invites to VIP events and galas </li>
        <li> And have the benefits of all membership levels </li>
    </ul>
    `;
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});

///////////////////////////////////////////////////////////////////////////////

// Footer

document.getElementById("currentyear").textContent =
    new Date().getFullYear();
document.getElementById(
    "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;

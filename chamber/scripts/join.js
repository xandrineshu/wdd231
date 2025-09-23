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


// Confirm Membership (Results)

const myInfo = new URLSearchParams(window.location.search);
// console.log(myInfo);

function setTimestamp() {
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();
    document.getElementById('timestamp').value = timestamp;
    console.log(timestamp);
    return true;
}

console.log(myInfo.get("firstName"));
console.log(myInfo.get("lastName"));
console.log(myInfo.get("email"));
console.log(myInfo.get("tel"));
console.log(myInfo.get("orgName"));
console.log(myInfo.get("membership"));
console.log(myInfo.get("timestamp"));

document.querySelector("#results").innerHTML = `
    <p><strong>${myInfo.get("firstName")} ${myInfo.get("lastName")}</strong>, Thank you for completing the application form for the
    Philippines Chamber of Commerce Membership, your application will be reviewed and you will be contacted shortly.</p>
    
    <h2><strong>Application details:</strong></h2>
    <p><strong>Business/Organization Name:</strong> ${myInfo.get("orgName")}</p>
    <p><strong>Email Address:</strong> ${myInfo.get("email")}</p>
    <p><strong>Phone Number:</strong> ${myInfo.get("tel")}</p>
    <p><strong>Membership Level Acquired:</strong> ${myInfo.get("membership")}</p>
    <p><strong>Application Submitted:</strong> ${myInfo.get("timestamp")}</p>

    <p>Our team will review your application and get back to you shortly.
    In the meantime, feel free to explore our page! ^^</p>
`;


///////////////////////////////////////////////////////////////////////////////

// Footer

document.getElementById("currentyear").textContent =
    new Date().getFullYear();
document.getElementById(
    "lastModified"
).textContent = `Last Modified: ${document.lastModified}`;

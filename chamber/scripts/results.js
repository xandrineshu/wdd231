// Confirm Membership (Results)

const myInfo = new URLSearchParams(window.location.search);

let timestamp = myInfo.get("timestamp");
if (!timestamp) {
    const currentDate = new Date();
    timestamp = currentDate.toLocaleString();
}

document.querySelector("#results").innerHTML = `
    <p>
        <strong>${myInfo.get("firstName") || ""} ${myInfo.get("lastName") || ""}</strong>, thank you for completing the application form for the
        Philippines Chamber of Commerce Membership! Your application will be reviewed and you will be contacted shortly through email.
        In the meantime, feel free to explore our page and what we offer! Have a good day 😊
    </p>
    
    <h2><strong>Application details:</strong></h2>
    <ul>
        <li><p><strong>Business/Organization Name:</strong> ${myInfo.get("orgName") || ""}</p></li>
        <li><p><strong>Email Address:</strong> ${myInfo.get("email") || ""}</p></li>
        <li><p><strong>Phone Number:</strong> ${myInfo.get("phone") || ""}</p></li>
        <li><p><strong>Membership Level Acquired:</strong> ${myInfo.get("membership") || ""}</p></li>
        <li><p><strong>Application Submitted:</strong> ${timestamp}</p></li>
`;

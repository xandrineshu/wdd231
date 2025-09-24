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

// console.log(myInfo.get("firstName"));
// console.log(myInfo.get("lastName"));
// console.log(myInfo.get("email"));
// console.log(myInfo.get("tel"));
// console.log(myInfo.get("orgName"));
// console.log(myInfo.get("membership"));
// console.log(myInfo.get("timestamp"));

document.querySelector("#results").innerHTML = `
    <p><strong>${myInfo.get("firstName")} ${myInfo.get("lastName")}</strong>, Thank you for completing the application form for the
    Philippines Chamber of Commerce Membership, your application will be reviewed and you will be contacted shortly.
    Our team will review your application and get back to you shortly. In the meantime, feel free to explore our page! ^^
    </p>
    
    <h2><strong>Application details:</strong></h2>
    <p><strong>Business/Organization Name:</strong> ${myInfo.get("orgName")}</p>
    <p><strong>Email Address:</strong> ${myInfo.get("email")}</p>
    <p><strong>Phone Number:</strong> ${myInfo.get("tel")}</p>
    <p><strong>Membership Level Acquired:</strong> ${myInfo.get("membership")}</p>
    <p><strong>Application Submitted:</strong> ${myInfo.get("timestamp")}</p>
`;

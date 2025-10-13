// Club Tier Details
const tierDetails = {
    INDEX: `
    Access to the Public Archive and community channels.<br><br>
    • Weekly Dossier Updates<br>
    • Voting in public polls<br>
    • Basic Encryption Key for public content
  `,
    CONFIG: `
    All INDEX benefits.<br><br>
    • Eligible for homepage Spotlight<br>
    • Access to Configuration Channels<br>
    • Monthly Resource Packets<br>
    • Submit theories/content for admin review
  `,
    VAULT: `
    All CONFIG benefits.<br><br>
    • Priority Spotlight<br>
    • Early Access to interviews<br>
    • Monthly Deep-Dive Dossiers<br>
    • Access to Vault Channel + event priority
  `,
    PURGE: `
    All VAULT benefits.<br><br>
    • Guaranteed Spotlight Rotation<br>
    • Exclusive Beta Testing Invites<br>
    • Access to Purge Protocol Channel<br>
    • Direct Admin Contact & Annual Physical Recognition
  `,
};


// === DIALOG HANDLING ===
const dialog = document.getElementById("tierDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDetails = document.getElementById("dialogDetails");
const closeDialog = document.getElementById("closeDialog");

document.querySelectorAll(".learn-more").forEach((btn) => {
    btn.addEventListener("click", () => {
        const tier = btn.closest(".tier-card").dataset.tier;
        dialogTitle.textContent = `${tier} DOSSIER`;
        dialogDetails.innerHTML = tierDetails[tier];
        dialog.showModal();
    });
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});


// === GLITCHY SLIDE-IN SEQUENCE ===
window.addEventListener("load", () => {
    const cards = document.querySelectorAll(".tier-card");
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add("show");
        }, i * 500);
    });
});


// === THANK YOU HTML ===
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('clubForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // prevent page refresh

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const nickname = document.getElementById('nickname').value.trim();

        // Use nickname if provided, else first + last, else first
        const displayName = nickname || (firstName + (lastName ? " " + lastName : "")) || firstName;

        // Store in localStorage
        localStorage.setItem('username', displayName);

        // Redirect to thank you page
        window.location.href = "thankyou.html";
    });
});

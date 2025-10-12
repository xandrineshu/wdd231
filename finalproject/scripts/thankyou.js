window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("name") || "Applicant";
    const nameElement = document.getElementById("username");
    nameElement.textContent = username;
    nameElement.setAttribute("data-text", username);
});

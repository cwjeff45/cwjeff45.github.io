window.addEventListener("DOMContentLoaded", () => {
    const encoded = "Y29tcGxldGU="; // base64 for "complete"
    const decoded = atob(encoded);

    const secretEl = document.getElementById("secretCode");
    const defaultSpan = secretEl.querySelector(".default-text");

    defaultSpan.textContent = decoded;
    secretEl.style.display = "block";
});

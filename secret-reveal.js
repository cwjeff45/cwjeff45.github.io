window.addEventListener("DOMContentLoaded", () => {
    const encoded = "Q29kZTogVU5JVFk=";
    const decoded = atob(encoded);

    const secretEl = document.getElementById("secretCode");
    secretEl.textContent = decoded;
    secretEl.style.display = "block";
});
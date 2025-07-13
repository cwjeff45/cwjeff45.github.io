let animationInterval;
let matrixEnabled = false;

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

const chars = "アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*";
const matrix = chars.split("");
const fontSize = 16;
let columns;
let drops = [];

// Resize canvas to match full page height
function resizeCanvasToFullPage() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
    );

    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}

resizeCanvasToFullPage();
window.addEventListener("resize", resizeCanvasToFullPage);

// Matrix draw function
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px Consolas";

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Toggle Matrix effect on button click
const toggleBtn = document.getElementById("toggleMatrix");
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        matrixEnabled = !matrixEnabled;

        if (matrixEnabled) {
            canvas.style.display = "block";
            resizeCanvasToFullPage(); // Ensure correct size
            animationInterval = setInterval(drawMatrix, 33);
        } else {
            clearInterval(animationInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = "none";
        }
    });
}

// Secret code check
function checkCode() {
    const input = document.getElementById("secretInput").value.trim().toLowerCase();

    const encoded = "dW5pdHk=";
    const secretCode = atob(encoded)

    if (input === secretCode) {
        window.location.href = "final-error.html";
    } else {
        document.getElementById("errorMessage").textContent =
            "Check out PYPZL to see what this box is all about...";
    }
}

// Expose checkCode globally (if needed inline in HTML)
window.checkCode = checkCode;

// Ensure Matrix is hidden on initial load
canvas.style.display = "none";

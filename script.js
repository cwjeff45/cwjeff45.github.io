// ==========================
// Matrix Logic (safe wrapper)
// ==========================
const canvas = document.getElementById("matrixCanvas");
let ctx = null;

if (canvas) {
  ctx = canvas.getContext("2d");

  const chars = "アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*";
  const matrix = chars.split("");
  const fontSize = 16;
  let columns;
  let drops = [];
  let animationInterval;
  let matrixEnabled = false;

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

  resizeCanvasToFullPage();
  window.addEventListener("resize", resizeCanvasToFullPage);

  const toggleMatrix = document.getElementById("toggleMatrix");
  if (toggleMatrix) {
    toggleMatrix.addEventListener("click", () => {
      matrixEnabled = !matrixEnabled;
      if (matrixEnabled) {
        canvas.style.display = "block";
        resizeCanvasToFullPage();
        animationInterval = setInterval(drawMatrix, 33);
      } else {
        clearInterval(animationInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
      }
    });
  }

  canvas.style.display = "none";
}

// ==========================
// Theme Toggle Logic
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleThemeBtn = document.getElementById("toggle-theme");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
  }

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      const theme = body.classList.contains("light-mode") ? "light" : "dark";
      localStorage.setItem("theme", theme);
    });
  }
});

// ==========================
// Secret Code Logic
// ==========================
function checkCode() {
  const input = document.getElementById("secretInput")?.value.trim().toLowerCase();
  const encoded = "dW5pdHk=";
  const secretCode = atob(encoded);

  if (input === secretCode) {
    window.location.href = "final-error.html";
  } else {
    const errorEl = document.getElementById("errorMessage");
    if (errorEl) {
      errorEl.textContent = "Check out PYPZL to see what this box is all about...";
    }
  }
}

window.checkCode = checkCode;


// =============================
// Easter Egg Check Code
// =============================

const correctCode = "6327"

function checkSubmit() {
  const input = document.getElementById("code-input").value;
  if (input === correctCode) {
    localStorage.setItem("matrixUnlocked", "true");
    localStorage.setItem("matrixAlertShown", "false");
    unlockMatrix();
    alert("Matrix Mode Unlocked!");
    localStorage.setItem("matrixAlertShown", "true");
  } else {
    alert("Incorrect code. Try again!")
  }
}

function unlockMatrix() {
  const clueBox = document.getElementById("clue-box");
  const matrixBtn = document.getElementById("toggleMatrix");

  if (clueBox) {
    clueBox.style.display = "none";
  }

  if (matrixBtn) {
    matrixBtn.style.display = "inline-block";
  }
}

function activateMatrix() {
  // alert("Matrix Mode Unlocked!");
  localStorage.setItem("matrixAlertShown", "true");

  if (!alreadyAlerted) {
    alert("Matrix Mode Unlocked!");
    localStorage.setItem("matrixAlertShown", "true");
  }

  const toggleMatrix = document.getElementById("toggle-matrix");
  if (toggleMatrix) toggleMatrix.click();
}

window.onload = () => {
  if (localStorage.getItem("matrixUnlocked") === "true") {
    unlockMatrix();
  } else {
    const toggleMatrixBtn = document.getElementById("toggleMatrix");
    if (toggleMatrixBtn) toggleMatrixBtn.style.display = "none";
  }
};

// Typing Effect
function typeTextOnce(elementId, text, speed = 30) {
  let i = 0;
  const el = document.getElementById(elementId);

  const cleanText = text.replace(/\s*\n\s*/g, " ");

  function typeChar() {
    if (i < cleanText.length) {
      el.textContent += cleanText.charAt(i);
      i ++;
      setTimeout(typeChar, speed);
    }
    if (i >= cleanText.length) {
      el.innerHTML += '<span class="cursor">▌</span>';
    }
  }

  if (localStorage.getItem("summaryTyped") === "true") {
    el.textContent = cleanText; 
  } else {
    el.textContent = "";
    typeChar();
    localStorage.setItem("summaryTyped", "true");
  }
}
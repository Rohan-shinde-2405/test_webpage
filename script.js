const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");
const hint = document.getElementById("hint");

// Messages for the "No" button (like the IG reel)
const messages = [
  "No",
  "Are you sure?",
  "Really sure??",
  "Think again 😭",
  "Don't do this to me…",
  "I'll be very very sad…",
  "Okay last chance 🥺",
  "You're breaking my heart 💔",
  "Pls pls pls 😭",
];

let msgIndex = 0;
let yesScale = 1;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function moveNoButton() {
  const areaRect = btnArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // keep it inside the area
  const pad = 6;
  const maxX = areaRect.width - btnRect.width - pad;
  const maxY = areaRect.height - btnRect.height - pad;

  const x = Math.random() * clamp(maxX, 0, maxX);
  const y = Math.random() * clamp(maxY, 0, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function updateNoMessage() {
  msgIndex = (msgIndex + 1) % messages.length;
  noBtn.textContent = messages[msgIndex];

  // change helper text too (like the red tooltip in the reel)
  if (msgIndex >= 4) {
    hint.textContent = "If you say no, I will be really sad…";
  } else {
    hint.textContent = "Please say yes 😭";
  }
}

noBtn.addEventListener("mouseenter", () => {
  moveNoButton();
});

noBtn.addEventListener("click", () => {
  updateNoMessage();
  moveNoButton();

  // Make YES bigger each time they try NO
  yesScale = clamp(yesScale + 0.18, 1, 3.2);
  yesBtn.style.transform = `scale(${yesScale})`;

  // Make NO slightly smaller for extra "inevitable yes" effect
  const noScale = clamp(1.05 - msgIndex * 0.06, 0.55, 1.05);
  noBtn.style.transform = `scale(${noScale})`;
});

yesBtn.addEventListener("click", () => {
  // Go to yes page
  window.location.href = "yes.html";
});

// initial position so it doesn't overlap on some screens
moveNoButton();
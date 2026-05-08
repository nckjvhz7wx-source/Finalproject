"use strict";

/* =========================
   DOM QUERIES 
   ========================= */
let body = document.querySelector("body");
let navLinks = document.querySelectorAll("nav a");
let sections = document.querySelectorAll("main section");
let main = document.querySelector("main");

/* =========================
   STATE VARIABLES
   ========================= */
let darkMode = false;
let highlightIndex = 0;

/* =========================
   BUTTONS
   ========================= */
let darkButton;
let highlightButton;
let quizButton;

/* =========================
   INIT
   ========================= */
window.addEventListener("DOMContentLoaded", function () {

  /* DARK MODE BUTTON */
  darkButton = document.createElement("button");
  darkButton.textContent = "Dark Mode 🌙";
  styleButton(darkButton, 20);
  darkButton.addEventListener("click", toggleDarkMode);
  document.body.appendChild(darkButton);

  /* HIGHLIGHT BUTTON */
  highlightButton = document.createElement("button");
  highlightButton.textContent = "Highlight Sections ✨";
  styleButton(highlightButton, 70);
  highlightButton.addEventListener("click", highlightSections);
  document.body.appendChild(highlightButton);

  /* QUIZ BUTTON */
  quizButton = document.createElement("button");
  quizButton.textContent = "Quiz 🧠";
  styleButton(quizButton, 120);
  quizButton.addEventListener("click", showQuiz);
  document.body.appendChild(quizButton);
});

/* =========================
   BUTTON STYLE FUNCTION
   ========================= */
function styleButton(btn, bottomOffset) {
  btn.style.position = "fixed";
  btn.style.right = "20px";
  btn.style.bottom = bottomOffset + "px";
  btn.style.padding = "10px 15px";
  btn.style.borderRadius = "8px";
  btn.style.cursor = "pointer";
}

/* =========================
   DARK MODE FUNCTION
   ========================= */
function toggleDarkMode() {
  darkMode = !darkMode;
  body.classList.toggle("dark-mode");

  navLinks.forEach(link => {
    link.style.color = darkMode ? "#ffcc00" : "";
  });
}

/* =========================
   HIGHLIGHT FUNCTION
   ========================= */
function highlightSections() {
  // remove previous focus
  sections.forEach(sec => {
    sec.style.opacity = "0.3";
    sec.style.outline = "none";
  });

  // highlight current section
  sections[highlightIndex].style.opacity = "1";
  sections[highlightIndex].style.outline = "3px solid #ffcc00";
  sections[highlightIndex].scrollIntoView({ behavior: "smooth", block: "center" });

  // move to next
  highlightIndex++;

  if (highlightIndex >= sections.length) {
    highlightIndex = 0;

    // reset everything after full cycle
    sections.forEach(sec => {
      sec.style.opacity = "1";
      sec.style.outline = "none";
    });
  }
}

/* =========================
   QUIZ FUNCTION
   ========================= */
function showQuiz() {
  let score = 0;

  let q1 = prompt(
    "Quiz 1/3:\n\nWhich cytoskeleton structure is responsible for cell movement and contains actin?\n\nA) Microtubules\nB) Microfilaments\nC) Intermediate filaments"
  );

  if (q1 === "B" || q1 === "b") {
    score++;
  }

  let q2 = prompt(
    "Quiz 2/3:\n\nWhich structure acts like internal ‘highways’ for transporting vesicles?\n\nA) Microtubules\nB) Microfilaments\nC) Focal adhesions"
  );

  if (q2 === "A" || q2 === "a") {
    score++;
  }

  let q3 = prompt(
    "Quiz 3/3:\n\nWhich structure provides strong tensile strength and resists stretching?\n\nA) Microtubules\nB) Intermediate filaments\nC) Actin cortex"
  );

  if (q3 === "B" || q3 === "b") {
    score++;
  }

  let message = "";

  if (score === 3) {
    message = "Perfect! 🧠✨ You got 3/3 correct!";
  } else if (score === 2) {
    message = "Good job! 👍 You got " + score + "/3 correct.";
  } else {
    message = "Keep studying 💪 You got " + score + "/3. Try again!";
  }

  main.innerHTML = `
    <h2>Quiz Result</h2>
    <p>${message}</p>
  `;
}
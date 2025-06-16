let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");
let currentInput = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.value = "";
    } else if (value === "=") {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch {
        display.value = "Error";
        currentInput = "";
      }
    } else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Keyboard input support
document.addEventListener("keydown", (e) => {
  const validKeys = "0123456789+-*/().";

  if (validKeys.includes(e.key)) {
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === "Enter") {
    try {
      currentInput = eval(currentInput).toString();
      display.value = currentInput;
    } catch {
      display.value = "Error";
      currentInput = "";
    }
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key.toLowerCase() === "c") {
    currentInput = "";
    display.value = "";
  }
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
});

window.addEventListener('DOMContentLoaded', () => {
  body.classList.add('light'); // Default to light mode
});
let canvas;
let world;
let keyboard = new KeyboardObject();

/**
 * Initializes the game.
 */
function init() {
  canvas = document.querySelector("canvas");
  world = new WorldObject(canvas, keyboard, level1);
  keyboard.activateButton("c_jump", "pushSpace");
  keyboard.activateButton("c_throw", "throwBottle");
  keyboard.activateButton("c_left", "moveLeft");
  keyboard.activateButton("c_right", "moveRight");
}

/**
 * Starts the game or prepares it for a restart based on the current state.
 */
function startGame() {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    console.log(
      `Klick auf Start/Restart. Aktueller Zustand: gameIsRunning = ${world.gameIsRunning}, isVisible = ${world.startScreen.isVisible}`
    );
    const gameEnded =
      localStorage.getItem("gameWon") === "true" ||
      localStorage.getItem("gameOver") === "true";
    if (!world.gameIsRunning && !gameEnded) {
      console.log("Spiel wird gestartet.");
      world.gameIsRunning = true;
      world.startScreen.isVisible = false;
      localStorage.setItem("gameIsRunning", "true");
    } else {
      console.log("Spiel wird für Neustart vorbereitet.");
      world.gameIsRunning = false;
      world.startScreen.isVisible = true;
      localStorage.setItem("gameIsRunning", "false");
      localStorage.setItem("gameWon", "false");
      localStorage.setItem("gameOver", "false");
      setTimeout(() => location.reload(), 10);
    }
  });
}

/**
 * Initializes the game based on the 'gameIsRunning' flag stored in localStorage.
 */
function initializeGame() {
  const gameIsRunning = localStorage.getItem("gameIsRunning") === "true";
  world.gameIsRunning = gameIsRunning;
  world.startScreen.isVisible = !gameIsRunning;
}

/**
 * Triggers the game over logic and updates the relevant flags.
 */
function triggerGameOver() {
  console.log("Spiel ist vorbei (Game Over).");
  world.gameOverTriggered = true;
  localStorage.setItem("gameIsRunning", "false");
  localStorage.setItem("gameOverTriggered", "true");
}

/**
 * Triggers the win logic and updates the relevant flags.
 */
function triggerWin() {
  world.gameWon = true;
  world.gameIsRunning = false;
  localStorage.setItem("gameIsRunning", "false");
  localStorage.setItem("gameWon", "true");
}

/**
 * Toggles the game sounds on or off.
 */
function muteSounds() {
  const muteButton = document.getElementById("muteButton");
  const muteIcon = document.getElementById("mute_icon");
  if (muteButton) {
    muteButton.addEventListener("click", () => {
      const isMuted = !SoundManager.sounds[0]?.muted;
      SoundManager.toggleMute(isMuted);
      muteIcon.innerText = isMuted ? "volume_off" : "volume_up";
    });
  }
}

/**
 * Toggles the display of the information screen.
 */
function infoScreen() {
  const infoButton = document.getElementById("info");
  const infoScreen = document.getElementById("infoScreen");
  infoScreen.style.display = "none";
  infoButton.addEventListener("click", () => {
    infoScreen.style.display =
      infoScreen.style.display === "none" ? "block" : "none";
  });
  const closeInfoScreen = document.getElementById("close-info-screen");
  closeInfoScreen.addEventListener("click", () => {
    infoScreen.style.display = "none";
  });
}

/**
 * Enables or disables fullscreen mode for the game container.
 */
function fullscreen() {
  let gameContainer = document.getElementById("fullscreen");
  let fullscreenButton = document.getElementById("fullscreenButton");
  fullscreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      gameContainer.requestFullscreen().catch((err) => {
        alert(
          `Fehler beim Versuch, in den Vollbildmodus zu wechseln: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen();
    }
  });
  document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
      document.body.classList.add("fullscreen-active");
    } else {
      document.body.classList.remove("fullscreen-active");
    }
  });
}

/**
 * Handles keyboard actions for the game.
 */
function keybordActions() {
  document.addEventListener("keydown", (event) => {
    keyboard.handleKeyDown(event);
  });
  document.addEventListener("keyup", (event) => {
    keyboard.handleKeyUp(event);
  });
}

/**
 * Checks if the device is a mobile device.
 * @returns {boolean} True if the device is a mobile device, false otherwise.
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Adjusts the display based on whether the device is mobile or not.
 */
function adjustForMobileDevices() {
  let mobileBtn = document.querySelector(".button-area-below");
  if (isMobileDevice()) {
    mobileBtn.style.display = "flex";
  } else {
    mobileBtn.style.display = "none";
  }
}

/**
 * Checks the screen size and displays a modal with a message if the screen size is not suitable for the game.
 */
function checkScreenSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const modal = document.getElementById("modal");
  const message = document.getElementById("modal-message");
  if (width < 740) {
    message.textContent =
      "Unfortunately your device is not suitable. Use a device with a width of at least 740 pixels.";
    modal.style.display = "flex";
  } else if (height > width) {
    message.textContent =
      "Please rotate your device to landscape format to play.";
    modal.style.display = "flex";
  } else if (height < 380) {
    message.textContent =
      "Unfortunately your device is not suitable. Use a device with a height of at least 380 pixels.";
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

// Event listeners for adjusting to mobile devices, checking screen size, and initializing the game.
window.addEventListener("load", adjustForMobileDevices);
window.addEventListener("resize", adjustForMobileDevices);
window.addEventListener("resize", checkScreenSize);

document.addEventListener("DOMContentLoaded", function () {
  init();
  initializeGame();
  adjustForMobileDevices();
  checkScreenSize();
  startGame();
  muteSounds();
  infoScreen();
  fullscreen();
  keybordActions();
});

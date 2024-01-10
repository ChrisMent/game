/**
 * Initialisierung der Variablen
 */
let canvas;
let world;
let keyboard = new KeyboardObject();

/**
 * Initialisiert das Spiel.
 * - Wählt das Canvas-Element aus.
 * - Erstellt eine neue Instanz der Klasse WorldObject.
 * - Aktiviert die Tastatur-Interaktionen für Spielaktionen.
 */
function init() {
    canvas = document.querySelector('canvas');
    /**
     * Erstellt eine neue WorldObject-Instanz.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element für das Spiel.
     * @param {KeyboardObject} keyboard - Tastatur-Interaktionsobjekt.
     * @param {Object} level1 - Das erste Level des Spiels.
     */
    world = new WorldObject(canvas, keyboard, level1);

    keyboard.activateButton('c_jump', 'pushSpace');
    keyboard.activateButton('c_throw', 'throwBottle');
    keyboard.activateButton('c_left', 'moveLeft');
    keyboard.activateButton('c_right', 'moveRight');
}

/**
 * Startet das Spiel und fügt einen Event-Listener zum Start-Button hinzu.
 * Beinhaltet die Logik zum Starten und Anhalten des Spiels.
 */
function startGame(){
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        if (world.gameIsRunning) {
            world.startScreen.isVisible = true;
            location.reload();
            world.gameIsRunning = false;
        } else {
            world.startScreen.isVisible = false;
            world.gameIsRunning = true;    
        }
    });
}

/**
 * Stummschalten der Sounds im Spiel.
 * Fügt einen Event-Listener zum Mute-Button hinzu.
 */
function muteSounds(){
    const muteButton = document.getElementById('muteButton');
    const muteIcon = document.getElementById('mute_icon');
    if (muteButton) {
        muteButton.addEventListener('click', () => {
            const isMuted = !SoundManager.sounds[0]?.muted;
            SoundManager.toggleMute(isMuted);
            muteIcon.innerText = isMuted ? 'volume_up' : 'volume_off';
        });
    } 
}

/**
 * Anzeigen des Info-Screens.
 * Fügt Event-Listener für den Info-Button und das Schließen des Info-Screens hinzu.
 */
function infoScreen(){
    const infoButton = document.getElementById('info');
    const infoScreen = document.getElementById('infoScreen');

    infoScreen.style.display = 'none';
    infoButton.addEventListener('click', () => {
        infoScreen.style.display = infoScreen.style.display === 'none' ? 'block' : 'none';
    });
    const closeInfoScreen = document.getElementById('close-info-screen');
    closeInfoScreen.addEventListener('click', () => {
        infoScreen.style.display = 'none';  
    });
}

/**
 * Implementierung der Vollbildfunktion.
 * Fügt Event-Listener für den Vollbild-Button und Änderungen im Vollbildmodus hinzu.
 */
function fullscreen(){
    let gameContainer = document.getElementById('fullscreen');
    let fullscreenButton = document.getElementById('fullscreenButton');

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            gameContainer.requestFullscreen().catch(err => {
                alert(`Fehler beim Versuch, in den Vollbildmodus zu wechseln: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", function() {
        if (document.fullscreenElement) {
            document.body.classList.add('fullscreen-active');
        } else {
            document.body.classList.remove('fullscreen-active');
        }
    });
}

/**
 * Event-Listener für Tastaturinteraktionen.
 * Behandelt keydown- und keyup-Ereignisse.
 */
function keybordActions(){
    document.addEventListener("keydown", (event) => {
        keyboard.handleKeyDown(event);
    });

    document.addEventListener("keyup", (event) => {
        keyboard.handleKeyUp(event);
    });
}

/**
 * Event-Listener, der beim Laden des DOM ausgelöst wird.
 * Ruft init, startGame, muteSounds, infoScreen, fullscreen und keybordActions auf.
 */
document.addEventListener("DOMContentLoaded", function() {
    init();
    startGame();
    muteSounds();
    infoScreen();
    fullscreen();
    keybordActions();
});

function checkScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const modal = document.getElementById('modal');
    const message = document.getElementById('modal-message');
  
    if (width < 720) {
      message.textContent = "Dein Device ist leider nicht geeignet verwende ein Device mit einer Breite von mindestens 720 Pixel.";
      modal.style.display = 'flex';
    } else if (height > width) {
      message.textContent = "Bitte drehe um zu spielen dein Device ins Querformat.";
      modal.style.display = 'flex';
    } else {
      modal.style.display = 'none';
    }
  }
  
  // Event Listener für Änderungen der Fenstergröße
  window.addEventListener('resize', checkScreenSize);
  
  // Überprüfen Sie die Größe beim Laden der Seite
  document.addEventListener("DOMContentLoaded", checkScreenSize);

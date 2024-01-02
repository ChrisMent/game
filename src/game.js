// Initialisierung der Variablen
let canvas;
let world;
let keyboard = new KeyboardObject();

// init-Funktion, um das Spiel zu initialisieren
function init() {
    // Auswahl des Canvas-Elements
    canvas = document.querySelector('canvas');
    // Erstellung einer neuen Instanz der Klasse oder des Konstruktors des WorldObject, dem Konstruktur der Klasse werden dabei 3 Parameter übergeben
    world = new WorldObject(canvas, keyboard, level1); 

    // Aktivieren der Tastatur-Interaktionen für Spielaktionen
    keyboard.activateButton('c_jump', 'pushSpace');
    keyboard.activateButton('c_throw', 'throwBottle');
    keyboard.activateButton('c_left', 'moveLeft');
    keyboard.activateButton('c_right', 'moveRight');

}

function startGame(){
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        // Logik zum Starten und Anhalten des Spiels
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

function muteSounds(){
    // Implementierung der Stummschaltung
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

function infoScreen(){
    // Event-Listener für den Info-Button
    const infoButton = document.getElementById('info');
    const infoScreen = document.getElementById('infoScreen');

    infoScreen.style.display = 'none'; // Anfangszustand des Info-Screens
    infoButton.addEventListener('click', () => {
        // Umschalten der Anzeige des Info-Screens
        infoScreen.style.display = infoScreen.style.display === 'none' ? 'block' : 'none';
    });
    const closeInfoScreen = document.getElementById('close-info-screen');
    closeInfoScreen.addEventListener('click', () => {
        infoScreen.style.display = 'none';  
    });
}

function fullscreen(){
    // Implementierung der Vollbildfunktion
    let gameContainer = document.getElementById('fullscreen');
    let fullscreenButton = document.getElementById('fullscreenButton');

    fullscreenButton.addEventListener('click', () => {
        // Wechsel zwischen Vollbild- und Normalmodus
        if (!document.fullscreenElement) {
            gameContainer.requestFullscreen().catch(err => {
                alert(`Fehler beim Versuch, in den Vollbildmodus zu wechseln: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Event-Listener für Änderungen im Vollbildmodus
    document.addEventListener("fullscreenchange", function() {
        if (document.fullscreenElement) {
            document.body.classList.add('fullscreen-active');
        } else {
            document.body.classList.remove('fullscreen-active');
        }
    });
}

function keybordActions(){
    // Event-Listener für Tastaturinteraktionen
    document.addEventListener("keydown", (event) => {
        keyboard.handleKeyDown(event);
    });

    document.addEventListener("keyup", (event) => {
        keyboard.handleKeyUp(event);
    });
}

// Event-Listener, der beim Laden des DOM ausgelöst wird
document.addEventListener("DOMContentLoaded", function() {
    init(); // Aufruf der init-Funktion
    startGame(); // Spiel starten
    muteSounds(); // Stummschaltung der Sounds im Spiel
    infoScreen(); // Aufrufen des Infoscreens
    fullscreen(); // Vollbildmodus öffnen und Styleänderungen
    keybordActions(); // Abgreifen der Keyboardeingaben
    
});



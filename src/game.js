let canvas;
let world;
let keyboard = new KeyboardObject();

function init() {
    canvas = document.querySelector('canvas');
    world = new WorldObject(canvas, keyboard, level1);

    keyboard.activateButton('c_jump', 'pushSpace');
    keyboard.activateButton('c_throw', 'throwBottle');
    keyboard.activateButton('c_left', 'moveLeft');
    keyboard.activateButton('c_right', 'moveRight');
    //SoundManager.debugSounds();
    

    // console.log('World: ', world);
    // console.log('Keyboard:', keyboard);
}

document.addEventListener("DOMContentLoaded", function() {
    init();
    const startButton = document.getElementById('startButton');
       
    startButton.addEventListener('click', () => {
        if (world.gameIsRunning) { // Überprüfen Sie, ob das Spiel läuft
            world.startScreen.isVisible = true; // Zeigt den Startbildschirm wieder an
            location.reload(); // Lädt die Seite neu, wenn das Spiel noch nicht gestartet ist
            world.gameIsRunning = false
        } else {
            world.startScreen.isVisible = false; // Versteckt den Startbildschirm
            world.gameIsRunning = true
            
        }
    })
    const muteButton = document.getElementById('muteButton');
    const muteIcon = document.getElementById('mute_icon');
    if (muteButton) {
        muteButton.addEventListener('click', () => {
            const isMuted = !SoundManager.sounds[0]?.muted;
            SoundManager.toggleMute(isMuted);
            if (isMuted) {
                muteIcon.innerText = 'volume_up'; // Icon ändern, wenn stummgeschaltet
            } else {
                muteIcon.innerText = 'volume_off'; // Icon ändern, wenn nicht stummgeschaltet
            }
        });
    } 

    // Event-Listener für den Info-Button
    const infoButton = document.getElementById('info');
    const infoScreen = document.getElementById('infoScreen');
    
    infoScreen.style.display = 'none'; // Initialisieren des display-Stils
    infoButton.addEventListener('click', () => {
        infoScreen.style.display = infoScreen.style.display === 'none' ? 'block' : 'none';
        
    });
    const closeInfoScreen = document.getElementById('close-info-screen')
    closeInfoScreen.addEventListener('click', () => {
        infoScreen.style.display = 'none';
        
    });

    let gameContainer = document.getElementById('fullscreen');
    let buttonAreaBelow = document.querySelector('.button-area-below'); // Selector für button-area-below
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
            document.body.classList.add('fullscreen-active'); // oder einem anderen geeigneten Elternelement
        } else {
            document.body.classList.remove('fullscreen-active');
        }
    });

});


document.addEventListener("keydown", (event) => {
    // console.log('KeyDown Event:', event.key); // Debugging
    keyboard.handleKeyDown(event);
    // console.log('Keyboard Status after KeyDown:', keyboard); // Debugging
});

document.addEventListener("keyup", (event) => {
    // console.log('KeyUp Event:', event.key); // Debugging
    keyboard.handleKeyUp(event);
    // console.log('Keyboard Status after KeyUp:', keyboard); // Debugging
});
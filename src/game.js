let canvas;
let world;
let keyboard = new KeyboardObject();


function init(){
    canvas = document.querySelector('canvas')
    world = new WorldObject(canvas, keyboard);

    console.log('World: ', world);
    console.log('Keyboard:', keyboard)
}

document.addEventListener("DOMContentLoaded", function() {
    // Hauptfunktion aufrufen um den Prozess zu starten!
    init();

});

document.addEventListener("keydown", (event) => {
    //console.log('KeyDown Event:', event.key); // Debugging
    keyboard.handleKeyDown(event);
    //console.log('Keyboard Status after KeyDown:', keyboard); // Debugging
});

document.addEventListener("keyup", (event) => {
    //console.log('KeyUp Event:', event.key); // Debugging
    keyboard.handleKeyUp(event);
    //console.log('Keyboard Status after KeyUp:', keyboard); // Debugging
});

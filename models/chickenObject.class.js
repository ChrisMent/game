class Chicken extends MoveableObject{

    IMAGES_WALKING = [
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
 
    ]

    IMAGE_DEATH = '../game/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

    constructor(){
        super().loadImage('../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        // Stellt sicher das Chickens nicht außerhalb der Grenzen von Start 120 und Ende 1800 Pixeln erscheinen
        this.x = 120 + Math.random() * (1800 - 120 - 50);
        this.y = 370
        this.height = 50
        this.width = 50
        this.speed = 0.75 + Math.random() * 0.25
        

        this.animate()
    }

    chicken_death_sound = new Audio('../game/audio/chicken-death.mp3')

    animate() {
        this.movingRight = false; // Startet mit einer Bewegung nach rechts
    
        setInterval(() => {
            // Prüfen, ob das Chicken den linken Rand (x = 120) erreicht hat
            if (this.x <= 120) {
                this.movingRight = true; // Richtung ändern, um nach rechts zu gehen
            }
    
            // Prüfen, ob das Chicken den rechten Rand (x = 1800) erreicht hat
            if (this.x >= 1800) {
                this.movingRight = false; // Richtung ändern, um nach links zu gehen
            }
    
            if (this.movingRight) {
                // Wenn das Chicken sich nach rechts bewegen soll
                this.moveRight();
                this.otherDirection = true; // Bildspiegelung für die Bewegung nach rechts
            } else {
                // Wenn das Chicken sich nach links bewegen soll
                this.moveLeft();
                this.otherDirection = false; // Bildspiegelung aufheben
            }
        }, 1000 / 60);
    
        setInterval(() => {
            // Spiele die Laufanimation ab
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    playDeathAnimation() {
        //console.log("Playing death animation for chicken"); // Debugging
        this.loadImage(this.IMAGE_DEATH); // Lädt das Todesbild
        this.chicken_death_sound.play()
        setTimeout(() => {
            //console.log("Removing chicken from game"); // Debugging
            this.removeFromGame = true; // Markiert das Chicken zur Entfernung
        }, 1000); // Warten Sie 1 Sekunde, bevor das Chicken entfernt wird
    }
    


}

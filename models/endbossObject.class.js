class Endboss extends MoveableObject {

    x = 2500
    y = 120
    height = 320
    width = 300

    originalX = 2500;
    attackDelay = 3000; // Wartezeit vor dem Angriff in Millisekunden
    
    imagesLoaded = false; // Neue Eigenschaft, um den Ladestatus zu verfolgen
    isAttacking = false;
    isMoving = false;
    isReturning = false;
    isAlerting = true;
    alertAnimationFinished = false;
    alertAnimationCount = 0; // Zählt, wie oft die Alert-Animation abgespielt wurde


    IMAGES_ALERT = [
        '../game/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G12.png'
 
    ]

    IMAGES_WALKING = [
        '../game/img/4_enemie_boss_chicken/1_walk/G1.png',
        '../game/img/4_enemie_boss_chicken/1_walk/G2.png',
        '../game/img/4_enemie_boss_chicken/1_walk/G3.png',
        '../game/img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ATTACK = [
        '../game/img/4_enemie_boss_chicken/3_attack/G13.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G14.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G15.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G16.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G17.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G18.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G19.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    constructor(world){
        super().loadImage(this.IMAGES_ALERT[0])
        this.world = world;
        this.loadImages(this.IMAGES_ALERT)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_ATTACK)
        this.animate()
    }


    flipImageForAttack() {
        this.otherDirection = !this.otherDirection; // Kehrt die Richtung um
    }   
    
    isNearCharacter() {
        if (this.world && this.world.character) {
            const distanceToCharacter = Math.abs(this.x - this.world.character.x);
            // console.log("Distanz zum Character:", distanceToCharacter);
            return distanceToCharacter < 400;
        }
        return false;
    } 


    
    moveLeftBy(distance) {
        // Bewegt den Endboss um eine bestimmte Distanz nach links
        this.x -= distance;
    }

    moveRightBy(distance) {
        // Bewegt den Endboss um eine bestimmte Distanz nach rechts
        this.x += distance;
    }

    isAlertAnimationFinished() {
        return this.currentImage === this.IMAGES_ALERT.length - 1;
    }

    animate() {
        setInterval(() => {
            if (this.isNearCharacter()) {
                if (this.alertAnimationCount < 3) {
                    this.playAnimation(this.IMAGES_ALERT);
                    if (this.currentImage === this.IMAGES_ALERT.length - 1) {
                        this.alertAnimationCount++;
                    }
                } else if (!this.alertAnimationFinished) {
                    this.alertAnimationFinished = true;
                }
    
                if (this.alertAnimationFinished && !this.isMoving && !this.isAttacking) {
                    this.isMoving = true;
                    this.moveLeftBy(300); // Bewege den Boss nach links
                }
    
                if (this.isMoving && this.x <= this.originalX - 300) {
                    this.isMoving = false;
                    this.isAttacking = true;
                    // Füge hier weitere Angriffslogik hinzu
                }
    
                if (this.isAttacking) {
                    // Hier kommt die Logik für den Angriff
                    this.playAnimation(this.IMAGES_ATTACK);
                }
            } else {
                // Wenn der Character nicht in der Nähe ist
                if (!this.isAlerting) {
                    this.alertAnimationCount = 0;
                    this.alertAnimationFinished = false;
                    this.isAttacking = false;
                    this.isMoving = false;
                    this.isReturning = false;
                    this.isAlerting = true;
                }
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 300);
    }
      

}
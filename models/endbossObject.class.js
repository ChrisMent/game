class Endboss extends MoveableObject {

    x = 2500
    y = 120
    height = 320
    width = 300

    originalX = 2500;
    isAttacking = false;
    attackDelay = 3000; // Wartezeit vor dem Angriff in Millisekunden
    imagesLoaded = false; // Neue Eigenschaft, um den Ladestatus zu verfolgen


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

    IMAGES_HURT = [
        '../game/img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../game/img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../game/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        '../game/img/4_enemie_boss_chicken/5_dead/G24.png',
        '../game/img/4_enemie_boss_chicken/5_dead/G25.png',
        '../game/img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

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

    constructor(){
        super()
        this.loadImages(this.IMAGES_ALERT)
        this.animate()
    }

    animate(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_ALERT)
        },200 )
       
    }
    

    animate(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_ALERT)
        },200 )
    
    }
    

    // attackCycle() {
    //     if (this.isNearCharacter()) {
    //         if (!this.isAttacking) {
    //             this.isAttacking = true;

    //             // Warte 3 Sekunden, dann bewege dich nach links und greife an
    //             setTimeout(() => {
    //                 this.moveLeftBy(200);
    //                 this.playAnimation(this.IMAGES_ATTACK);
    //                 // Nach dem Angriff kehre zurück und warte 1 Sekunde
    //                 setTimeout(() => {
    //                     this.x = this.originalX;
    //                     this.isAttacking = false;
    //                 }, 1000);
    //             }, this.attackDelay);
    //         }
    //     }
    // }



    // isNearCharacter() {
    //     // Prüfen, ob der Character in der Nähe ist (z.B. x-Position kleiner als 2200)
    //     return this.x - this.world.character.x < 2200;
    // }

    // moveLeftBy(distance) {
    //     // Bewegt den Endboss um eine bestimmte Distanz nach links
    //     this.x -= distance;
    // }

    // draw(ctx) {
    //     console.log("Versuche Endboss zu zeichnen", this.img);
    //     if (this.imagesLoaded && this.img && this.img.complete && this.img.naturalWidth > 0) {
    //         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //         console.log("Endboss gezeichnet");
    //     } else {
    //         console.log("Endboss-Bild nicht bereit oder nicht vorhanden");
    //     }
    // }


}
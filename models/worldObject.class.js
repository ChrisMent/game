class WorldObject {
    character = new Character()
    bottle = new Bottle() 
    bottles = []
    groundBottles = []
    groundCoins = []
    canvas;
    keyboard;
    camera_x = 0

    constructor(canvas, keyboard, level) {  
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;  // Jetzt weisen Sie das übergebene level-Objekt zu
        this.groundBottles = level.groundBottles;
        this.groundCoins = level.coins;
        console.log('level.coins', level.coins)
        this.character = new Character(this); 
        this.statusbars = {
            life: new Statusbar(15, 0, 75, 75, 'life', 0, this.ctx),
            bottle: new Statusbar(110, 10, 63, 63, 'bottle', 0, this.ctx),
            coin: new Statusbar(200, 10, 63, 63, 'coin', 0, this.ctx),
            endboss: new Statusbar(640, 15, 63, 63, 'endboss', 0, this.ctx),
        };
        this.clouds = []; // Initialisiere das Array für die Wolken
        this.clouds.push(new Cloud(0)); // Wolke am Anfang
        this.clouds.push(new Cloud(2400 / 2)); // Wolke in der Mitte
        this.clouds.push(new Cloud(2400 - 350)); // Wolke am Ende
        this.setWorld();
        this.draw();
        this.run()


    }

    run() {
        setInterval(() => {
            this.checkCollisions(); // Prüfe auf Kollisionen mit Feinden.
            this.checkThrowObject(); // Prüfe, ob der Charakter eine Flasche wirft.
            this.checkForBottleCollection(); // Prüfe nun auch, ob der Charakter Flaschen sammelt.
            this.checkForCoinCollection(); // Überprüfe, ob der Charakter Münzen sammelt.
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.jumpOnChicken(enemy)) {
                enemy.playDeathAnimation();
                this.removeEnemy(enemy, index);
            } else if (this.character.isColliding(enemy) && !this.jumpOnChicken(enemy)) {
                this.character.hit();
                this.drawLivesCount();
            }
        });
    }
      
    jumpOnChicken(enemy) {
        let isJumpingOnChicken = (enemy.constructor === Chicken) &&
            this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            this.character.speedY < 0;
    
        if (isJumpingOnChicken) {
            // console.log("Jumping on Chicken. Character y:", this.character.y, "speedY:", this.character.speedY);
            this.character.secondJump(); // Triggern eines weiteren Sprungs
        }
    
        return isJumpingOnChicken;
    }  

    removeEnemy(enemy, index) {
        // Entfernen des Enemys aus dem Spiel
        this.level.enemies.splice(index, 1);
    }


    checkForBottleCollection() {
        this.groundBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                // Sammle die Flasche
                this.collectBottle(index);
            }
        });
    }

    checkForCoinCollection() {
        this.groundCoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                // Sammle die Münze
                this.collectCoin(index);
            }
        });
    }

    collectBottle(index) {
        this.groundBottles.splice(index, 1); // Entferne die Flasche vom Boden
        this.character.bottlesCollected++; // Füge eine Flasche zum Sammelzähler hinzu
        
        // Sound abspielen
        this.character.collect_bottle_sound.play();
    
       
        // console.log('Bottle count: ', this.character.bottlesCollected)
    }

    collectCoin(index) {
        this.groundCoins.splice(index, 1); // Entferne die Münze vom Boden
        this.character.coinsCollected++; // Erhöhe die Anzahl der gesammelten Münzen

        // Optional: Sound abspielen für das Sammeln einer Münze
        this.character.collect_coin_sound.play();
    }

    checkThrowObject() {
        if (this.keyboard.throwBottle && this.character.bottlesCollected > 0) {
            let bottle = new throwAbleObject(this.character.x + 40, this.character.y + 100);
            this.bottles.push(bottle);
            
            // Eine gesammelte Flasche abziehen, da sie geworfen wurde
            this.character.bottlesCollected--;

        }
    }
    
    
    setWorld(){
        this.character.world = this
        this.character.animate();
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Verschiebe den Canvas basierend auf der Position der Kamera
        this.ctx.save();   // Speichere den aktuellen Canvas-Zustand
        this.ctx.translate(this.camera_x, 0);

        this.updateCameraPosition();
        

        // Zeichne alle beweglichen und unbeweglichen Objekte
        this.addBackgroundObjectsToMap();
        
        // Zeichne alle Wolken
        this.clouds.forEach(cloud => {
            cloud.draw(this.ctx); // Angenommen, Ihre Cloud-Klasse hat eine draw-Methode, die den Kontext benötigt
        });

        this.addObjectsToMap(this.level.enemies); 
        this.addObjectsToMap(this.groundBottles);
        this.addObjectsToMap(this.groundCoins);
        this.addToMap(this.character);

        // Aktualisiere die Statusleiste für gesammelte Flaschen basierend auf der Anzahl der gesammelten Flaschen
        this.statusbars.bottle.showCollectedBottles(this.character.bottlesCollected);
        this.statusbars.coin.showCollectedCoins(this.character.coinsCollected);
               
        // Kontinuierliche Kollisionsüberprüfung
        this.checkCollisions();
        this.applyGravityToCharacter();
    
        // Zeichne Objekte, die relativ zur Kamera beweglich sind, wie geworfene Flaschen
        this.addObjectsToMap(this.bottles);
    
        // Stelle Kamera-Translation für fixe Objekte zurück
        this.ctx.restore();
    
        // Zeichne fixe Objekte wie Statusleisten
        this.addToMap(this.statusbars.life);
        this.addToMap(this.statusbars.bottle);
        this.addToMap(this.statusbars.coin);;
        if (this.camera_x >= -2200 && this.camera_x <= -1800) {
            this.addToMap(this.statusbars.endboss);
        }

        // Zeichnen des Textes für die Anzahl der gesammelten Flaschen, Leben und Coins
        this.drawCollectedBottlesCount();
        this.drawLivesCount();
        this.drawCollectedCoinsCount()
    
        // Forderung des nächsten Zeichenrahmens
        requestAnimationFrame(() => this.draw());
    }
  
    drawCollectedBottlesCount() {
        if (this.statusbars.bottle.type === 'bottle') {
            this.ctx.font = "48px rio-grande"; // Schriftart und -größe
            this.ctx.fillStyle = "white"; // Farbe des Textes
            this.ctx.fillText(this.character.bottlesCollected, this.statusbars.bottle.x + 50, this.statusbars.bottle.y + 51);
        }
    }

    drawCollectedCoinsCount() {
        if (this.statusbars.coin.type === 'coin') {
            this.ctx.font = "48px rio-grande"; // Schriftart und -größe
            this.ctx.fillStyle = "white"; // Farbe des Textes
            this.ctx.fillText(this.character.coinsCollected, this.statusbars.coin.x + 60.5, this.statusbars.coin.y + 52);
        }
    }

    drawLivesCount() {
        if (this.statusbars.life.type === 'life') {
            this.ctx.font = "48px rio-grande"; // Schriftart und -größe
            this.ctx.fillStyle = "white"; // Farbe des Textes
            this.ctx.fillText(this.character.lives, this.statusbars.life.x + 70, this.statusbars.life.y + 59.5);
        }
    }

    addBackgroundObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    updateCameraPosition() {
        // Aktualisiere die Kamera-Position basierend auf dem Character.
        // Dies ist nur ein Beispiel und sollte angepasst werden, je nachdem wie du deine Kamera steuerst.
        this.camera_x = -this.character.x + 100;
    }


    // Durchinterieren für jedes Objekt im Canvas 
    addObjectsToMap(objects) {
        if (!objects) {
            //console.error("Versuch, über undefiniertes Array zu iterieren in addObjectsToMap");
            return;
        }

        objects.forEach(object => {
            this.addToMap(object);
        });
    }
    

    addToMap(object) {
        // Überprüfen, ob das Objekt in die entgegengesetzte Richtung gedreht werden soll
        if (object.otherDirection) {
            // Wenn ja, drehe das Bild horizontal
            this.flipImage(object);
        }

        // Zeichne das Objekt auf das Canvas
        object.draw(this.ctx);

        // Zeichne ein Rechteck um das Objekt (nützlich für Debugging und Hitbox-Überprüfung)
        //object.drawRect(this.ctx);

        // Stelle die ursprüngliche Richtung des Objekts wieder her, falls es gedreht wurde
        if (object.otherDirection) {
            this.flipImageRestore(object);
        }
    }

    applyGravityToCharacter() {
        if (this.character.isAboveGround() || this.character.speedY > 0) {
            this.character.inAir = true;
            this.character.y -= this.character.speedY;
            this.character.speedY -= this.character.acceleration;
        } else {
            if (this.character.y > 150) {
                this.character.y = 150;
                if (this.character.inAir) {
                    this.character.showLandingImage(); // Zeige Landungsbild
                }
            }
            this.character.inAir = false;
            this.character.speedY = 0;
        }
    }
    

    // Funktion zum horizontalen Drehen des Objekts
    flipImage(object) {
        // Speichern des aktuellen Zustands des Canvas-Kontexts
        this.ctx.save();

        // Verschiebe das Canvas um die Breite des Objekts nach rechts und spiegele es horizontal
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);

        // Korrigiere die X-Position des Objekts, damit es am richtigen Ort erscheint
        object.x = object.x * -1;
    }

    // Funktion zum Wiederherstellen des ursprünglichen Zustands nach der Drehung
    flipImageRestore(object) {
        // Stelle die ursprüngliche X-Position des Objekts wieder her
        object.x = object.x * -1;

        // Stelle den ursprünglichen Zustand des Canvas-Kontexts wieder her
        this.ctx.restore();
    }

}
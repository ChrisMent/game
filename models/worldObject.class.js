class WorldObject {
    
    // Initialisierung der Eigenschaften
    infoScreen = new InfoScreen();
    character = new Character()
    bottle = new Bottle() 
    bottles = []
    groundBottles = []
    groundCoins = []
    canvas;
    keyboard;
    camera_x = 0
    startScreen;
    gameIsRunning = false; 

    constructor(canvas, keyboard, level) {  
        // Initialisierung von Canvas und Kontext
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startScreen = new StartScreen();
        this.level = level; 
        this.groundBottles = level.groundBottles;
        this.groundCoins = level.coins;
        this.character = new Character(this); 
        this.setWorld();
        this.endboss = new Endboss(this);
        this.level.enemies.push(this.endboss);
        // Initialisierung der Statusleisten
        this.statusbars = {
            life: new Statusbar(15, 0, 75, 75, 'life', 0, this.ctx),
            bottle: new Statusbar(110, 10, 63, 63, 'bottle', 0, this.ctx),
            coin: new Statusbar(200, 10, 63, 63, 'coin', 0, this.ctx),
            endboss: new Statusbar(640, 15, 63, 63, 'endboss', 0, this.ctx),
        };
        this.clouds = [];
        this.clouds.push(new Cloud(0)); // Wolke am Anfang
        this.clouds.push(new Cloud(2400 / 2)); // Wolke in der Mitte
        this.clouds.push(new Cloud(2400 - 350)); // Wolke am Ende
        // Initialisierung der Endbildschirme
        this.endScreenTriggered = false;
        this.endScreenImage = new Image();
        this.endScreenImage.src = '../game/img/9_intro_outro_screens/youwin.png';
        this.endScreenImage.onload = () => {
             this.endScreenImageLoaded = true;
        }
        this.gameOverImage = new Image();
        this.gameOverImage.src = '../game/img/9_intro_outro_screens/game_over/ohnoyoulost!.png';
        this.gameOverImage.onload = () => {
            this.gameOverImageLoaded = true;
        }
        // Starten der Spiellogik
        this.draw();
        this.run()


    }
    // Methode zum Ausführen der Spiellogik
    run() {
        this.interval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkForBottleCollection();
            this.checkForCoinCollection();
            
            if (this.endboss.lives <= 0 && !this.endScreenTriggered) {
                this.showEndScreen();
            }

            if (this.character.lives <= 0 && !this.gameOverTriggered) {
                this.gameOver();
            }
        }, 200);
    }

    //! Methoden für die Anzeige von End- und Game-Over-Bildschirmen

    showEndScreen() {
        // Verzögert das Zeichnen des Endscreens um 3 Sekunden
        setTimeout(() => {
            this.prepareForEndScreen();
            this.endScreenTriggered = true;
            this.drawEndScreen(); // Zeichnen des Endscreens
        }, 3000);
    }

    // Vorbereitungen für das Anzeigen des Endbildschirms
    prepareForEndScreen() {
        clearInterval(this.interval);
        this.gameIsRunning = false;
        this.character.stopAnimation();
        SoundManager.toggleMute(true);
        this.hideAllObjects();
        this.character.visible = false;
    }

    // Verbirgt alle Gegner, Flaschen und Münzen
    hideAllObjects() {
        if (this.enemies) {
            this.enemies.forEach(enemy => enemy.visible = false);
        }
        if (this.bottles) {
            this.bottles.forEach(bottle => bottle.visible = false);
        }
        if (this.coins) {
            this.coins.forEach(coin => coin.visible = false);
        }
    }
    
    drawEndScreen() {
        if (this.endScreenTriggered && this.endScreenImageLoaded) {
            this.ctx.drawImage(this.endScreenImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    // Methode, die aufgerufen wird, wenn das Spiel verloren ist
    gameOver() {
        this.gameOverTriggered = true;
        this.prepareForGameOver();
        this.drawGameOverScreen();
    }

    // Vorbereitungen für das Anzeigen des Game-Over-Bildschirms
    prepareForGameOver() {
        clearInterval(this.interval);
        this.gameIsRunning = false;
        this.character.stopAnimation();
        SoundManager.toggleMute(true); // Alle Sounds ausschalten
        this.hideAllObjects();
        this.character.visible = false;
    }

    // Verbirgt alle Gegner, Flaschen und Münzen (bereits definiert in showEndScreen-Optimierung)
    hideAllObjects() {
        if (this.enemies) {
            this.enemies.forEach(enemy => enemy.visible = false);
        }
        if (this.bottles) {
            this.bottles.forEach(bottle => bottle.visible = false);
        }
        if (this.coins) {
            this.coins.forEach(coin => coin.visible = false);
        }
    }
    
    drawGameOverScreen() {
        if (this.gameOverImageLoaded) {
            this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    //! Kollisions- und Sammellogik

    // Überprüft Kollisionen zwischen verschiedenen Objekten
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkBottleCollisions();
    }

    // Überprüft Kollisionen zwischen dem Charakter und Feinden
    checkEnemyCollisions() {
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

    // Überprüft Kollisionen zwischen Flaschen und dem Endboss
    checkBottleCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.bottles.forEach((bottle, bottleIndex) => {
                    if (bottle.isColliding(enemy)) {
                        this.handleEndbossCollision(enemy, bottleIndex);
                    }
                });
            }
        });
    }

    // Handhabt die Kollision zwischen einer Flasche und dem Endboss
    handleEndbossCollision(endboss, bottleIndex) {
        endboss.lives -= 1; // Ein Leben abziehen
        this.bottles.splice(bottleIndex, 1); // Flasche entfernen

        if (endboss.lives > 0) {
            endboss.playHurtAnimation(); // Abspielen der Verletzungsanimation
        } else {
            endboss.playDeathAnimation(); // Abspielen der Todesanimation
        }
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
        this.character.collect_bottle_sound.play(); // Sound abspielen
    
    }

    collectCoin(index) {
        this.groundCoins.splice(index, 1); // Entferne die Münze vom Boden
        this.character.coinsCollected++; // Erhöhe die Anzahl der gesammelten Münzen
        this.character.collect_coin_sound.play(); // Optional: Sound abspielen für das Sammeln einer Münze
    }

    checkThrowObject() {
        if (this.keyboard.throwBottle && this.character.bottlesCollected > 0) {
            let bottle = new throwAbleObject(this.character.x + 40, this.character.y + 100);
            this.bottles.push(bottle);
            
            // Eine gesammelte Flasche abziehen, da sie geworfen wurde
            this.character.bottlesCollected--;

        }
    }
    
    //! Setzt die Welt für das Charakter-Objekt
    setWorld(){
        this.character.world = this
        this.character.animate();
    }

    //! Zeichnet die Spielwelt
    // Zeichnet die Spielwelt
    draw() {
        this.selectScreenToDraw();

        if (!this.gameOverTriggered && !this.endScreenTriggered) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.infoScreen.draw(this.ctx);
            this.drawGameScreen();
        }

        // Forderung des nächsten Zeichenrahmens
        requestAnimationFrame(() => this.draw());
    }

    // Entscheidet, welcher Bildschirm gezeichnet werden soll
    selectScreenToDraw() {
        if (this.gameOverTriggered) {
            this.drawGameOverScreen();
        } else if (this.endScreenTriggered) {
            this.drawEndScreen();
        }
    }

    // Zeichnet das reguläre Spiel
    drawGameScreen() {
        if (this.startScreen.isVisible) {
            this.startScreen.draw(this.ctx);
        } else {
            this.prepareCanvasForGameObjects();
            this.drawGameObjects();
            this.restoreCanvasState();
            this.drawFixedObjects();
        }
    }

    // Bereitet den Canvas für Spielobjekte vor
    prepareCanvasForGameObjects() {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.updateCameraPosition();
    }

    // Zeichnet bewegliche und unbewegliche Objekte
    drawGameObjects() {
        this.addBackgroundObjectsToMap();
        this.clouds.forEach(cloud => cloud.draw(this.ctx));
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.groundBottles);
        this.addObjectsToMap(this.groundCoins);
        this.addToMap(this.character);
        this.checkCollisions();
        this.applyGravityToCharacter();
        this.addObjectsToMap(this.bottles);
    }

    // Stellt den Zustand des Canvas wieder her
    restoreCanvasState() {
        this.ctx.restore();
    }

    // Zeichnet feste Objekte wie Statusleisten
    drawFixedObjects() {
        this.addToMap(this.statusbars.life);
        this.addToMap(this.statusbars.bottle);
        this.addToMap(this.statusbars.coin);
        if (this.camera_x >= -2200 && this.camera_x <= -1800) {
            this.addToMap(this.statusbars.endboss);
        }
        this.drawCollectedBottlesCount();
        this.drawLivesCount();
        this.drawCollectedCoinsCount();
    }
  
    //! Hilfsmethoden für das Zeichnen
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
            // Zeichnen der Leben des Characters
            this.ctx.font = "48px rio-grande"; // Schriftart und -größe
            this.ctx.fillStyle = "white"; // Farbe des Textes
            this.ctx.fillText(this.character.lives, this.statusbars.life.x + 70, this.statusbars.life.y + 59.5);
        }
    
        // Zeichnen der Leben des Endbosses, wenn die Kamera im entsprechenden Bereich ist
        if (this.camera_x >= -2200 && this.camera_x <= -1800 && this.statusbars.endboss.type === 'endboss') {
            this.ctx.fillStyle = "white"; // Andere Farbe für den Endboss
            this.ctx.fillText(this.endboss.lives, this.statusbars.endboss.x - 25, this.statusbars.endboss.y + 45);
        }
    }
    
    

    addBackgroundObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    updateCameraPosition() {
        // Aktualisiere die Kamera-Position basierend auf dem Character.
        this.camera_x = -this.character.x + 100;
    }


    // Durchinterieren für jedes Objekt im Canvas 
    addObjectsToMap(objects) {
        if (!objects) {
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
    
    //! Startbildschirm umschalten   
    toggleStartScreen() {
        if (this.startScreen.isVisible) {
            this.startScreen.isVisible = false;
            this.gameIsRunning = true;
            // Starten oder Fortsetzen des Spiels
        } else {
            this.startScreen.isVisible = true;
            this.gameIsRunning = false;
            // Pausieren oder Beenden des Spiels
        }
    }

}